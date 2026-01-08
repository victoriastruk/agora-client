// Mock GraphQL types
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  score: number;
  parentId: string | null;
  replies: Comment[];
}

export enum VoteType {
  Upvote = 'UPVOTE',
  Downvote = 'DOWNVOTE',
}
