export type CreateSubredditFormValues = {
  name: string;
  display_name: string;
  description: string;
  icon_url: File | null;
  is_public: boolean;
  is_nsfw: boolean;
};
