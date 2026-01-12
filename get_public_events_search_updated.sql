-- Оновлена версія функції get_public_events_search з усіма фільтрами
create or replace function get_public_events_search(
  search_query text default null,
  sort_mode text default null,
  user_lat double precision default null,
  user_lng double precision default null,
  limit_param integer default 20,
  offset_param integer default 0,
  -- Нові параметри для фільтрів
  filter_distance_km double precision default null,
  filter_date_from timestamp with time zone default null,
  filter_date_to timestamp with time zone default null,
  filter_payment_type text default null -- 'hourly' (per_hour) або 'fixed'
)
returns jsonb
language plpgsql
security definer
as $$
declare
  uid uuid;
  events_data jsonb;
  total_count integer;
  filter_lat double precision;
  filter_lng double precision;
begin
  -- 1️⃣ Перевірка автентифікації
  uid := auth.uid();
  if uid is null then 
    raise exception 'User must be authenticated';
  end if;

  -- Визначаємо координати для сортування/фільтрації
  -- Якщо вказано user_lat/user_lng, використовуємо їх (для сортування за локацією)
  filter_lat := coalesce(user_lat, null);
  filter_lng := coalesce(user_lng, null);

  -- 2️⃣ Підраховуємо загальну кількість подій (БЕЗ limit/offset)
  select count(*)
  into total_count
  from core_accessible_events(uid, 'talent_public') e
  left join event_locations el on el.event_id = e.id
  where
    -- Пошук по назві
    (search_query is null or e.title ilike '%' || search_query || '%')
    -- Фільтр за відстанню (якщо вказано)
    -- Якщо фільтр за відстанню активний, але локації немає - не повертаємо подію
    and (
      filter_distance_km is null 
      or (
        filter_lat is not null 
        and filter_lng is not null
        and el.latitude is not null
        and el.longitude is not null
        -- Bounding box prefilter для оптимізації (зменшує кількість earth_distance обчислень)
        and el.latitude between filter_lat - (filter_distance_km / 111.0) 
                            and filter_lat + (filter_distance_km / 111.0)
        and el.longitude between filter_lng - (filter_distance_km / (111.0 * cos(radians(filter_lat))))
                             and filter_lng + (filter_distance_km / (111.0 * cos(radians(filter_lat))))
        -- Точна перевірка відстані
        and earth_distance(
          ll_to_earth(filter_lat, filter_lng),
          ll_to_earth(el.latitude, el.longitude)
        ) / 1000.0 <= filter_distance_km -- earth_distance повертає метри, ділимо на 1000 для км
      )
    )
    -- Фільтр за датою (start_at має бути в межах date_from та date_to)
    and (
      filter_date_from is null or e.start_at >= filter_date_from
    )
    and (
      filter_date_to is null or e.start_at <= filter_date_to
    )
    -- Фільтр за типом оплати
    and (
      filter_payment_type is null
      or (
        filter_payment_type = 'hourly' and e.payment_mode = 'per_hour'
      )
      or (
        filter_payment_type = 'fixed' and e.payment_mode = 'fixed'
      )
    );

  -- 3️⃣ Отримуємо події через core_accessible_events та формуємо DTO
  select jsonb_agg(
    dto_event_list_talent_public(e.*) || 
    jsonb_build_object(
      'role', 'talent_not_participant',
      -- Age groups БЕЗ preferences (таланти не бачать preferences)
      'event_age_groups', (
        select jsonb_agg(
          jsonb_build_object(
            'id', eag.id,
            'min_age', eag.min_age,
            'max_age', eag.max_age,
            'male_count', eag.male_count,
            'female_count', eag.female_count,
            'other_count', eag.other_count
            -- event_preferences НЕ включаємо для талантів
          )
        )
        from event_age_groups eag
        where eag.event_id = e.id
      )
    )
  )
  into events_data
  from (
    select e.*
    from core_accessible_events(uid, 'talent_public') e
    left join event_locations el on el.event_id = e.id
    where
      -- Пошук по назві
      (search_query is null or e.title ilike '%' || search_query || '%')
      -- Фільтр за відстанню (якщо вказано)
      -- Якщо фільтр за відстанню активний, але локації немає - не повертаємо подію
      and (
        filter_distance_km is null 
        or (
          filter_lat is not null 
          and filter_lng is not null
          and el.latitude is not null
          and el.longitude is not null
          -- Bounding box prefilter для оптимізації (зменшує кількість earth_distance обчислень)
          and el.latitude between filter_lat - (filter_distance_km / 111.0) 
                              and filter_lat + (filter_distance_km / 111.0)
          and el.longitude between filter_lng - (filter_distance_km / (111.0 * cos(radians(filter_lat))))
                               and filter_lng + (filter_distance_km / (111.0 * cos(radians(filter_lat))))
          -- Точна перевірка відстані
          and earth_distance(
            ll_to_earth(filter_lat, filter_lng),
            ll_to_earth(el.latitude, el.longitude)
          ) / 1000.0 <= filter_distance_km
        )
      )
      -- Фільтр за датою
      and (
        filter_date_from is null or e.start_at >= filter_date_from
      )
      and (
        filter_date_to is null or e.start_at <= filter_date_to
      )
      -- Фільтр за типом оплати
      and (
        filter_payment_type is null
        or (
          filter_payment_type = 'hourly' and e.payment_mode = 'per_hour'
        )
        or (
          filter_payment_type = 'fixed' and e.payment_mode = 'fixed'
        )
      )
    order by
      case
        when sort_mode = 'nearest'
         and filter_lat is not null
         and filter_lng is not null
         and el.latitude is not null
         and el.longitude is not null
        then earth_distance(
          ll_to_earth(filter_lat, filter_lng),
          ll_to_earth(el.latitude, el.longitude)
        )
        else null
      end nulls last,
      e.created_at desc
    limit limit_param
    offset offset_param
  ) e;

  -- 4️⃣ Повертаємо об'єкт з даними та метаданими
  return jsonb_build_object(
    'data', coalesce(events_data, '[]'::jsonb),
    'meta', jsonb_build_object(
      'total_count', coalesce(total_count, 0),
      'limit', limit_param,
      'offset', offset_param
    )
  );
end;
$$;

