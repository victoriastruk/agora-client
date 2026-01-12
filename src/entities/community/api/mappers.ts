import type { SubredditResponse } from './types';
import type { Community } from '../model/types';

export const mapCommunity = (data: SubredditResponse): Community => ({
  id: data.id,
  name: data.name,
  displayName: data.display_name || data.name,
  description: data.description,
  iconUrl: data.icon_url,
  bannerUrl: undefined,
  members: data.member_count,
  postCount: data.post_count,
  isJoined: false,
  isPublic: data.is_public ?? true,
  isNSFW: data.is_nsfw ?? false,
  createdAt: data.created_at,
});
