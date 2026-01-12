import { Outlet, createFileRoute } from '@tanstack/react-router';

import { Spinner } from '@/shared/ui';
import { AppShell } from '@/widgets/app-shell';
import { AuthModal } from '@/widgets/auth-modal';

const MainLayout = () => (
  <>
    <AppShell showHeroCarousel>
      <Outlet />
    </AppShell>
    <AuthModal />
  </>
);

export const Route = createFileRoute('/_main')({
  component: MainLayout,
  pendingComponent: () => <Spinner />,
});
