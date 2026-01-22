import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { usePost } from '@/entities/post';
import { Spinner } from '@/shared/ui';
import { prefetchQueries } from '@/shared/utils';
import { CommentSectionWidget } from '@/widgets/comment-section';
import { PostDetailWidget } from '@/widgets/post-detail';
import { PostLoadingSkeletonWidget } from '@/widgets/post-loading-skeleton';
import { PostNotFoundWidget } from '@/widgets/post-not-found';

// eslint-disable-next-line react-refresh/only-export-components
export const useComments = (postId: string) => {
  const comments = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: `comment-${i + 1}`,
        postId,
        content: `This is comment ${i + 1} for post ${postId}`,
        author: { id: `user-${i + 1}`, name: `User ${i + 1}` },
        score: Math.floor(Math.random() * 50),
      })),
    [postId],
  );

  return {
    comments,
    isLoading: false,
  };
};

const PostDetailPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <PostDetailPageContent />
    </Suspense>
  );
};

const PostDetailPageContent = () => {
  const { postId } = Route.useParams();
  const { post, isLoading: postLoading } = usePost(postId);
  const { isLoading: commentsLoading } = useComments(postId);
  const isLoading = postLoading || commentsLoading;

  if (isLoading) {
    return <PostLoadingSkeletonWidget />;
  }

  if (!post) {
    return <PostNotFoundWidget />;
  }

  return (
    <div className='container mx-auto max-w-4xl p-4 space-y-6'>
      <PostDetailWidget post={post} />
      <CommentSectionWidget />
    </div>
  );
};

export const Route = createFileRoute('/_main/post/$postId')({
  component: PostDetailPage,
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    const { postId } = params;

    await Promise.all([
      prefetchQueries.post(queryClient, postId),
      prefetchQueries.comments(queryClient, postId),
    ]);

    return { postId };
  },
  staleTime: 2 * 60 * 1000,
});
