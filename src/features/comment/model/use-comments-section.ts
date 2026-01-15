import { useState } from 'react';
import type { Comment } from '@/entities/comment/model/types';
import { mockComments } from '@/shared/api/mocks/comments.mock';

const mockUser = { id: 'user-1', name: 'Jane Doe' };

export const useCommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const addComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      postId: 'mock-post',
      content,
      createdAt: new Date().toISOString(),
      votes: 0,
      author: mockUser,
      replies: [],
      parentId,
    };

    if (parentId) {
      setComments(prev =>
        prev.map(c =>
          c.id === parentId
            ? { ...c, replies: [...c.replies, newComment] }
            : c,
        ),
      );
    } else {
      setComments(prev => [newComment, ...prev]);
    }
  };

  return {
    comments,
    addComment,
    user: mockUser,
  };
};
