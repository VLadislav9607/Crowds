-- RPC функція для оновлення організації
-- Дозволяє оновлювати organization_name та avatar_path тільки organization owner
-- Повертає оновлений об'єкт організації
-- Поля опціональні: якщо не передано (NULL), залишаються без змін

-- Видаляємо стару функцію, якщо вона існує (на випадок зміни типу повернення)
drop function if exists update_organization(uuid, text, text);

create or replace function update_organization(
  p_organization_id uuid,
  p_organization_name text default null,
  p_avatar_path text default null
)
returns json
language plpgsql
security definer
as $$
declare
  v_user_id uuid;
  v_is_owner boolean;
  v_organization json;
begin
  -- 1️⃣ Перевірка автентифікації
  v_user_id := auth.uid();
  if v_user_id is null then 
    raise exception 'User must be authenticated';
  end if;

  -- 2️⃣ Перевірка, що користувач є owner організації
  select exists (
    select 1
    from public.organizations_members
    where organizations_members.id = v_user_id
      and organizations_members.organization_id = p_organization_id
      and organizations_members.role = 'owner'
      and organizations_members.deleted_at is null
  ) into v_is_owner;

  if not v_is_owner then
    raise exception 'Only organization owner can update organization';
  end if;

  -- 3️⃣ Перевірка, що організація існує та не видалена
  if not exists (
    select 1
    from public.organizations
    where organizations.id = p_organization_id
      and organizations.deleted_at is null
  ) then
    raise exception 'Organization not found or deleted';
  end if;

  -- 4️⃣ Оновлення полів організації
  -- Оновлюємо поле тільки якщо параметр передано (не NULL)
  -- Якщо параметр NULL, поле не змінюється (залишається як є)
  -- Для встановлення NULL передайте NULL явно
  update public.organizations
  set
    organization_name = coalesce(p_organization_name, organization_name),
    avatar_path = coalesce(p_avatar_path, avatar_path)
  where id = p_organization_id
    and deleted_at is null;

  -- 5️⃣ Отримуємо оновлений об'єкт організації
  select to_json(o.*)
  into v_organization
  from public.organizations o
  where o.id = p_organization_id
    and o.deleted_at is null;

  return v_organization;
end;
$$;

