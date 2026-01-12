import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { useComments } from '@/entities/comment';
import { usePost } from '@/entities/post';
import { Spinner } from '@/shared/ui';
import { CommentSectionWidget } from '@/widgets/comment-section';
import { PostDetailWidget } from '@/widgets/post-detail';
import { PostLoadingSkeletonWidget } from '@/widgets/post-loading-skeleton';
import { PostNotFoundWidget } from '@/widgets/post-not-found';

export const Route = createFileRoute('/_main/post/$postId')({
  component: PostDetailPage,
  loader: async ({ context, params }) => {
    const { queryClient } = context;
    const { postId } = params;

    // await Promise.all([
    //   prefetchQueries.post(queryClient, postId),
    //   prefetchQueries.comments(queryClient, postId),
    // ]);

    return { postId };
  },
  staleTime: 2 * 60 * 1000,
});

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
  const { comments, isLoading: commentsLoading } = useComments(postId);
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
      <CommentSectionWidget postId={postId} />
    </div>
  );
};
