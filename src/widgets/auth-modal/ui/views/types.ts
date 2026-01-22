import type { AuthView } from '@/shared/stores';

type OnAuthViewChange = (view: AuthView) => void;

interface AuthViewProps {
  onSuccess: VoidFunction;
  onViewChange: OnAuthViewChange;
}

export type { AuthView, AuthViewProps };
