import { useState } from 'react';

export function useRefetchQuery(refetch?: () => Promise<unknown>) {
  const [isRefetchingQuery, setIsRefetchingQuery] = useState(false);

  async function refetchQuery() {
    if (!refetch) return;
    setIsRefetchingQuery(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingQuery(false);
    }
  }

  return {
    isRefetchingQuery,
    refetchQuery,
  };
}
