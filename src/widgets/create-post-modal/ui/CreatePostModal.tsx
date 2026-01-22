import { PenLine } from 'lucide-react';
import { useState } from 'react';

import {
  Modal,
  Button,
  Input,
  Textarea,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectEmpty,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { notificationActions } from '@/shared/stores';

interface Community {
  id: string;
  name: string;
}

interface CreatePostModalUIProps {
  trigger?: React.ReactNode;
  defaultCommunities?: Community[];
}

export const CreatePostModal = ({ trigger, defaultCommunities = [] }: CreatePostModalUIProps) => {
  const [open, setOpen] = useState(false);
  const [communityId, setCommunityId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClose = () => {
    setOpen(false);
    setCommunityId('');
    setTitle('');
    setContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notificationActions.success(
      `Post created!\nCommunity: ${communityId}\nTitle: ${title}\nContent: ${content}`,
    );
    handleClose();
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}

      <Modal.Content size='xl'>
        <Modal.Header>
          <Modal.Title className='flex items-center gap-2'>
            <PenLine className='h-5 w-5 text-primary' />
            Create a post
          </Modal.Title>
          <Modal.Description>
            Share your thoughts, questions, or discoveries with the community
          </Modal.Description>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body className='space-y-6'>
            {/* Select Community */}
            <FormField label='Community' hint='Choose where to share your post' htmlFor='community'>
              <Select value={communityId} onValueChange={setCommunityId}>
                <SelectTrigger id='community'>
                  <SelectValue placeholder='Select a community' />
                </SelectTrigger>
                <SelectContent>
                  {defaultCommunities.length ? (
                    defaultCommunities.map(community => (
                      <SelectItem key={community.id} value={community.id}>
                        r/{community.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectEmpty>No communities available</SelectEmpty>
                  )}
                </SelectContent>
              </Select>
            </FormField>

            {/* Title */}
            <FormField
              label='Title'
              hint='A clear, descriptive title helps your post get noticed'
              htmlFor='title'
            >
              <Input
                id='title'
                placeholder='An interesting title...'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormField>

            {/* Body */}
            <FormField label='Body' hint='Optional - add more details to your post' htmlFor='body'>
              <Textarea
                id='body'
                placeholder='Share your thoughts, add context, or ask questions...'
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={8}
              />
            </FormField>
          </Modal.Body>

          <Modal.Footer>
            <Button type='button' variant='ghost' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' className='min-w-25'>
              Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
};
