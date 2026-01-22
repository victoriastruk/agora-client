import { useErrorBoundary } from 'react-error-boundary';

import { logger } from '@/shared/services';

export const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  return (error: unknown) => {
    const normalizedError = error instanceof Error ? error : new Error('Unexpected error');

    logger.error('Error caught by error handler:', normalizedError, {
      original: error,
    });

    showBoundary(normalizedError);
  };
};
