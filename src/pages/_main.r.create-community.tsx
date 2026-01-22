import { createFileRoute } from '@tanstack/react-router';
import { CreateCommunityForm } from '@/widgets/create-community-form';

const CreateCommunityPage = () => {
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Create a Community</h1>
      <p className='text-muted-foreground'>
        Build a space for your interests and connect with like-minded people
      </p>
      <CreateCommunityForm />
    </div>
  );
};

export const Route = createFileRoute('/_main/r/create-community')({
  component: CreateCommunityPage,
});
