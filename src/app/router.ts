import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { queryClient } from '@/shared/utils';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
   //  session: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

