import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, type AnyRouter } from '@tanstack/react-router';
import { useMemo } from 'react';
import { Toaster } from 'sonner';

import type { ReactNode } from 'react';

import { useSession } from '@/entities/session';
import { queryClient } from '@/shared/utils';

import './global.css';

interface Props {
  router: AnyRouter;
  children?: ReactNode;
}

const AppRouter = ({ router, children }: { router: AnyRouter; children?: ReactNode }) => {
  const session = useSession();

  const context = useMemo(() => ({ queryClient, session }), [session]);

  return (
    <>
      <RouterProvider router={router} context={context} />
      <Toaster position='top-right' richColors />
      {children}
      <ReactQueryDevtools />
    </>
  );
};

export const AppProviders = ({ router, children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter router={router} children={children} />
    </QueryClientProvider>
  );
};
