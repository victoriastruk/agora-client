import type { Comment } from '@/entities/comment/model/types';

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: 'post-1',
    content: 'First comment',
    votes: 10,
    createdAt: '2024-01-01T10:00:00Z',
    author: {
      id: 'user-1',
      name: 'John',
    },
    replies: [
      {
        id: '2',
        postId: 'post-1',
        parentId: '1',
        content: 'Reply to first comment',
        votes: 3,
        createdAt: '2024-01-01T11:00:00Z',
        author: {
          id: 'user-2',
          name: 'Alice',
        },
        replies: [],
      },
    ],
  },
  {
    id: '3',
    postId: 'post-2',
    content: 'Another comment',
    votes: 5,
    createdAt: '2024-01-02T09:00:00Z',
    author: {
      id: 'user-1',
      name: 'John',
    },
    replies: [],
  },
];
