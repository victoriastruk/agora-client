export type CreateSubredditFormValues = {
  name: string;
  display_name: string;
  description: string;
  icon_url: string;
  banner_url: string;
  is_public: 'public' | 'private';
  is_nsfw: boolean;
};
