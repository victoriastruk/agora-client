import { useMemo } from "react";
import type { Post } from "./types";

const mockPosts: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: `mock-post-${i + 1}`,
  title: `Mock Post Title ${i + 1}`,
  content: `This is mock content for post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  community: {
    id: `mock-community-${i % 5 + 1}`,
    name: `community${i % 5 + 1}`,
    iconUrl: null,
  },
  author: {
    id: `mock-user-${i % 10 + 1}`,
    name: `user${i % 10 + 1}`,
  },
  score: Math.floor(Math.random() * 1000),
  commentCount: Math.floor(Math.random() * 50),
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  userVote: Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0,
  media: null,
  flairs: [],
}));

export const usePosts = (limit = 20, offset = 0) => {
  const posts = useMemo(() => mockPosts.slice(offset, offset + limit), [limit, offset]);

  return {
    posts,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const usePost = (postId: string) => {
  const post = useMemo(() => mockPosts.find(p => p.id === postId), [postId]);

  return {
    post: post || null,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useSavedPosts = (limit = 20, offset = 0, isAuthenticated = false) => {
  const posts = useMemo(() => {
    if (!isAuthenticated) return [];
    return mockPosts.slice(offset, offset + limit);
  }, [limit, offset, isAuthenticated]);

  return {
    posts,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useUserPosts = (userId: string, limit = 20, offset = 0) => {
  const posts = useMemo(() => {
    if (!userId) return [];
    return mockPosts.filter(p => p.author.id === userId).slice(offset, offset + limit);
  }, [userId, limit, offset]);

  return {
    posts,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const mapPost = (data: any): Post => ({
  id: data.id,
  title: data.title,
  content: data.content,
  community: data.community,
  author: data.author,
  score: data.score,
  commentCount: data.commentCount,
  createdAt: data.createdAt,
  userVote: data.userVote,
  media: data.media,
  flairs: data.flairs,
});
