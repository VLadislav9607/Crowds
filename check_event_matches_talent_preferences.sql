-- ✅ Окрема функція для перевірки, чи event відповідає preferences таланта
-- 
-- Повертає TRUE, якщо талант підходить хоча б до одного age_group з preferences
-- Повертає FALSE, якщо талант не підходить або не знайдено
-- Повертає NULL, якщо користувач не талант (для fallback логіки)

create or replace function check_event_matches_talent_preferences(
  p_event_id uuid,
  p_talent_id uuid default null  -- Якщо null, використовує auth.uid()
)
returns boolean
language plpgsql
security definer
stable
as $$
declare
  talent_record talents%rowtype;
  talent_age integer;
  talent_gender text;
  talent_id uuid;
begin
  -- Визначаємо talent_id
  if p_talent_id is not null then
    talent_id := p_talent_id;
  else
    talent_id := auth.uid();
  end if;

  -- Якщо talent_id не вказано, повертаємо NULL (для fallback)
  if talent_id is null then
    return null;
  end if;

  -- Отримуємо дані таланта
  select * into talent_record
  from talents
  where id = talent_id
    and deleted_at is null;

  -- Якщо талант не знайдений, повертаємо NULL
  if talent_record.id is null then
    return null;
  end if;

  -- Обчислюємо вік таланта
  talent_age := extract(year from age(talent_record.birth_date));
  talent_gender := talent_record.gender;

  -- Перевіряємо, чи є хоча б один age_group, якому відповідає талант
  -- ВАЖЛИВО: Якщо у event немає age_groups, функція поверне FALSE
  -- (event не відповідає, бо немає критеріїв для перевірки)
  return exists (
    select 1
    from event_age_groups eag
    left join event_preferences ep on ep.age_group_id = eag.id
    where eag.event_id = p_event_id
      
      -- Перевірка віку та статі
      and talent_age >= eag.min_age
      and talent_age <= eag.max_age
      and (
        (talent_gender = 'male' and eag.male_count > 0)
        or (talent_gender = 'female' and eag.female_count > 0)
        or (talent_gender = 'other' and eag.other_count > 0)
      )

      -- Перевірка зросту (якщо вказано)
      and (
        ep.height_min is null
        or ep.height_max is null
        or talent_record.height is null
        or (
          talent_record.height >= ep.height_min
          and talent_record.height <= ep.height_max
        )
      )

      -- Перевірка ваги (якщо вказано)
      and (
        ep.weight_min is null
        or ep.weight_max is null
        or talent_record.build is null
        or (
          talent_record.build >= ep.weight_min
          and talent_record.build <= ep.weight_max
        )
      )

      -- Перевірка вагітності (тільки для жінок)
      and (
        talent_gender != 'female'  -- Якщо не жінка, пропускаємо перевірку
        or (
          ep.pregnancy_allowed is null
          or ep.pregnancy_allowed = true
          or (
            talent_record.is_pregnant is null
            or talent_record.is_pregnant = false
          )
          or (
            talent_record.is_pregnant = true
            and ep.pregnancy_allowed = true
            and (
              ep.pregnancy_months is null
              or talent_record.pregnancy_months is null
              or talent_record.pregnancy_months <= ep.pregnancy_months
            )
          )
        )
      )

      -- Перевірка ethnicity (якщо вказано хоча б одне значення)
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_ethnicities epe
          where epe.preference_id = ep.id
        )
        or talent_record.ethnicity is null
        or exists (
          select 1
          from event_preference_ethnicities epe
          where epe.preference_id = ep.id
            and epe.value = talent_record.ethnicity
        )
      )

      -- Перевірка eye_color
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_eye_colors epec
          where epec.preference_id = ep.id
        )
        or talent_record.eye_color is null
        or exists (
          select 1
          from event_preference_eye_colors epec
          where epec.preference_id = ep.id
            and epec.value = talent_record.eye_color
        )
      )

      -- Перевірка hair_color
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_hair_colors ephc
          where ephc.preference_id = ep.id
        )
        or talent_record.hair_color is null
        or exists (
          select 1
          from event_preference_hair_colors ephc
          where ephc.preference_id = ep.id
            and ephc.value = talent_record.hair_color
        )
      )

      -- Перевірка skin_tone
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_skin_tones epst
          where epst.preference_id = ep.id
        )
        or talent_record.skin_tone is null
        or exists (
          select 1
          from event_preference_skin_tones epst
          where epst.preference_id = ep.id
            and epst.value = talent_record.skin_tone
        )
      )

      -- Перевірка facial_attributes (масив перетинається)
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_facial_attributes epfa
          where epfa.preference_id = ep.id
        )
        or talent_record.facial_attributes is null
        or array_length(talent_record.facial_attributes, 1) is null
        or exists (
          select 1
          from event_preference_facial_attributes epfa
          where epfa.preference_id = ep.id
            and epfa.value = any(talent_record.facial_attributes)
        )
      )

      -- Перевірка body_attributes
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_body_attributes epba
          where epba.preference_id = ep.id
        )
        or talent_record.body_attributes is null
        or exists (
          select 1
          from event_preference_body_attributes epba
          where epba.preference_id = ep.id
            and epba.value = talent_record.body_attributes
        )
      )

      -- Перевірка tattoo_spot (масив перетинається)
      and (
        ep.id is null
        or not exists (
          select 1
          from event_preference_tattoo_spots epts
          where epts.preference_id = ep.id
        )
        or talent_record.tattoo_spot is null
        or array_length(talent_record.tattoo_spot, 1) is null
        or exists (
          select 1
          from event_preference_tattoo_spots epts
          where epts.preference_id = ep.id
            and epts.value = any(talent_record.tattoo_spot)
        )
      )
  );
end;
$$;

-- Коментарі для документації
comment on function check_event_matches_talent_preferences is 
'Перевіряє, чи event відповідає preferences таланта. Повертає TRUE якщо підходить, FALSE якщо ні, NULL якщо користувач не талант.';
