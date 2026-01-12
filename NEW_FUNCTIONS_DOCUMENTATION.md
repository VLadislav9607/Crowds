# Документація нових функцій для роботи з draft подіями

## Огляд

Створено дві нові функції для роботи з draft подіями:

1. `update_draft_event` - для редагування draft події (все крім статусу)
2. `publish_draft_event` - для публікування draft події з валідацією

## 1. `update_draft_event(event_id_param uuid, payload jsonb)`

### Призначення

Оновлює існуючу draft подію. Дозволяє змінювати всі поля крім статусу.

### Параметри

- `event_id_param` (uuid) - ID події, яку потрібно оновити
- `payload` (jsonb) - JSON об'єкт з даними для оновлення

### Структура payload

```json
{
  "title": "string",                    // опціонально
  "category": "uuid",                   // опціонально
  "startAt": "ISO datetime string",     // опціонально
  "endAt": "ISO datetime string",       // опціонально
  "registrationClosingAt": "ISO datetime string", // опціонально
  "visibility": "public" | "private",   // опціонально
  "payment_mode": "perHour" | "fixed",  // опціонально
  "payment_amount": number,             // опціонально
  "eventBrief": "string",               // опціонально
  "uploadNDA": boolean,                 // опціонально
  "ndaDocumentName": "string",          // опціонально
  "ndaDocumentPath": "string",          // опціонально
  "location": {                         // опціонально
    "autocomplete_description": "string",
    "city": "string",
    "country": "string",
    "formatted_address": "string",
    "latitude": number,
    "longitude": number,
    "place_id": "string",
    "postal_code": "string",
    "region": "string",
    "street_name": "string",
    "street_number": "string",
    "timezone": "string"
  },
  "ageGroups": [                        // опціонально
    {
      "minAge": number,
      "maxAge": number,
      "maleCount": number,
      "femaleCount": number,
      "othersCount": number,
      "preferences": {                   // опціонально
        "minWeight": number,
        "maxWeight": number,
        "minHeight": number,
        "maxHeight": number,
        "isPregnant": boolean,
        "months": number,
        "additionalThings": ["string"],
        "ethnicity": ["string"],
        "accent": ["string"],
        "eyeColour": ["string"],
        "hairColour": ["string"],
        "facialAttributes": ["string"],
        "bodyAttributes": ["string"],
        "tattooSpot": ["string"],
        "skinTone": ["string"]
      }
    }
  ]
}
```

### Поведінка

- **Оновлення полів**: Оновлює тільки ті поля, які передані в payload (використовує `coalesce`)
- **Location**: Якщо передано `location`, видаляє старий location і створює новий
- **Age Groups**: Якщо передано `ageGroups`, видаляє всі старі age groups (з каскадним видаленням preferences) і створює нові
- **Статус**: Статус НЕ можна змінити через цю функцію

### Перевірки

- ✅ Користувач авторизований
- ✅ Користувач є власником організації
- ✅ Подія існує і належить користувачу
- ✅ Подія має статус 'draft'
- ✅ Title не може бути порожнім рядком (якщо передано)

### Повертає

- `uuid` - ID оновленої події

### Помилки

- `User must be authenticated` - користувач не авторизований
- `You are not authorized to update events` - користувач не є власником організації
- `Event not found` - подія не існує або не належить користувачу
- `Only draft events can be updated` - подія не має статусу 'draft'
- `title cannot be empty` - передано порожній title

---

## 2. `publish_draft_event(event_id_param uuid)`

### Призначення

Публікує draft подію, змінюючи її статус на 'published' після валідації через `validate_event_for_publish`.

### Параметри

- `event_id_param` (uuid) - ID draft події, яку потрібно опублікувати

### Поведінка

1. **Збір даних**: Збирає всі дані події з бази (event, location, age groups, preferences)
2. **Валідація**: Викликає `validate_event_for_publish` з зібраними даними
3. **Оновлення статусу**: Якщо валідація пройшла успішно, змінює статус на 'published'

### Перевірки

- ✅ Користувач авторизований
- ✅ Користувач є власником організації
- ✅ Подія існує і належить користувачу
- ✅ Подія має статус 'draft'
- ✅ Всі валідації з `validate_event_for_publish`:
  - Title обов'язковий
  - Дати (startAt, endAt, registrationClosingAt) обов'язкові
  - Дати мають бути в майбутньому
  - payment_amount >= 15
  - Location має містити street_number
  - ageGroups не пусті і містять хоча б 1 особу

### Повертає

- `uuid` - ID опублікованої події

### Помилки

- `User must be authenticated` - користувач не авторизований
- `You are not authorized to publish events` - користувач не є власником організації
- `Draft event not found or already published` - подія не існує, не належить користувачу або вже опублікована
- Всі помилки з `validate_event_for_publish`:
  - `title is required`
  - `startAt is required for published event`
  - `endAt is required for published event`
  - `registrationClosingAt is required for published event`
  - `startAt must be in the future`
  - `endAt must be in the future`
  - `payment_amount must be at least 15 dollars`
  - `location is required for published event`
  - `location must contain street_number (full address is required)`
  - `ageGroups cannot be empty`
  - `ageGroups must contain at least 1 person across all groups`

---

## Приклади використання

### Оновлення draft події

```sql
-- Оновлення тільки title та payment_amount
select update_draft_event(
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  '{
    "title": "New Title",
    "payment_amount": 20
  }'::jsonb
);

-- Оновлення location та age groups
select update_draft_event(
  '123e4567-e89b-12d3-a456-426614174000'::uuid,
  '{
    "location": {
      "autocomplete_description": "Sydney, NSW, Australia",
      "city": "Sydney",
      "country": "Australia",
      "formatted_address": "123 Main St, Sydney NSW 2000",
      "latitude": -33.8688,
      "longitude": 151.2093,
      "place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
      "street_number": "123",
      "street_name": "Main St",
      "region": "NSW",
      "timezone": "Australia/Sydney"
    },
    "ageGroups": [
      {
        "minAge": 18,
        "maxAge": 30,
        "maleCount": 5,
        "femaleCount": 3,
        "othersCount": 0
      }
    ]
  }'::jsonb
);
```

### Публікування draft події

```sql
-- Публікування draft події
select publish_draft_event('123e4567-e89b-12d3-a456-426614174000'::uuid);
```

---

## Порівняння з оригінальними функціями

| Функціональність         | `create_draft_or_event` | `update_draft_event` | `publish_draft_event`  |
| ------------------------ | ----------------------- | -------------------- | ---------------------- |
| Створення нової події    | ✅                      | ❌                   | ❌                     |
| Оновлення існуючої події | ❌                      | ✅                   | ❌                     |
| Зміна статусу            | ✅ (при створенні)      | ❌                   | ✅ (draft → published) |
| Валідація для published  | ✅                      | ❌                   | ✅                     |
| Перевірка прав           | ✅                      | ✅                   | ✅                     |
| Перевірка статусу draft  | ❌                      | ✅                   | ✅                     |

---

## Важливі зауваження

1. **Статус не можна змінити через `update_draft_event`** - для публікації використовуйте `publish_draft_event`
2. **Валідація для published** - `publish_draft_event` автоматично викликає `validate_event_for_publish`
3. **Каскадне видалення** - при оновленні age groups старі preferences видаляються автоматично через CASCADE
4. **Часткове оновлення** - `update_draft_event` оновлює тільки передані поля (використовує `coalesce`)
5. **Форматування дат** - `publish_draft_event` автоматично конвертує timestamptz в ISO string для валідації
