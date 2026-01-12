-- Функція для публікування draft події з перевіркою validate_event_for_publish
create or replace function publish_event_draft(event_id_param uuid)
returns uuid
language plpgsql
security definer
as $$
declare
  event_id uuid;
  event_data jsonb;
  location_data jsonb;
  age_groups_data jsonb;
begin
  -- 🔒 Перевірка прав доступу: тільки авторизовані користувачі та власники організацій
  -- Перевірка чи користувач авторизований
  if auth.uid() is null then
    raise exception 'User must be authenticated';
  end if;

  -- Перевірка чи користувач є власником організації
  if not exists (
    select 1
    from organizations_members om
    where om.id = auth.uid()
      and om.role = 'owner'
      and om.deleted_at is null
  ) then
    raise exception 'You are not authorized to publish events';
  end if;

  -- Перевірка що event існує і має статус 'draft'
  if not exists (
    select 1
    from events
    where id = event_id_param
      and creator_id = auth.uid()
      and status = 'draft'
      and deleted_at is null
  ) then
    raise exception 'Draft event not found or already published';
  end if;

  -- 1️⃣ Збираємо дані event для валідації
  -- Отримуємо основні дані event
  select jsonb_build_object(
    'title', title,
    'startAt', start_at::text, -- Конвертуємо timestamptz в ISO string
    'endAt', end_at::text,
    'registrationClosingAt', registration_closes_at::text,
    'payment_amount', payment_amount,
    'payment_mode', case 
      when payment_mode = 'per_hour' then 'perHour'
      when payment_mode = 'fixed' then 'fixed'
      else payment_mode::text
    end,
    'location', null,
    'ageGroups', null
  )
  into event_data
  from events
  where id = event_id_param;

  -- Отримуємо location якщо він є
  select jsonb_build_object(
    'autocomplete_description', autocomplete_description,
    'city', city,
    'coords', null, -- coords не зберігається як текст, тому null
    'country', country,
    'formatted_address', formatted_address,
    'latitude', latitude,
    'longitude', longitude,
    'place_id', place_id,
    'postal_code', postal_code,
    'region', region,
    'street_name', street_name,
    'street_number', street_number,
    'timezone', timezone
  )
  into location_data
  from event_locations
  where event_locations.event_id = event_id_param
  limit 1;

  -- Додаємо location до event_data якщо він є
  if location_data is not null then
    event_data := event_data || jsonb_build_object('location', location_data);
  end if;

  -- Отримуємо age groups з preferences
  select jsonb_agg(
    jsonb_build_object(
      'minAge', eag.min_age,
      'maxAge', eag.max_age,
      'maleCount', eag.male_count,
      'femaleCount', eag.female_count,
      'othersCount', eag.other_count,
      'preferences', case 
        when ep.id is not null then
          jsonb_build_object(
            'minWeight', ep.weight_min,
            'maxWeight', ep.weight_max,
            'minHeight', ep.height_min,
            'maxHeight', ep.height_max,
            'isPregnant', ep.pregnancy_allowed,
            'months', ep.pregnancy_months,
            'additionalThings', case 
              when ep.additional_notes is not null 
              then (
                select jsonb_agg(value)
                from unnest(string_to_array(ep.additional_notes, ', ')) as value
              )
              else null
            end,
            'ethnicity', (
              select jsonb_agg(value::text)
              from event_preference_ethnicities
              where preference_id = ep.id
            ),
            'accent', (
              select jsonb_agg(value::text)
              from event_preference_accents
              where preference_id = ep.id
            ),
            'eyeColour', (
              select jsonb_agg(value::text)
              from event_preference_eye_colors
              where preference_id = ep.id
            ),
            'hairColour', (
              select jsonb_agg(value::text)
              from event_preference_hair_colors
              where preference_id = ep.id
            ),
            'facialAttributes', (
              select jsonb_agg(value::text)
              from event_preference_facial_attributes
              where preference_id = ep.id
            ),
            'bodyAttributes', (
              select jsonb_agg(value::text)
              from event_preference_body_attributes
              where preference_id = ep.id
            ),
            'tattooSpot', (
              select jsonb_agg(value::text)
              from event_preference_tattoo_spots
              where preference_id = ep.id
            ),
            'skinTone', (
              select jsonb_agg(value::text)
              from event_preference_skin_tones
              where preference_id = ep.id
            )
          )
        else null
      end
    )
  )
  into age_groups_data
  from event_age_groups eag
  left join event_preferences ep on ep.age_group_id = eag.id
  where eag.event_id = event_id_param;

  -- Додаємо ageGroups до event_data якщо вони є
  if age_groups_data is not null then
    event_data := event_data || jsonb_build_object('ageGroups', age_groups_data);
  end if;

  -- 2️⃣ Валідація через validate_event_for_publish
  perform validate_event_for_publish(event_data);

  -- 3️⃣ Оновлюємо статус на 'published'
  update events
  set status = 'published'::"EventStatus"
  where id = event_id_param
  returning id into event_id;

  return event_id;
end;
$$;

