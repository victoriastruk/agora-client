import { useCreateCommunityForm } from './use-create-community-form';
import { useCreateCommunityMutation } from './use-сreate-сommunity-mutation';

export const useCreateCommunity = () => {
  const form = useCreateCommunityForm();
  const mutation = useCreateCommunityMutation();

  const handleSubmit = async () => {
    await form.handleSubmit();

    const values = form.state.values; 

    mutation.mutate({
      name: values.name,
      display_name: values.display_name,
      description: values.description,
      icon_url: values.icon_url,
      is_private: !values.is_public,
      is_nsfw: values.is_nsfw,
    });
  };

  return {
    form,
    handleSubmit,
    isSubmitting: mutation.isPending,
  };
};
