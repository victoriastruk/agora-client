import { useState } from 'react';
import { Globe, Eye, Lock, Users, Sparkles } from 'lucide-react';
import {
  Modal,
  Button,
  Input,
  Textarea,
  ImageUpload,
  RadioCardGroup,
  FormField,
} from '../../../shared/ui';

type CommunityType = 'public' | 'restricted' | 'private';

const VISIBILITY_OPTIONS: {
  value: CommunityType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    description: 'Anyone can view, post, and comment',
    icon: Globe,
    label: 'Public',
    value: 'public',
  },
  {
    description: 'Anyone can view, but only approved users can post',
    icon: Eye,
    label: 'Restricted',
    value: 'restricted',
  },
  {
    description: 'Only approved users can view and participate',
    icon: Lock,
    label: 'Private',
    value: 'private',
  },
];

export const CreateCommunityModal = ({
  trigger,
}: {
  trigger?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [bannerUrl, setBannerUrl] = useState<string>();
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [communityType, setCommunityType] = useState<CommunityType>('public');

  const handleClose = () => {
    setOpen(false);
    setAvatarUrl(undefined);
    setBannerUrl(undefined);
    setName('');
    setDisplayName('');
    setDescription('');
    setCommunityType('public');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Community "${name}" created! (UI only)`);
    handleClose();
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>{trigger}</Modal.Trigger>

      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>Create a community</Modal.Title>
          <Modal.Description>
            Build a space for your interests and connect with like-minded people
          </Modal.Description>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body className="space-y-8">
            {/* Appearance */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Customize appearance
              </h3>
              <ImageUpload
                value={bannerUrl}
                onChange={setBannerUrl}
                variant="banner"
                size="lg"
                placeholder="Add a banner image"
                className="w-full"
              />
              <div className="-mt-12 ml-4 relative z-10 inline-block rounded-full bg-background p-1 shadow-lg">
                <ImageUpload
                  value={avatarUrl}
                  onChange={setAvatarUrl}
                  variant="circle"
                  size="lg"
                  placeholder="Avatar"
                />
              </div>
            </section>

            {/* Community Name */}
            <FormField
              label="Community name"
              hint="Choose a unique name. This cannot be changed later."
              htmlFor="community-name"
            >
              <Input
                id="community-name"
                placeholder="community_name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormField>

            {/* Display Name */}
            <FormField
              label="Display name"
              hint="This is how your community will appear to users."
              htmlFor="display-name"
            >
              <Input
                id="display-name"
                placeholder="My Awesome Community"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </FormField>

            {/* Description */}
            <FormField
              label="Description"
              hint="Help people understand what your community is about."
              htmlFor="description"
            >
              <Textarea
                id="description"
                placeholder="Tell potential members what makes your community special..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
              />
            </FormField>

            {/* Community Type */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Community type
              </h3>
              <RadioCardGroup
                value={communityType}
                onChange={setCommunityType}
                options={VISIBILITY_OPTIONS}
                size="md"
              />
            </section>
          </Modal.Body>

          <Modal.Footer>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-35">
              Create Community
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
};
