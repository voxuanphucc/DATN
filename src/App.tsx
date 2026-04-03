import { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appRoutes } from './routes';
import { LoadingPage } from './components/ui/LoadingPage';
import { useUiStore, selectIsPageLoading } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 phút
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  const routes = useRoutes(appRoutes);
  return routes;
}

export function App() {
  const [isSplash, setIsSplash] = useState(true);
  const isPageLoading = useUiStore(selectIsPageLoading);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = isSplash || isPageLoading;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingPage isVisible={isLoading} />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}