import { CommentItem, CommentForm } from '@/features/comment';
import { useCommentSection } from '@/features/comment/model/use-comments-section';
import { UI_TEXT } from '@/shared/constants';
import { getInitials, formatCommentCount } from '@/shared/services';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Card, CardContent } from '@/shared/ui/card';

export const CommentSectionWidget = () => {
  const { comments, addComment, user } = useCommentSection();

  return (
    <div className='space-y-4'>
      <Card>
        <CardContent className='p-4'>
          <div className='flex gap-3 mb-4'>
            <Avatar className='h-8 w-8'>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className='text-sm font-medium'>{user.name}</div>
          </div>
          <CommentForm onSubmit={addComment} />
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>{formatCommentCount(comments.length)}</h2>

        {comments.length === 0 ? (
          <Card>
            <CardContent className='p-6 text-center'>
              <p className='text-muted-foreground'>{UI_TEXT.COMMENT.NO_COMMENTS}</p>
            </CardContent>
          </Card>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} onReply={addComment} />
          ))
        )}
      </div>
    </div>
  );
};
