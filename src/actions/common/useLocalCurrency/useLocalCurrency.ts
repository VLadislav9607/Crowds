import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS, COUNTRY_CURRENCY } from '@constants';
import { queryClient, supabase } from '@services';
import { useGetMe } from '../useGetMe';

interface ExchangeRateRow {
  currency_code: string;
  rate: number;
}

const fetchExchangeRatesAction = async (): Promise<ExchangeRateRow[]> => {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('currency_code, rate');

  if (error) throw error;
  return data ?? [];
};

export const prefetchExchangeRates = () =>
  queryClient.prefetchQuery({
    queryKey: [TANSTACK_QUERY_KEYS.EXCHANGE_RATE],
    queryFn: fetchExchangeRatesAction,
    staleTime: 1000 * 60 * 60,
  });

export const useLocalCurrency = () => {
  const { talent } = useGetMe();
  const countryCode = talent?.talent_location?.country_code ?? null;
  const currencyInfo =
    countryCode && countryCode !== 'US'
      ? COUNTRY_CURRENCY[countryCode] ?? null
      : null;
  const currencyCode = currencyInfo?.code ?? null;

  const { data, isLoading } = useQuery<ExchangeRateRow[]>({
    queryKey: [TANSTACK_QUERY_KEYS.EXCHANGE_RATE],
    queryFn: fetchExchangeRatesAction,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!currencyCode && currencyCode !== 'USD',
  });

  const rate = currencyCode
    ? data?.find(r => r.currency_code === currencyCode)?.rate ?? null
    : null;

  const formatLocal = useCallback(
    (usdCents: number): string | null => {
      if (!rate || !currencyInfo) return null;
      const localAmount = Math.round((usdCents / 100) * rate);
      return `≈ ${currencyInfo.symbol}${localAmount}`;
    },
    [rate, currencyInfo],
  );

  return {
    localCurrency: currencyCode,
    rate,
    isLoading,
    formatLocal,
  };
};
