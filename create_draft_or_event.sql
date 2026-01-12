-- Функція для створення draft або published події
create or replace function create_draft_or_event(payload jsonb)
returns uuid
language plpgsql
security definer
as $$
declare
  event_id uuid;
  event_status "EventStatus";
  age_group jsonb;
  pref jsonb;
  age_group_id uuid;
  preference_id uuid;
  location_id uuid;
  start_at_ts timestamptz;
  end_at_ts timestamptz;
  reg_close_ts timestamptz;
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
    raise exception 'You are not authorized to create events';
  end if;

  -- Determine event status (default to 'draft')
  event_status := coalesce(
    (payload->>'status')::"EventStatus",
    'draft'::"EventStatus"
  );

  -- Validate title is required for both draft and published
  if payload->>'title' is null or trim(payload->>'title') = '' then
    raise exception 'title is required';
  end if;

  -- Parse ISO datetime strings (optional for draft, required for published)
  if payload->>'startAt' is not null then
    start_at_ts := (payload->>'startAt')::timestamptz;
  end if;

  if payload->>'endAt' is not null then
    end_at_ts := (payload->>'endAt')::timestamptz;
  end if;

  if payload->>'registrationClosingAt' is not null then
    reg_close_ts := (payload->>'registrationClosingAt')::timestamptz;
  end if;

  -- Validations ONLY for published events
  if event_status = 'published' then
    perform validate_event_for_publish(payload);
  end if;

  -- 1️⃣ Insert event first to get event_id
  -- Convert payment_mode: 'perHour' -> 'per_hour', 'fixed' -> 'fixed'
  -- Convert visibility: 'public'/'private' -> 'public'/'private' (already correct)
  insert into events (
    creator_id,
    status,
    title,
    category_id,
    start_at,
    end_at,
    visibility,
    payment_mode,
    payment_amount,
    brief,
    nda_required,
    nda_file_name,
    nda_file_path,
    registration_closes_at
  )
  values (
    auth.uid(),
    event_status,
    payload->>'title',
    (payload->>'category')::uuid,
    start_at_ts,
    end_at_ts,
    (payload->>'visibility')::"EventVisibility",
    case 
      when payload->>'payment_mode' = 'perHour' then 'per_hour'::"EventPaymentMode"
      when payload->>'payment_mode' = 'fixed' then 'fixed'::"EventPaymentMode"
      else (payload->>'payment_mode')::"EventPaymentMode"
    end,
    coalesce((payload->>'payment_amount')::numeric, 0),
    payload->>'eventBrief',
    coalesce((payload->>'uploadNDA')::boolean, false),
    payload->>'ndaDocumentName',
    payload->>'ndaDocumentPath',
    reg_close_ts
  )
  returning id into event_id;

  -- 2️⃣ Insert location into event_locations if location data is provided
  -- Now we have event_id to link the location to the event
  if payload->'location' is not null then
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
      event_id,
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

  -- 3️⃣ Insert age groups and preferences (optional for draft, required for published)
  -- Form uses camelCase: ageGroups
  if payload->'ageGroups' is not null then
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
        event_id,
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
        -- Convert weight (single value in kg) to min/max (use same value for both)
        -- Convert height (single value in feet) to min/max in cm
        -- 1 foot = 30.48 cm
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

        -- Insert ethnicity preferences
        if pref->'ethnicity' is not null then
          insert into event_preference_ethnicities (preference_id, value)
          select
            preference_id,
            value::"Ethnicity"
          from jsonb_array_elements_text(pref->'ethnicity') as value;
        end if;

        -- Insert accent preferences
        if pref->'accent' is not null then
          insert into event_preference_accents (preference_id, value)
          select
            preference_id,
            value::"Accent"
          from jsonb_array_elements_text(pref->'accent') as value;
        end if;

        -- Insert eye color preferences
        if pref->'eyeColour' is not null then
          insert into event_preference_eye_colors (preference_id, value)
          select
            preference_id,
            value::"EyeColour"
          from jsonb_array_elements_text(pref->'eyeColour') as value;
        end if;

        -- Insert hair color preferences
        if pref->'hairColour' is not null then
          insert into event_preference_hair_colors (preference_id, value)
          select
            preference_id,
            value::"HairColour"
          from jsonb_array_elements_text(pref->'hairColour') as value;
        end if;

        -- Insert facial attributes preferences
        if pref->'facialAttributes' is not null then
          insert into event_preference_facial_attributes (preference_id, value)
          select
            preference_id,
            value::"FacialAttributes"
          from jsonb_array_elements_text(pref->'facialAttributes') as value;
        end if;

        -- Insert body attributes preferences
        if pref->'bodyAttributes' is not null then
          insert into event_preference_body_attributes (preference_id, value)
          select
            preference_id,
            value::"BodyAttributes"
          from jsonb_array_elements_text(pref->'bodyAttributes') as value;
        end if;

        -- Insert tattoo spot preferences
        if pref->'tattooSpot' is not null then
          insert into event_preference_tattoo_spots (preference_id, value)
          select
            preference_id,
            value::"TattooSpot"
          from jsonb_array_elements_text(pref->'tattooSpot') as value;
        end if;

        -- Insert skin tone preferences
        if pref->'skinTone' is not null then
          insert into event_preference_skin_tones (preference_id, value)
          select
            preference_id,
            value::"SkinTone"
          from jsonb_array_elements_text(pref->'skinTone') as value;
        end if;
      end if;
    end loop;
  end if;

  return event_id;
end;
$$;

