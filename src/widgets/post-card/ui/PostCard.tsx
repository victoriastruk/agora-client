import { memo } from 'react';

import { PostCardContent } from '@/entities/post';
import type { Post } from '@/entities/post/model/types';
import { PostActions } from '@/features/post-actions';
import { PostMenu } from '@/features/post-menu';
import { VoteColumn } from '@/features/vote';

interface PostCardProps {
  post: Post;
  showCommunity?: boolean;
}

const PostCard = memo(({ post, showCommunity = true }: PostCardProps) => (
  <PostCardContent
    post={post}
    showCommunity={showCommunity}
    voteColumn={<VoteColumn postId={post.id} score={post.score} userVote={post.userVote ?? 0} />}
    postMenu={<PostMenu post={post} />}
    postActions={<PostActions post={post} />}
  />
));

PostCard.displayName = 'PostCard';

export { PostCard };
