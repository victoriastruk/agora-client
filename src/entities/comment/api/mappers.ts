import type { Comment } from '@/entities/comment/model/types';
import type { Comment as GraphQLComment } from '@/shared/api/gql';

export const mapComment = (comment: GraphQLComment): Comment => ({
  author: {
    id: comment.author.id,
    name: comment.author.name,
  },
  content: comment.content,
  createdAt: comment.createdAt,
  id: comment.id,
  parentId: comment.parentId ?? undefined,
  postId: comment.postId,
  replies: comment.replies.map(mapComment),
  votes: comment.score,
});
