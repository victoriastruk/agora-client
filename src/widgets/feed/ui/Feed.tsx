import { useState, useCallback } from 'react';

import { SortBar } from '@/features/sort-bar';
import { PostCard } from '@/widgets/post-card';

export type SortOption = 'best' | 'hot' | 'new' | 'rising' | 'top';
export type RegionOption = 'global' | 'my-country';

const mockPosts = Array.from({ length: 5 }).map((_, i) => ({
  id: `post-${i + 1}`,
  title: `Sample Post Title ${i + 1}`,
  content: `This is a sample post content for post number ${i + 1}. It shows how a post will look in the feed.`,
  community: {
    id: `community-${i + 1}`,
    name: `community${i + 1}`,
    displayName: `Community ${i + 1}`,
    postCount: 225,
    members: 1234,
    isJoined: false,
    isPublic: true,
    isNSFW: false,
    createdAt: new Date().toISOString(),
  },
  author: { id: `user-${i + 1}`, name: `user${i + 1}` },
  createdAt: new Date().toISOString(),
  score: 2,
  commentsCount: Math.floor(Math.random() * 20),
  upvotes: Math.floor(Math.random() * 100),
}));

export const Feed = () => {
  const [sort, setSort] = useState<SortOption>('best');
  const [region, setRegion] = useState<RegionOption>('global');

  const handleFilterClick = useCallback(() => {}, []);
  const handleSortChange = useCallback((newSort: SortOption) => setSort(newSort), []);
  const handleRegionChange = useCallback((newRegion: RegionOption) => setRegion(newRegion), []);

  const isLoading = false;
  const error = false;
  const posts = mockPosts;
  const communityId = undefined;
  const isFetchingNextPage = false;
  const hasMore = true;

  if (error) {
    return <div className='text-center py-10 text-red-500'>Failed to load feed. Try again.</div>;
  }

  if (isLoading && posts.length === 0) {
    return <div className='text-center py-10'>Loading feed...</div>;
  }

  return (
    <div className='space-y-4'>
      <SortBar
        sort={sort}
        region={region}
        onSortChange={handleSortChange}
        onRegionChange={handleRegionChange}
        onFilterClick={handleFilterClick}
      />

      {posts.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>No posts available</div>
      ) : (
        <div className='space-y-4'>
          {posts.map(post => (
            <PostCard key={post.id} post={post} showCommunity={!communityId} />
          ))}

          <div aria-hidden='true' className='h-6' />

          {isFetchingNextPage && <div className='text-center py-4'>Loading more...</div>}

          {!hasMore && posts.length > 0 && (
            <div className='text-center py-4 text-gray-400'>End of feed</div>
          )}
        </div>
      )}
    </div>
  );
};
