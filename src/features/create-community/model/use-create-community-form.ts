import { useForm } from '@tanstack/react-form';
import type { CreateSubredditFormValues } from './types';

export const useCreateCommunityForm = () => {
  return useForm({
    defaultValues: {
      name: '',
      display_name: '',
      description: '',
      icon_url: '',
      banner_url: '',
      is_public: 'public' as 'public' | 'private',
      is_nsfw: false,
    } satisfies CreateSubredditFormValues,

    onSubmit: async ({ value }) => {
      return value;
    },
  });
};
