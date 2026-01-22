import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

import { registerSchema } from '../lib/schemas';

import { useRegisterMutation, useLoginMutation } from '@/entities/session';
import { logger } from '@/shared/services';

interface UseRegisterFormOptions {
  redirect?: string;
  onSuccess?: VoidFunction;
}

export const useRegisterForm = ({ redirect, onSuccess }: UseRegisterFormOptions = {}) => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const result = await registerMutation.mutateAsync({
          email: value.email,
          password: value.password,
          username: value.username,
        });

        if (result.message === 'Registration successful') {
          try {
            await loginMutation.mutateAsync({
              email: value.email,
              password: value.password,
            });

            onSuccess?.();
            const targetUrl = redirect ?? '/';
            navigate({ to: targetUrl });
          } catch (loginError) {
            logger.error('Auto-login failed:', loginError);

            logger.error('Auto-login after registration failed', loginError);
            onSuccess?.();
            const targetUrl = redirect ?? '/';
            navigate({ to: targetUrl });
          }
        } else if (result.error === 'Validation failed' && result.details) {
          result.details.forEach((detail: { field: string; message: string }) => {
            const fieldName = detail.field;

            if (fieldName) {
              const fieldMeta = (formApi as any).getFieldMeta(fieldName);
              if (fieldMeta) {
                (formApi as any).setFieldMeta(fieldName, (prev: any) => ({
                  ...prev,
                  errors: [detail.message],
                  isValidating: false,
                }));
              }
            }
          });
        } else {
          throw new Error(result.error || 'Registration failed');
        }
      } catch (error: unknown) {
        logger.error('Registration failed', error);
        throw error;
      }
    },
    validators: {
      onChange: registerSchema,
      onBlur: registerSchema,
      onSubmit: registerSchema,
    },
  });

  return {
    error: registerMutation.error,
    form,
    isPending: registerMutation.isPending,
  };
};
