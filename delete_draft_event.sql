-- Функція для видалення draft події
create or replace function delete_draft_event(event_id_param uuid)
returns uuid
language plpgsql
security definer
as $$
declare
  deleted_event_id uuid;
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
    raise exception 'You are not authorized to delete drafts';
  end if;

  -- Перевірка що event існує, має статус 'draft' і належить користувачу
  if not exists (
    select 1
    from events
    where id = event_id_param
      and creator_id = auth.uid()
      and status = 'draft'
      and deleted_at is null
  ) then
    raise exception 'Draft event not found';
  end if;

  -- Виконуємо повне видалення draft події (hard delete)
  -- Всі пов'язані дані видаляються каскадом через foreign keys
  delete from events
  where id = event_id_param
  returning id into deleted_event_id;

  return deleted_event_id;
end;
$$;

