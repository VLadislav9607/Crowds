# Оновлення функції get_public_events_search

## Додані параметри фільтрації

Функція була доповнена наступними параметрами для підтримки всіх фільтрів з компонента `TalentEventsFilterModal`:

### 1. `filter_distance_km` (double precision)

- **Опис**: Максимальна відстань в кілометрах від вказаної локації
- **Джерело**: `filters.distance` з компонента
- **Логіка**: Фільтрує події, відстань до яких не перевищує вказане значення
- **Використання**: Використовує функцію `earth_distance()` для розрахунку відстані між координатами

### 2. `filter_date_from` (timestamp with time zone)

- **Опис**: Початкова дата для фільтрації подій
- **Джерело**: `filters.date.from` з компонента
- **Логіка**: Показує тільки події, де `start_at >= filter_date_from`

### 3. `filter_date_to` (timestamp with time zone)

- **Опис**: Кінцева дата для фільтрації подій
- **Джерело**: `filters.date.to` з компонента
- **Логіка**: Показує тільки події, де `start_at <= filter_date_to`

### 4. `filter_payment_type` (text)

- **Опис**: Тип оплати
- **Джерело**: `filters.paymentType` з компонента
- **Можливі значення**:
  - `'hourly'` - відповідає `payment_mode = 'per_hour'` в БД
  - `'fixed'` - відповідає `payment_mode = 'fixed'` в БД
- **Логіка**: Фільтрує події за типом оплати

## Важливі примітки

1. **Координати для фільтрації за відстанню**:

   - Використовуються параметри `user_lat` та `user_lng`
   - Якщо в компоненті вибрано "Another Location", координати з `filters.sortByLocation` мають передаватися як `user_lat` та `user_lng`
   - Якщо вибрано "Profile Location", координати мають братися з профілю користувача

2. **Сортування за локацією**:

   - Якщо `sort_mode = 'nearest'` та вказані координати (`user_lat`, `user_lng`), події сортуються за відстанню
   - Інакше - за датою створення (`created_at desc`)

3. **Фільтр за відстанню**:

   - Працює тільки якщо вказані координати (`user_lat`, `user_lng`) та координати локації події (`el.latitude`, `el.longitude`)
   - **Важливо**: Якщо фільтр за відстанню активний (`filter_distance_km` вказано), але подія не має локації (`el.latitude` або `el.longitude` є null), така подія **не повертається** взагалі
   - Використовується **bounding box prefilter** для оптимізації:
     - Спочатку фільтрує події за приблизним діапазоном координат (bounding box)
     - Потім виконує точний розрахунок відстані через `earth_distance()`
   - Bounding box використовує формулу: `111.0 км на градус` для latitude та `111.0 * cos(latitude)` для longitude
   - Це значно зменшує кількість обчислень `earth_distance()` та покращує продуктивність
   - Відстань розраховується в метрах через `earth_distance()`, потім ділиться на 1000 для перетворення в кілометри

4. **Фільтр за датою**:
   - Обидва параметри (`filter_date_from` та `filter_date_to`) є опціональними
   - Можна використовувати тільки один з них
   - Користувач може сам вибрати діапазон дат, тому фільтр за типом роботи (urgent jobs) був видалений

## Приклад використання

```sql
SELECT get_public_events_search(
  search_query := 'event name',
  sort_mode := 'nearest',
  user_lat := -37.8136,
  user_lng := 144.9631,
  limit_param := 20,
  offset_param := 0,
  filter_distance_km := 50,
  filter_date_from := '2024-01-01 00:00:00+00'::timestamptz,
  filter_date_to := '2024-12-31 23:59:59+00'::timestamptz,
  filter_payment_type := 'hourly'
);
```

## Необхідні зміни на фронтенді

Потрібно оновити функцію `searchPublicEventsAction` в `src/actions/events/useSearchPublicEvents/action.ts`, щоб передавати нові параметри:

```typescript
export const searchPublicEventsAction = async (
  params: UseSearchPublicEventsBodyDto = {},
): Promise<UseSearchPublicEventsResDto> => {
  const { data, error } = await supabase.rpc('get_public_events_search', {
    limit_param: params.limit,
    offset_param: params.offset,
    search_query: params.search_query,
    user_lat: params.user_lat,
    user_lng: params.user_lng,
    sort_mode: params.sort_mode,
    filter_distance_km: params.filter_distance_km,
    filter_date_from: params.filter_date_from,
    filter_date_to: params.filter_date_to,
    filter_payment_type: params.filter_payment_type,
  });

  if (error) throw error;

  return data as unknown as UseSearchPublicEventsResDto;
};
```

Також потрібно оновити типи в `src/actions/events/useSearchPublicEvents/types.ts` та компонент `SearchEventsList`, щоб передавати фільтри з `TalentEventsFilterModal`.
