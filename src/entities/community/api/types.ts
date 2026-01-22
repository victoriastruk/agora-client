export interface SubredditResponse {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  icon_url?: string;
  member_count: number;
  post_count: number;
  is_public: boolean;
  is_nsfw: boolean;
  created_at: string;
}

export interface SubredditsApiResponse {
  subreddits: SubredditResponse[];
}

export interface CreateSubredditData {
  name: string;
  display_name: string;
  description?: string;
  icon_url?: string;
  banner_url?: string;
  is_public: 'public' | 'private';
  is_nsfw: boolean;
}

export type ActionResponse = { message: string };
