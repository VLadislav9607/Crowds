# Порівняння функцій: create_event_with_preferences → validate_event_for_publish + create_draft_or_event

## Основні проблеми у ваших версіях функцій

### ❌ Проблеми в `validate_event_for_publish`:

1. **Відсутня перевірка `registrationClosingAt`** - це обов'язкове поле для published events
2. **Неправильна перевірка `payment_amount`** - має бути `>= 15`, а не `> 0`
3. **Відсутня перевірка `location` з `street_number`** - обов'язкове для published
4. **Відсутня перевірка `ageGroups`** - мають бути не пусті і містити хоча б 1 особу
5. **Неправильні назви полів** - використовуєте `start_at`/`end_at`, але в payload це `startAt`/`endAt`
6. **Відсутня перевірка `end_at > start_at`** - хоча це є в оригіналі неявно через перевірку `end_at <= now()`

### ❌ Проблеми в `create_draft_or_event`:

1. **Відсутня вставка `location`** - повністю відсутній блок вставки в `event_locations`
2. **Неповна вставка preferences** - відсутні всі підтаблиці:
   - `event_preference_ethnicities`
   - `event_preference_accents`
   - `event_preference_eye_colors`
   - `event_preference_hair_colors`
   - `event_preference_facial_attributes`
   - `event_preference_body_attributes`
   - `event_preference_tattoo_spots`
   - `event_preference_skin_tones`
3. **Неправильна обробка `additionalThings`** - зараз `null`, має бути `array_to_string(...)`
4. **Неправильна обробка `null` значень** - потрібні `case when ... is not null` для boolean/int полів
5. **Неповна конвертація `payment_mode`** - відсутня обробка `'fixed'`

## ✅ Виправлені версії функцій

### `validate_event_for_publish` - виправлена версія:

```sql
-- ✅ Перевіряє title
-- ✅ Перевіряє всі дати (startAt, endAt, registrationClosingAt)
-- ✅ Перевіряє що дати в майбутньому
-- ✅ Перевіряє payment_amount >= 15
-- ✅ Перевіряє location з street_number
-- ✅ Перевіряє ageGroups не пусті і містять хоча б 1 особу
-- ✅ Використовує правильні назви полів (startAt, endAt)
```

### `create_draft_or_event` - виправлена версія:

```sql
-- ✅ Перевірка авторизації та прав
-- ✅ Визначення статусу
-- ✅ Валідація title
-- ✅ Парсинг дат
-- ✅ Виклик validate_event_for_publish для published
-- ✅ Вставка event з правильною конвертацією payment_mode
-- ✅ Вставка location (event_locations) - ВІДНОВЛЕНО
-- ✅ Вставка age groups
-- ✅ Вставка preferences з усіма підтаблицями - ВІДНОВЛЕНО
-- ✅ Правильна обробка null значень - ВІДНОВЛЕНО
-- ✅ Правильна обробка additionalThings - ВІДНОВЛЕНО
```

## Порівняння логіки

| Функціональність               | Оригінал | Ваша версія | Виправлена версія |
| ------------------------------ | -------- | ----------- | ----------------- |
| Перевірка авторизації          | ✅       | ✅          | ✅                |
| Перевірка прав (owner)         | ✅       | ✅          | ✅                |
| Валідація title                | ✅       | ✅          | ✅                |
| Парсинг дат                    | ✅       | ✅          | ✅                |
| Валідація для published        | ✅       | ⚠️ Неповна  | ✅                |
| Вставка event                  | ✅       | ✅          | ✅                |
| Вставка location               | ✅       | ❌ Відсутня | ✅                |
| Вставка age groups             | ✅       | ✅          | ✅                |
| Вставка preferences            | ✅       | ⚠️ Неповна  | ✅                |
| Вставка підтаблиць preferences | ✅       | ❌ Відсутня | ✅                |

## Рекомендації

1. Використовуйте виправлені версії функцій з файлів:

   - `validate_event_for_publish.sql`
   - `create_draft_or_event.sql`

2. Переконайтеся, що функція `validate_event_for_publish` створена перед `create_draft_or_event`, оскільки друга викликає першу.

3. Після застосування SQL функцій, оновіть TypeScript типи в `src/services/supabase/types.ts` для нових RPC функцій.

4. Оновіть `useCreateEventDraft/action.ts` щоб використовувати `create_draft_or_event` замість `create_event_with_preferences`.
