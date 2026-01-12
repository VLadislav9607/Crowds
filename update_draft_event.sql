-- Функція для редагування draft події (все крім статусу)
create or replace function update_draft_event(
  event_id_param uuid,
  payload jsonb
)
returns uuid
language plpgsql
security definer
as $$
declare
  updated_event_id uuid;
  age_group jsonb;
  pref jsonb;
  age_group_id uuid;
  preference_id uuid;
  current_preference_id uuid;
  location_id uuid;
  start_at_ts timestamptz;
  end_at_ts timestamptz;
  reg_close_ts timestamptz;
  current_status "EventStatus";
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
    raise exception 'You are not authorized to update events';
  end if;

  -- Перевірка що event існує і має статус 'draft'
  select status into current_status
  from events
  where id = event_id_param
    and creator_id = auth.uid()
    and deleted_at is null;

  if current_status is null then
    raise exception 'Event not found';
  end if;

  if current_status != 'draft' then
    raise exception 'Only draft events can be updated';
  end if;

  -- Validate title is required
  if payload->>'title' is not null and trim(payload->>'title') = '' then
    raise exception 'title cannot be empty';
  end if;

  -- Parse ISO datetime strings (optional for draft)
  -- Якщо ключ є в payload - парсимо значення (null означає видалення)
  if payload ? 'startAt' then
    if payload->>'startAt' is not null and trim(payload->>'startAt') != '' then
      start_at_ts := (payload->>'startAt')::timestamptz;
    else
      start_at_ts := null;
    end if;
  end if;

  if payload ? 'endAt' then
    if payload->>'endAt' is not null and trim(payload->>'endAt') != '' then
      end_at_ts := (payload->>'endAt')::timestamptz;
    else
      end_at_ts := null;
    end if;
  end if;

  if payload ? 'registrationClosingAt' then
    if payload->>'registrationClosingAt' is not null and trim(payload->>'registrationClosingAt') != '' then
      reg_close_ts := (payload->>'registrationClosingAt')::timestamptz;
    else
      reg_close_ts := null;
    end if;
  end if;

  -- 1️⃣ Update event fields (все крім статусу)
  -- Якщо поле є в payload (навіть якщо null) - оновлюємо його
  -- Якщо поля немає в payload - залишаємо старе значення
  update events
  set
    -- title завжди оновлюється якщо є в payload
    title = case when payload ? 'title' then payload->>'title' else title end,
    -- category_id: якщо є в payload - оновлюємо (null означає видалення)
    category_id = case 
      when payload ? 'category' then
        case 
          when payload->>'category' is not null and trim(payload->>'category') != '' then (payload->>'category')::uuid
          else null
        end
      else category_id
    end,
    -- start_at: якщо є в payload - оновлюємо (null означає видалення)
    start_at = case 
      when payload ? 'startAt' then start_at_ts
      else start_at
    end,
    -- end_at: якщо є в payload - оновлюємо (null означає видалення)
    end_at = case 
      when payload ? 'endAt' then end_at_ts
      else end_at
    end,
    -- visibility: якщо є в payload - оновлюємо (null означає видалення)
    visibility = case 
      when payload ? 'visibility' then
        case 
          when payload->>'visibility' is not null and trim(payload->>'visibility') != '' then (payload->>'visibility')::"EventVisibility"
          else null
        end
      else visibility
    end,
    -- payment_mode: якщо є в payload - оновлюємо (null означає видалення)
    payment_mode = case 
      when payload ? 'payment_mode' then
        case 
          when payload->>'payment_mode' is not null and trim(payload->>'payment_mode') != '' then
            case 
              when payload->>'payment_mode' = 'perHour' then 'per_hour'::"EventPaymentMode"
              when payload->>'payment_mode' = 'fixed' then 'fixed'::"EventPaymentMode"
              else (payload->>'payment_mode')::"EventPaymentMode"
            end
          else null
        end
      else payment_mode
    end,
    -- payment_amount: якщо є в payload - оновлюємо (null або 0 означає видалення)
    payment_amount = case 
      when payload ? 'payment_amount' then
        case 
          when payload->>'payment_amount' is not null 
           and trim(payload->>'payment_amount') != '' 
           and trim(payload->>'payment_amount') != '0' 
           and (payload->>'payment_amount')::numeric > 0 then 
            (payload->>'payment_amount')::numeric
          else null
        end
      else payment_amount
    end,
    -- brief: якщо є в payload - оновлюємо (null означає видалення)
    brief = case 
      when payload ? 'eventBrief' then payload->>'eventBrief'
      else brief
    end,
    -- nda_required: якщо є в payload - оновлюємо (null означає видалення)
    nda_required = case 
      when payload ? 'uploadNDA' then
        case 
          when payload->>'uploadNDA' is not null then (payload->>'uploadNDA')::boolean
          else null
        end
      else nda_required
    end,
    -- nda_file_name: якщо є в payload - оновлюємо (null означає видалення)
    nda_file_name = case 
      when payload ? 'ndaDocumentName' then payload->>'ndaDocumentName'
      else nda_file_name
    end,
    -- nda_file_path: якщо є в payload - оновлюємо (null означає видалення)
    nda_file_path = case 
      when payload ? 'ndaDocumentPath' then payload->>'ndaDocumentPath'
      else nda_file_path
    end,
    -- registration_closes_at: якщо є в payload - оновлюємо (null означає видалення)
    registration_closes_at = case 
      when payload ? 'registrationClosingAt' then reg_close_ts
      else registration_closes_at
    end
  where id = event_id_param
  returning id into updated_event_id;

  -- 2️⃣ Update or delete location
  -- Якщо location відсутнє в payload - залишаємо як є
  -- Якщо location є null в payload - видаляємо локацію
  -- Якщо location є об'єктом без country - видаляємо локацію
  -- Якщо location валідна - оновлюємо локацію
  if payload ? 'location' then
    if payload->'location' is null 
       or payload->'location'->>'country' is null 
       or trim(payload->'location'->>'country') = '' then
      -- Видаляємо існуючу локацію якщо вона є
      delete from event_locations el
      where el.event_id = event_id_param;
    else
      -- Якщо location валідна - видаляємо стару і вставляємо нову
      delete from event_locations el
      where el.event_id = event_id_param;

      -- Insert new location
      insert into event_locations (
        event_id,
        autocomplete_description,
        city,
        coords,
        country,
        formatted_address,
        latitude,
        longitude,
        place_id,
        postal_code,
        region,
        street_name,
        street_number,
        timezone
      )
      values (
        event_id_param,
        payload->'location'->>'autocomplete_description',
        payload->'location'->>'city',
        case 
          when payload->'location'->>'coords' is not null 
          then ST_SetSRID(ST_GeomFromText(payload->'location'->>'coords'), 4326)::geography
          else ST_SetSRID(
            ST_MakePoint(
              (payload->'location'->>'longitude')::numeric,
              (payload->'location'->>'latitude')::numeric
            ),
            4326
          )::geography
        end,
        payload->'location'->>'country',
        payload->'location'->>'formatted_address',
        (payload->'location'->>'latitude')::numeric,
        (payload->'location'->>'longitude')::numeric,
        payload->'location'->>'place_id',
        payload->'location'->>'postal_code',
        payload->'location'->>'region',
        payload->'location'->>'street_name',
        payload->'location'->>'street_number',
        payload->'location'->>'timezone'
      )
      returning id into location_id;
    end if;
  end if;

  -- 3️⃣ Update age groups and preferences
  -- Якщо ageGroups є null в payload - видаляємо всі age groups
  -- Якщо ageGroups є масивом - замінюємо всі age groups
  -- Якщо ageGroups відсутнє в payload - залишаємо як є
  if payload ? 'ageGroups' then
    -- Перевіряємо чи ageGroups є null, не є масивом, або порожній масив
    if payload->'ageGroups' is null 
       or jsonb_typeof(payload->'ageGroups') != 'array' then
      -- Видаляємо всі age groups якщо передано null або не масив
      delete from event_age_groups eag
      where eag.event_id = event_id_param;
    elsif jsonb_array_length(payload->'ageGroups') = 0 then
      -- Видаляємо всі age groups якщо передано порожній масив
      delete from event_age_groups eag
      where eag.event_id = event_id_param;
    else
      -- Delete existing age groups (cascade will delete preferences)
      delete from event_age_groups eag
      where eag.event_id = event_id_param;

      -- Insert new age groups and preferences
      for age_group in
        select * from jsonb_array_elements(payload->'ageGroups')
      loop
        insert into event_age_groups (
          event_id,
          min_age,
          max_age,
          male_count,
          female_count,
          other_count
        )
        values (
          event_id_param,
          (age_group->>'minAge')::int,
          (age_group->>'maxAge')::int,
          coalesce((age_group->>'maleCount')::int, 0),
          coalesce((age_group->>'femaleCount')::int, 0),
          coalesce((age_group->>'othersCount')::int, 0)
        )
        returning id into age_group_id;

        -- Insert preferences if they exist
        pref := age_group->'preferences';
        if pref is not null then
          insert into event_preferences (
            age_group_id,
            weight_min,
            weight_max,
            height_min,
            height_max,
            pregnancy_allowed,
            pregnancy_months,
            additional_notes
          )
          values (
            age_group_id,
            -- weight (kg)
            case when pref->>'minWeight' is not null then (pref->>'minWeight')::int else null end,
            case when pref->>'maxWeight' is not null then (pref->>'maxWeight')::int else null end,
            -- height (cm) з 1 десятковою
            case when pref->>'minHeight' is not null then round((pref->>'minHeight')::numeric, 1) else null end,
            case when pref->>'maxHeight' is not null then round((pref->>'maxHeight')::numeric, 1) else null end,
            -- Handle null values for boolean and int fields
            case when pref->>'isPregnant' is not null then (pref->>'isPregnant')::boolean else null end,
            case when pref->>'months' is not null then (pref->>'months')::int else null end,
            case 
              when pref->'additionalThings' is not null 
              then array_to_string(
                (select array_agg(value) from jsonb_array_elements_text(pref->'additionalThings') as value),
                ', '
              )
              else null
            end
          )
          returning id into preference_id;

          -- Зберігаємо preference_id в локальну змінну для використання в підзапитах
          current_preference_id := preference_id;

          -- Insert ethnicity preferences
          if pref->'ethnicity' is not null then
            insert into event_preference_ethnicities (preference_id, value)
            select
              current_preference_id,
              val::"Ethnicity"
            from jsonb_array_elements_text(pref->'ethnicity') as val;
          end if;

          -- Insert accent preferences
          if pref->'accent' is not null then
            insert into event_preference_accents (preference_id, value)
            select
              current_preference_id,
              val::"Accent"
            from jsonb_array_elements_text(pref->'accent') as val;
          end if;

          -- Insert eye color preferences
          if pref->'eyeColour' is not null then
            insert into event_preference_eye_colors (preference_id, value)
            select
              current_preference_id,
              val::"EyeColour"
            from jsonb_array_elements_text(pref->'eyeColour') as val;
          end if;

          -- Insert hair color preferences
          if pref->'hairColour' is not null then
            insert into event_preference_hair_colors (preference_id, value)
            select
              current_preference_id,
              val::"HairColour"
            from jsonb_array_elements_text(pref->'hairColour') as val;
          end if;

          -- Insert facial attributes preferences
          if pref->'facialAttributes' is not null then
            insert into event_preference_facial_attributes (preference_id, value)
            select
              current_preference_id,
              val::"FacialAttributes"
            from jsonb_array_elements_text(pref->'facialAttributes') as val;
          end if;

          -- Insert body attributes preferences
          if pref->'bodyAttributes' is not null then
            insert into event_preference_body_attributes (preference_id, value)
            select
              current_preference_id,
              val::"BodyAttributes"
            from jsonb_array_elements_text(pref->'bodyAttributes') as val;
          end if;

          -- Insert tattoo spot preferences
          if pref->'tattooSpot' is not null then
            insert into event_preference_tattoo_spots (preference_id, value)
            select
              current_preference_id,
              val::"TattooSpot"
            from jsonb_array_elements_text(pref->'tattooSpot') as val;
          end if;

          -- Insert skin tone preferences
          if pref->'skinTone' is not null then
            insert into event_preference_skin_tones (preference_id, value)
            select
              current_preference_id,
              val::"SkinTone"
            from jsonb_array_elements_text(pref->'skinTone') as val;
          end if;
        end if;
      end loop;
    end if;
  end if;

  return event_id_param;
end;
$$;

