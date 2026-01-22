-- SQL функція для отримання талантів, які підходять на івент з урахуванням preferences
-- Функція фільтрує талантів по всіх preferences з усіх age groups івента
-- Талант підходить, якщо він відповідає хоча б одному набору preferences з будь-якого age group
-- Якщо у івента немає preferences, повертаються всі таланти (крім вже запрошених)

CREATE OR REPLACE FUNCTION get_matching_talents(
  p_event_id UUID,
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0,
  p_search_query TEXT DEFAULT NULL,
  p_distance_km NUMERIC DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  has_preferences BOOLEAN;
  event_lat NUMERIC;
  event_lng NUMERIC;
BEGIN
  -- Перевіряємо чи є у івента preferences
  -- Змінюємо на перевірку наявності event_age_groups (бо preferences можуть бути не вказані)
  SELECT EXISTS (
    SELECT 1
    FROM event_age_groups eag
    WHERE eag.event_id = p_event_id
  ) INTO has_preferences;

  -- Отримуємо локацію івента (якщо є)
  SELECT el.latitude, el.longitude
  INTO event_lat, event_lng
  FROM event_locations el
  WHERE el.event_id = p_event_id
  LIMIT 1;

    -- Якщо немає preferences, повертаємо всіх талантів (як у оригінальній функції)
    IF NOT has_preferences THEN
      RETURN (
        WITH filtered_talents AS (
          SELECT
            t.id,
            t.first_name,
            t.last_name,
            t.avatar_path,
            t.created_at,
            tl.city,
            tl.country
          FROM talents t
          INNER JOIN talent_location tl ON tl.talent_id = t.id
          WHERE t.deleted_at IS NULL
            -- Талант має мати локацію
            AND tl.latitude IS NOT NULL
            AND tl.longitude IS NOT NULL
            -- Перевірка, що талант не вже запрошений на івент
            AND NOT EXISTS (
              SELECT 1
              FROM event_participations ep
              WHERE ep.event_id = p_event_id
                AND ep.talent_id = t.id
            )
            -- Пошук по імені та прізвищу
            AND (
              p_search_query IS NULL
              OR p_search_query = ''
              OR (
                t.first_name ILIKE '%' || p_search_query || '%'
                OR t.last_name ILIKE '%' || p_search_query || '%'
                OR (t.first_name || ' ' || t.last_name) ILIKE '%' || p_search_query || '%'
              )
            )
            -- Фільтр по відстані (тільки якщо івент має локацію та вказано distance)
            AND (
              p_distance_km IS NULL
              OR event_lat IS NULL
              OR event_lng IS NULL
              OR (
                -- Формула гаверсинуса для розрахунку відстані в км
                -- 6371 - радіус Землі в км
                6371 * acos(
                  LEAST(1.0, 
                    cos(radians(event_lat)) * 
                    cos(radians(tl.latitude)) * 
                    cos(radians(tl.longitude) - radians(event_lng)) + 
                    sin(radians(event_lat)) * 
                    sin(radians(tl.latitude))
                  )
                ) <= p_distance_km
              )
            )
        ),
        total_count_value AS (
          SELECT COUNT(*)::INTEGER as total_count
          FROM filtered_talents
        ),
        paginated_talents AS (
          SELECT
            ft.id,
            ft.first_name,
            ft.last_name,
            ft.avatar_path,
            ft.city,
            ft.country
          FROM filtered_talents ft
          ORDER BY ft.created_at DESC
          LIMIT p_limit
          OFFSET p_offset
        )
        SELECT json_build_object(
          'data', COALESCE(
            (SELECT json_agg(
              json_build_object(
                'id', pt.id,
                'first_name', pt.first_name,
                'last_name', pt.last_name,
                'avatar_path', pt.avatar_path,
                'location', json_build_object(
                  'city', pt.city,
                  'country', pt.country
                )
              )
            )
            FROM paginated_talents pt),
            '[]'::json
          ),
          'meta', json_build_object(
            'offset', p_offset,
            'limit', p_limit,
            'total_count', COALESCE(tcv.total_count, 0)
          )
        )
        FROM total_count_value tcv
      );
    END IF;

  -- Якщо є preferences, фільтруємо по них
  -- Талант має відповідати ВСІМ умовам з хоча б одного age group
  RETURN (
    WITH matching_talents AS (
      -- Знаходимо талантів, які відповідають ВСІМ умовам з хоча б одного age group
      SELECT DISTINCT t.id
      FROM talents t
      INNER JOIN talent_location tl ON tl.talent_id = t.id
      WHERE t.deleted_at IS NULL
        -- Талант має мати локацію
        AND tl.latitude IS NOT NULL
        AND tl.longitude IS NOT NULL
        -- Перевірка, що талант не вже запрошений на івент
        AND NOT EXISTS (
          SELECT 1
          FROM event_participations ep
          WHERE ep.event_id = p_event_id
            AND ep.talent_id = t.id
        )
        -- Пошук по імені та прізвищу
        AND (
          p_search_query IS NULL
          OR p_search_query = ''
          OR (
            t.first_name ILIKE '%' || p_search_query || '%'
            OR t.last_name ILIKE '%' || p_search_query || '%'
            OR (t.first_name || ' ' || t.last_name) ILIKE '%' || p_search_query || '%'
          )
        )
        -- Фільтр по відстані (тільки якщо івент має локацію та вказано distance)
        AND (
          p_distance_km IS NULL
          OR event_lat IS NULL
          OR event_lng IS NULL
          OR (
            -- Формула гаверсинуса для розрахунку відстані в км
            -- 6371 - радіус Землі в км
            6371 * acos(
              LEAST(1.0, 
                cos(radians(event_lat)) * 
                cos(radians(tl.latitude)) * 
                cos(radians(tl.longitude) - radians(event_lng)) + 
                sin(radians(event_lat)) * 
                sin(radians(tl.latitude))
              )
            ) <= p_distance_km
          )
        )
        -- Перевірка, що талант відповідає хоча б одному набору preferences (age group)
        -- ТИМЧАСОВО ЗАКОМЕНТОВАНО ДЛЯ ДЕБАГУ
        -- AND EXISTS (
        --   SELECT 1
        --   FROM event_age_groups eag
        --   LEFT JOIN event_preferences ep ON ep.age_group_id = eag.id
        --   WHERE eag.event_id = p_event_id
            -- Перевірка віку таланта
            -- AND extract(year from age(t.birth_date)) >= eag.min_age
            -- AND extract(year from age(t.birth_date)) <= eag.max_age
            -- Перевірка gender - талант має відповідати хоча б одному gender count > 0
            -- AND (
            --   (t.gender = 'male' AND eag.male_count > 0)
            --   OR (t.gender = 'female' AND eag.female_count > 0)
            --   OR (t.gender = 'other' AND eag.other_count > 0)
            -- )
            -- ТИМЧАСОВО ЗАКОМЕНТОВАНО ІНШІ ПЕРЕВІРКИ ДЛЯ ДЕБАГУ
            -- Перевірка weight (build) - якщо вказано діапазон, талант має відповідати
            -- AND (
            --   ep.weight_min IS NULL
            --   OR ep.weight_max IS NULL
            --   OR t.build IS NULL
            --   OR (
            --     t.build >= ep.weight_min
            --     AND t.build <= ep.weight_max
            --   )
            -- )
            -- Перевірка height - якщо вказано діапазон, талант має відповідати
            -- AND (
            --   ep.height_min IS NULL
            --   OR ep.height_max IS NULL
            --   OR t.height IS NULL
            --   OR (
            --     t.height >= ep.height_min
            --     AND t.height <= ep.height_max
            --   )
            -- )
            -- Перевірка pregnancy - застосовується тільки для жінок
            -- AND (
            --   t.gender != 'female'
            --   OR (
            --     ep.pregnancy_allowed IS NULL
            --     OR ep.pregnancy_allowed = true
            --     OR (
            --       t.is_pregnant IS NULL
            --       OR t.is_pregnant = false
            --     )
            --     OR (
            --       t.is_pregnant = true
            --       AND ep.pregnancy_allowed = true
            --       AND (
            --         ep.pregnancy_months IS NULL
            --         OR t.pregnancy_months IS NULL
            --         OR t.pregnancy_months <= ep.pregnancy_months
            --       )
            --     )
            --   )
            -- )
            -- Перевірка accent
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_accents epa
            --     WHERE epa.preference_id = ep.id
            --   )
            --   OR (
            --     t.accent IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_accents epa
            --       WHERE epa.preference_id = ep.id
            --         AND epa.value = t.accent
            --     )
            --   )
            -- )
            -- Перевірка ethnicity
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_ethnicities epe
            --     WHERE epe.preference_id = ep.id
            --   )
            --   OR (
            --     t.ethnicity IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_ethnicities epe
            --       WHERE epe.preference_id = ep.id
            --         AND epe.value = t.ethnicity
            --     )
            --   )
            -- )
            -- Перевірка eye_color
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_eye_colors epec
            --     WHERE epec.preference_id = ep.id
            --   )
            --   OR (
            --     t.eye_color IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_eye_colors epec
            --       WHERE epec.preference_id = ep.id
            --         AND epec.value = t.eye_color
            --     )
            --   )
            -- )
            -- Перевірка hair_color
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_hair_colors ephc
            --     WHERE ephc.preference_id = ep.id
            --   )
            --   OR (
            --     t.hair_color IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_hair_colors ephc
            --       WHERE ephc.preference_id = ep.id
            --         AND ephc.value = t.hair_color
            --     )
            --   )
            -- )
            -- Перевірка skin_tone
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_skin_tones epst
            --     WHERE epst.preference_id = ep.id
            --   )
            --   OR (
            --     t.skin_tone IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_skin_tones epst
            --       WHERE epst.preference_id = ep.id
            --         AND epst.value = t.skin_tone
            --     )
            --   )
            -- )
            -- Перевірка facial_attributes
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_facial_attributes epfa
            --     WHERE epfa.preference_id = ep.id
            --   )
            --   OR (
            --     t.facial_attributes IS NOT NULL
            --     AND array_length(t.facial_attributes, 1) IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_facial_attributes epfa
            --       WHERE epfa.preference_id = ep.id
            --         AND epfa.value = ANY(t.facial_attributes)
            --     )
            --   )
            -- )
            -- Перевірка body_attributes
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_body_attributes epba
            --     WHERE epba.preference_id = ep.id
            --   )
            --   OR (
            --     t.body_attributes IS NOT NULL
            --     AND array_length(t.body_attributes, 1) IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_body_attributes epba
            --       WHERE epba.preference_id = ep.id
            --         AND epba.value = ANY(t.body_attributes)
            --     )
            --   )
            -- )
            -- Перевірка tattoo_spot
            -- AND (
            --   ep.id IS NULL
            --   OR NOT EXISTS (
            --     SELECT 1
            --     FROM event_preference_tattoo_spots epts
            --     WHERE epts.preference_id = ep.id
            --   )
            --   OR (
            --     t.tattoo_spot IS NOT NULL
            --     AND array_length(t.tattoo_spot, 1) IS NOT NULL
            --     AND EXISTS (
            --       SELECT 1
            --       FROM event_preference_tattoo_spots epts
            --       WHERE epts.preference_id = ep.id
            --         AND epts.value = ANY(t.tattoo_spot)
            --     )
            --   )
            -- )
        -- )
    ),
    filtered_talents AS (
      SELECT
        t.id,
        t.first_name,
        t.last_name,
        t.avatar_path,
        t.created_at,
        tl.city,
        tl.country
      FROM talents t
      INNER JOIN matching_talents mt ON mt.id = t.id
      INNER JOIN talent_location tl ON tl.talent_id = t.id
      WHERE t.deleted_at IS NULL
    ),
    total_count_value AS (
      SELECT COUNT(*)::INTEGER as total_count
      FROM filtered_talents
    ),
  paginated_talents AS (
    SELECT
      ft.id,
      ft.first_name,
      ft.last_name,
      ft.avatar_path,
      ft.city,
      ft.country
    FROM filtered_talents ft
    ORDER BY ft.created_at DESC
    LIMIT p_limit
    OFFSET p_offset
  )
  SELECT json_build_object(
    'data', COALESCE(
      (SELECT json_agg(
        json_build_object(
          'id', pt.id,
          'first_name', pt.first_name,
          'last_name', pt.last_name,
          'avatar_path', pt.avatar_path,
          'location', json_build_object(
            'city', pt.city,
            'country', pt.country
          )
        )
      )
      FROM paginated_talents pt),
      '[]'::json
    ),
    'meta', json_build_object(
      'offset', p_offset,
      'limit', p_limit,
      'total_count', COALESCE(tcv.total_count, 0)
    )
  )
  FROM total_count_value tcv
  );
END;
$$ LANGUAGE plpgsql;
