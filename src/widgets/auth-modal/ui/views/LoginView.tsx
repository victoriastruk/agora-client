import * as DialogPrimitive from '@radix-ui/react-dialog';

import { PolicyLinks } from './PolicyLinks';

import type { AuthViewProps } from './types';

import Divider from '@/features/auth/ui/Divider';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import OAuthButtons from '@/features/auth/ui/OAuthButtons';

export const LoginView = ({ onSuccess, onViewChange }: AuthViewProps) => (
  <div className='text-center space-y-4'>
    <DialogPrimitive.Title className='text-2xl font-bold text-center text-neutral-content-strong mt-0 mb-xs'>
      Log In
    </DialogPrimitive.Title>

    <DialogPrimitive.Description className='text-sm text-center my-xs text-gray-600 dark:text-gray-400'>
      <PolicyLinks />
    </DialogPrimitive.Description>

    <OAuthButtons showEmailLink mode='login' />
    <Divider text='OR' />
    <LoginForm setView={onViewChange} onSuccess={onSuccess} />
  </div>
);
