import { Users, FileTextIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Community } from '../model/types';

interface Props {
  community: Community;
}

export const CommunityStats = ({ community }: Props) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span>
          {community.members.toLocaleString()}{' '}
          {community.members === 1 ? 'member' : 'members'}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <FileTextIcon className="h-4 w-4" />
        <span>
          {community.postCount.toLocaleString()}{' '}
          {community.postCount === 1 ? 'post' : 'posts'}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>
          Created{' '}
          {community.createdAt
            ? format(new Date(community.createdAt), 'MMM d, yyyy')
            : 'Unknown'}
        </span>
      </div>
    </div>
  );
};
