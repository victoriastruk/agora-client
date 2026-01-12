import type { TopStory } from '../lib/constants';

const DEFAULT_THUMBNAIL =
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&crop=center';

const sanitizeUrl = (url?: string | null): string | undefined => {
  if (!url) {
    return;
  }
  try {
    const parsed = new URL(url, 'http://localhost');
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? url : undefined;
  } catch {
    return;
  }
};

const mapPostToTopStory = (post: {
  id: string;
  title: string;
  community?: { id: string; name: string; iconUrl?: string | null } | null;
  media?: Array<{ thumbnailUrl?: string | null; url: string }> | null;
  score: number;
  commentCount: number;
}): TopStory => {
  const mediaThumbnail =
    sanitizeUrl(post.media?.[0]?.thumbnailUrl) ??
    sanitizeUrl(post.media?.[0]?.url) ??
    DEFAULT_THUMBNAIL;

  return {
    community: {
      id: post.community?.id ?? '',
      name: post.community?.name ?? 'unknown',
      iconUrl: sanitizeUrl(post.community?.iconUrl),
    },
    id: post.id,
    score: post.score,
    thumbnail: mediaThumbnail,
    title: post.title,
    commentCount: post.commentCount,
  };
};

const useMockTopStoriesQuery = (limit: number) => {
  const mockData = Array.from({ length: limit }, (_, i) => ({
    id: `mock-post-${i + 1}`,
    title: `Mock Top Story #${i + 1}`,
    community: { id: `mock-community-${i + 1}`, name: `Mock Community ${i + 1}` },
    media: [{ url: DEFAULT_THUMBNAIL }],
    score: Math.floor(Math.random() * 1000),
    commentCount: Math.floor(Math.random() * 200),
  }));

  return {
    data: mockData,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
};

export const useTopStories = (limit = 6) => {
  const { data = [], isLoading, error, refetch } = useMockTopStoriesQuery(limit);

  // Handle case when data might not be an array (temporary fix)
  const safeData = Array.isArray(data) ? data : [];
  const stories: TopStory[] = safeData.map(mapPostToTopStory);

  return {
    error,
    isLoading,
    refetch,
    stories,
  };
};
