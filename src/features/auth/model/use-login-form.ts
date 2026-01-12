import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

import { loginSchema } from '../lib/schemas';

import { useLoginMutation } from '@/entities/session';
import { logger } from '@/shared/services';

interface UseLoginFormOptions {
  redirect?: string;
  onSuccess?: VoidFunction;
}

export const useLoginForm = ({ redirect, onSuccess }: UseLoginFormOptions = {}) => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      password: '',
      email: '',
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const loginData = {
          email: value.email,
          password: value.password,
        };

        const result = await loginMutation.mutateAsync(loginData);

        // Check if login was successful
        if (result.message === 'Login successful') {
          onSuccess?.();
          const targetUrl = redirect ?? '/';
          navigate({ to: targetUrl });
        } else if (result.error === 'Validation failed' && result.details) {
          // Handle validation errors - set them on form fields
          result.details.forEach((detail: any) => {
            let fieldName = detail.field;

            if (fieldName === 'email') {
              fieldName = 'email';
            }

            if (fieldName && formApi.getFieldMeta) {
              const fieldMeta = formApi.getFieldMeta(fieldName);
              if (fieldMeta) {
                formApi.setFieldMeta(fieldName, (prev: any) => ({
                  ...prev,
                  errors: [detail.message],
                  isValidating: false,
                }));
              }
            }
          });
        } else {
          // Other errors
          throw new Error(result.error || 'Login failed');
        }
      } catch (error: any) {
        logger.error('Login failed', error);
        throw error;
      }
    },
    validators: {
      onChange: loginSchema,
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
  });

  return {
    error: loginMutation.error,
    form,
    isPending: loginMutation.isPending,
  };
};
