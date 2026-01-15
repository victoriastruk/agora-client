import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import type { Comment } from '@/entities/comment';
import { UI_TEXT, MAX_COMMENT_DEPTH } from '@/shared/constants';
import { formatReplyCount, getInitials } from '@/shared/services';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';

interface CommentItemProps {
  comment: Comment;
  onReply?: (parentId: string, content: string) => void;
  depth?: number;
}

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => void;
  parentId?: string;
}

export const CommentForm = ({ onSubmit, parentId }: CommentFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value, parentId);
    setValue('');
  };

  return (
    <Card className='mb-4'>
      <CardContent className='p-4'>
        <Textarea placeholder='Write a comment...' rows={4} className='resize-none w-full' />
        <div className='flex gap-2 mt-2'>
          <Button size='sm' onClick={handleSubmit}>
            Submit
          </Button>
          <Button size='sm' variant='outline'>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const CommentItem = ({ comment, onReply, depth = 0 }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className={depth > 0 ? 'ml-8 border-l-2 border-border pl-4' : ''}>
      <Card className='mb-4'>
        <CardContent className='p-4'>
          <div className='flex gap-4'>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 mb-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarFallback className='text-xs'>
                    {getInitials(comment.author.name)}
                  </AvatarFallback>
                </Avatar>
                <span className='text-xs font-medium'>{comment.author.name}</span>
                <span className='text-xs text-muted-foreground'>{comment.createdAt}</span>
              </div>
              <p className='text-sm mb-3 whitespace-pre-wrap'>{comment.content}</p>
              {depth < MAX_COMMENT_DEPTH && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsReplying(!isReplying)}
                  className='h-7 text-xs'
                >
                  <MessageSquare className='h-3 w-3 mr-1' />
                  {UI_TEXT.COMMENT.REPLY}
                </Button>
              )}
              {isReplying && onReply && (
                <CommentForm
                  parentId={comment.id}
                  onSubmit={content => {
                    onReply(comment.id, content);
                    setIsReplying(false);
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {comment.replies.length > 0 && (
        <div className='mt-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowReplies(!showReplies)}
            className='h-7 text-xs mb-2'
          >
            {showReplies ? UI_TEXT.COMMENT.HIDE_REPLIES : UI_TEXT.COMMENT.SHOW_REPLIES}{' '}
            {formatReplyCount(comment.replies.length)}
          </Button>
          {showReplies && (
            <div>
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
