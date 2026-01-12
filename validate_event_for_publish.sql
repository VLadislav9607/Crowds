-- Функція для валідації події перед публікацією
create or replace function validate_event_for_publish(payload jsonb)
returns void
language plpgsql
security definer
as $$
declare
  start_at_ts timestamptz;
  end_at_ts timestamptz;
  reg_close_ts timestamptz;
begin
  -- title (завжди потрібен)
  if payload->>'title' is null or trim(payload->>'title') = '' then
    raise exception 'title is required';
  end if;

  -- dates (обов'язкові для published)
  if payload->>'startAt' is null then
    raise exception 'startAt is required for published event';
  end if;

  if payload->>'endAt' is null then
    raise exception 'endAt is required for published event';
  end if;

  if payload->>'registrationClosingAt' is null then
    raise exception 'registrationClosingAt is required for published event';
  end if;

  start_at_ts := (payload->>'startAt')::timestamptz;
  end_at_ts := (payload->>'endAt')::timestamptz;
  reg_close_ts := (payload->>'registrationClosingAt')::timestamptz;

  -- Дати мають бути в майбутньому
  if start_at_ts <= now() then
    raise exception 'startAt must be in the future';
  end if;

  if end_at_ts <= now() then
    raise exception 'endAt must be in the future';
  end if;

  -- payment_amount має бути >= 15 для published
  if coalesce((payload->>'payment_amount')::numeric, 0) < 15 then
    raise exception 'payment_amount must be at least 15 dollars';
  end if;

  -- location обов'язковий для published events і має містити street_number
  if payload->'location' is null then
    raise exception 'location is required for published event';
  end if;

  if payload->'location'->>'street_number' is null or trim(payload->'location'->>'street_number') = '' then
    raise exception 'location must contain street_number (full address is required)';
  end if;

  -- ageGroups не можуть бути пустими
  if payload->'ageGroups' is null or jsonb_array_length(payload->'ageGroups') = 0 then
    raise exception 'ageGroups cannot be empty';
  end if;

  -- Перевірка що хоча б одна age group містить хоча б 1 особу
  if not exists (
    select 1
    from jsonb_array_elements(payload->'ageGroups') as ag
    where coalesce((ag->>'maleCount')::int, 0) + 
          coalesce((ag->>'femaleCount')::int, 0) + 
          coalesce((ag->>'othersCount')::int, 0) > 0
  ) then
    raise exception 'ageGroups must contain at least 1 person across all groups';
  end if;
end;
$$;

