import { memo } from 'react';

import { PostCardContent } from './PostCardContent';

import type { Post } from '../model/types';

import { PostActions } from '@/features/post-actions';
import { PostMenu } from '@/features/post-menu';
import { VoteColumn } from '@/features/vote';

interface PostCardProps {
  post: Post;
  showCommunity?: boolean;
}

export const PostCard = memo(({ post, showCommunity = true }: PostCardProps) => (
  <PostCardContent
    post={post}
    showCommunity={showCommunity}
    voteColumn={<VoteColumn postId={post.id} score={post.score} userVote={post.userVote ?? 0} />}
    postMenu={<PostMenu post={post} />}
    postActions={<PostActions post={post} />}
  />
));

PostCard.displayName = 'PostCard';
