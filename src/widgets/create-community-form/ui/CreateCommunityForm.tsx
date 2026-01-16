import { Globe, Lock, Users, Sparkles } from 'lucide-react';
import { useCreateCommunity } from '@/features/create-community';
import { Button, Input, Textarea, ImageUpload, RadioCardGroup, FormField } from '@/shared/ui';

const VISIBILITY_OPTIONS = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone can view, post, and comment',
    icon: Globe as React.FC<React.SVGProps<SVGSVGElement>>,
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Only approved users can view and participate',
    icon: Lock as React.FC<React.SVGProps<SVGSVGElement>>,
  },
];

export const CreateCommunityForm = () => {
  const { form, handleSubmit } = useCreateCommunity();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      className='space-y-8'
    >
      {/* Appearance */}
      <section className='space-y-4'>
        <h3 className='text-sm font-medium flex items-center gap-2'>
          <Sparkles className='h-4 w-4 text-amber-500' />
          Customize appearance
        </h3>

        <form.Field name='banner_url'>
          {field => (
            <ImageUpload
              value={field.state.value || ''}
              onChange={value => field.handleChange(value || '')}
              variant='banner'
              size='lg'
              placeholder='Add a banner image'
              className='w-full'
            />
          )}
        </form.Field>

        <div className='-mt-12 ml-4 relative z-10 inline-block rounded-full bg-background p-1 shadow-lg'>
          <form.Field name='icon_url'>
            {field => (
              <ImageUpload value={field.state.value} onChange={file => field.handleChange(file)} />
            )}
          </form.Field>
        </div>
      </section>

      {/* Community Name */}
      <form.Field name='name'>
        {field => (
          <FormField
            label='Community name'
            hint='Choose a unique name. This cannot be changed later.'
            htmlFor='community-name'
            error={field.state.meta.errors?.[0]?.message}
          >
            <Input
              id='community-name'
              placeholder='community_name'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </FormField>
        )}
      </form.Field>

      {/* Display Name */}
      <form.Field name='displayName'>
        {field => (
          <FormField
            label='Display name'
            hint='This is how your community will appear to users.'
            htmlFor='display-name'
            error={field.state.meta.errors?.[0]?.message}
          >
            <Input
              id='display-name'
              placeholder='My Awesome Community'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </FormField>
        )}
      </form.Field>

      {/* Description */}
      <form.Field name='description'>
        {field => (
          <FormField
            label='Description'
            hint='Help people understand what your community is about.'
            htmlFor='description'
            error={field.state.meta.errors?.[0]?.message}
          >
            <Textarea
              id='description'
              placeholder='Tell potential members what makes your community special...'
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              rows={4}
            />
          </FormField>
        )}
      </form.Field>

      {/* Community Type */}
      <form.Field name='is_public'>
        {field => (
          <section className='space-y-3'>
            <h3 className='text-sm font-medium flex items-center gap-2'>
              <Users className='h-4 w-4 text-primary' />
              Community type
            </h3>
            <RadioCardGroup
              value={field.state.value}
              onChange={field.handleChange}
              options={VISIBILITY_OPTIONS}
              size='md'
            />
          </section>
        )}
      </form.Field>

      {/* Submit */}
      <form.Subscribe
        selector={state => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type='submit'
            variant='reddit'
            disabled={!canSubmit || isSubmitting}
            className='w-full'
          >
            {isSubmitting ? 'Creating...' : 'Create Community'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
