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
      console.log('Register form submitted with values:', JSON.stringify(value, null, 2));
      try {
        const result = await registerMutation.mutateAsync({
          email: value.email,
          password: value.password,
          username: value.username,
        });

        console.log('Registration result:', JSON.stringify(result, null, 2));

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
            console.error('Auto-login failed:', loginError);

            logger.error('Auto-login after registration failed', loginError);
            onSuccess?.();
            const targetUrl = redirect ?? '/';
            navigate({ to: targetUrl });
          }
        } else if (result.error === 'Validation failed' && result.details) {
          result.details.forEach((detail: any) => {
            const fieldName = detail.field;
            console.log(`Setting error for field ${fieldName}: ${detail.message}`);

            if (fieldName && formApi.getFieldMeta) {
              const fieldMeta = formApi.getFieldMeta(fieldName);
              if (fieldMeta) {
                formApi.setFieldMeta(fieldName, (prev: any) => ({
                  ...prev,
                  errors: [detail.message],
                  isValidating: false,
                }));
              } else {
                console.log(`Field ${fieldName} not found in form`);
              }
            }
          });
        } else {
          throw new Error(result.error || 'Registration failed');
        }
      } catch (error: any) {
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
