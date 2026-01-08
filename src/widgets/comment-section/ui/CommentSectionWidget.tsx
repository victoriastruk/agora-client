import { useState } from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { Avatar, AvatarFallback } from "../../../shared/ui/avatar";
import { CommentItem, CommentForm } from "../../../features/comment";
import { getInitials, formatCommentCount } from "../../../shared/services";
import { UI_TEXT } from "../../../shared/constants";

interface Comment {
  id: string;
  username: string;
  content: string;
  replies?: Comment[];
}

interface CommentSectionWidgetProps {
  postId?: string;
}

const mockUser = { username: "Jane Doe" };

const mockComments: Comment[] = [
  { id: "1", username: "Alice", content: "This is a great post!", replies: [] },
  { id: "2", username: "Bob", content: "I totally agree with this.", replies: [
    { id: "3", username: "Charlie", content: "Me too!" }
  ] },
];

export const CommentSectionWidget = ({ postId }: CommentSectionWidgetProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const handleCommentSubmit = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: (Math.random() * 10000).toFixed(0),
      username: mockUser.username,
      content,
    };

    if (parentId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : c
        )
      );
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(mockUser.username)}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">{mockUser.username}</div>
          </div>
          <CommentForm onSubmit={handleCommentSubmit} />
        </CardContent>
      </Card>


      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{formatCommentCount(comments.length)}</h2>
        {comments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{UI_TEXT.COMMENT.NO_COMMENTS}</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={(parentId, content) => handleCommentSubmit(content, parentId)}
            />
          ))
        )}
      </div>
    </div>
  );
};
