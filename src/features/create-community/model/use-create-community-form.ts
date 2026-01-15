import { useForm } from '@tanstack/react-form';
import type { CreateSubredditFormValues } from './types';

export const useCreateCommunityForm = () => {
  return useForm<CreateSubredditFormValues>({
    defaultValues: {
      name: '',
      display_name: '',
      description: '',
      icon_url: undefined,
      is_public: true,
      is_nsfw: false,
    },
    onSubmit: async ({ value }) => {
      return value;
    },
  });
};
