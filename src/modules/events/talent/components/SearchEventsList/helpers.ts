import { TalentEventsFilterData } from '../../modals';
import { UseSearchPublicEventsBodyDto } from '@actions';

/**
 * Конвертує TalentEventsFilterData в формат для SQL функції
 */
export const convertFiltersToSearchParams = (
  filters: TalentEventsFilterData,
  profileLocation?: { latitude: number; longitude: number } | null,
): Omit<UseSearchPublicEventsBodyDto, 'limit' | 'offset'> => {
  const params: Omit<UseSearchPublicEventsBodyDto, 'limit' | 'offset'> = {};

  // Визначаємо координати для сортування та фільтрації
  let userLat: number | undefined;
  let userLng: number | undefined;
  let sortMode: string | undefined;

  // Пріоритет: спочатку перевіряємо чи вибрано "Another Location"
  if (filters.sortByLocation) {
    // Якщо вибрано "Another Location"
    userLat = filters.sortByLocation.latitude;
    userLng = filters.sortByLocation.longitude;
    sortMode = 'nearest';
  } else if (profileLocation) {
    // Якщо вибрано "Profile Location" або потрібні координати для фільтрації за відстанню
    userLat = profileLocation.latitude;
    userLng = profileLocation.longitude;
    // Встановлюємо sort_mode тільки якщо НЕ вибрано фільтр за відстанню
    // (якщо тільки фільтр за відстанню - не сортуємо, тільки фільтруємо)
    if (filters.distance === undefined) {
      sortMode = 'nearest';
    }
  }

  // Фільтр за відстанню
  if (filters.distance !== undefined) {
    params.filter_distance_km = filters.distance;
    // Якщо фільтр за відстанню активний, але координати не визначені - SQL функція не поверне події
    // Тому важливо, щоб координати були визначені (або з профілю, або з sortByLocation)
  }

  // Додаємо координати та sort_mode тільки якщо вони визначені
  if (userLat !== undefined && userLng !== undefined) {
    params.user_lat = userLat;
    params.user_lng = userLng;
    if (sortMode) {
      params.sort_mode = sortMode;
    }
  }

  // Фільтр за датою або job type (urgent jobs)
  if (filters.jobType) {
    const now = new Date();
    params.filter_date_from = now.toISOString();

    if (filters.jobType === 'urgent_24_hours') {
      // Додаємо 24 години до поточної дати
      const dateTo = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      params.filter_date_to = dateTo.toISOString();
    } else if (filters.jobType === 'urgent_3_days') {
      // Додаємо 3 дні до поточної дати
      const dateTo = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      params.filter_date_to = dateTo.toISOString();
    }
  } else {
    // Якщо jobType не вибрано, використовуємо звичайний фільтр за датою
    if (filters.date?.from) {
      params.filter_date_from = filters.date.from.toISOString();
    }
    if (filters.date?.to) {
      params.filter_date_to = filters.date.to.toISOString();
    }
  }

  // Фільтр за типом оплати
  if (filters.paymentType) {
    params.filter_payment_type = filters.paymentType;
  }

  return params;
};
