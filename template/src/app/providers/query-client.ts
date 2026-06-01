import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: Number.POSITIVE_INFINITY,
      retry: false,
    },
    queries: {
      gcTime: Number.POSITIVE_INFINITY,
      retry: false,
    },
  },
});
