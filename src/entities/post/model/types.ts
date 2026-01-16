import type { Community } from '@/entities/community';
import type { FlairVariant } from '@/shared/types/flair';

export type { Community };

export interface PostFlair {
  id: string;
  variant: FlairVariant;
}

export interface Post {
  id: string;
  community: Community;
  author: {
    id: string;
    name: string;
  };
  title: string;
  content?: string;
  media?: {
    type: 'image' | 'video' | 'link';
    url: string;
    thumb?: string;
  };
  flairs?: PostFlair[];
  score: number;
  commentsCount: number;
  createdAt: string;
  userVote?: -1 | 0 | 1;
  isSaved?: boolean;
}