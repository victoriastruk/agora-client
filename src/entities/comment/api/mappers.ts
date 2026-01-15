import type { Comment } from '@/entities/comment/model/types';

export interface ApiComment {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  score: number;
  parentId?: string | null;
  author: {
    id: string;
    name: string;
  };
  replies?: ApiComment[];
}

export const mapComment = (comment: ApiComment): Comment => ({
  id: comment.id,
  postId: comment.postId,
  parentId: comment.parentId ?? undefined,
  content: comment.content,
  createdAt: comment.createdAt,
  votes: comment.score,
  author: comment.author,
  replies: (comment.replies ?? []).map(mapComment),
});
