import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '@/shared/utils';
import { useSession } from '@/entities/session';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './global.css';

interface Props {
  router: any;
  children?: ReactNode;
}

function AppRouter({
  router,
  children,
}: {
  router: any;
  children?: ReactNode;
}) {
  const session = useSession();

  const context = useMemo(
    () => ({ queryClient, session }),
    [session.isAuthenticated, session.user?.id]
  );

  return (
    <>
      <RouterProvider router={router} context={context} />
      <Toaster position="top-right" richColors />
      {children}
      <ReactQueryDevtools />
    </>
  );
}

export function AppProviders({ router, children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter router={router} children={children} />
    </QueryClientProvider>
  );
}
