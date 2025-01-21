import {
  QueryClientProvider as QCProvider,
  QueryClient,
} from "@tanstack/react-query";

export const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 1000 * 60, // 5 mins
        staleTime: 5 * 1000 * 60,
        retry: false,
      },
    },
  });
  return <QCProvider client={queryClient}>{children}</QCProvider>;
};
