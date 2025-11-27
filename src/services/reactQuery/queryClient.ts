import { QueryClient } from '@tanstack/react-query';

const fifteen_minutes = 15 * (60 * 1000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: fifteen_minutes,
      gcTime: fifteen_minutes * 2,
      retry: 3,
    },
  },
});
