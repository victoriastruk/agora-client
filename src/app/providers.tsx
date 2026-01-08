// import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '../shared/utils';
// import { useSession } from '@/entities/session';
// import { ThemeProvider } from '@/shared/theme';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  router: any; // typeof router
  children?: ReactNode;
}

export function AppProviders({ router, children }: Props) {
  //   const session = useSession();

  //   const context = useMemo(
  //     () => ({ queryClient, session }),
  //     [session.isAuthenticated, session.user?.id]
  //   );

  return (
    //  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} context={context} /> */}
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
    //  </ThemeProvider>
  );
}
