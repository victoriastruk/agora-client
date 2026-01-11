import * as Sentry from '@sentry/react';
import { Button } from '@/shared/ui/button';

export function AppErrorFallback({
  error,
  resetError,
}: {
  error: unknown;
  resetError: () => void;
}) {
  const normalizedError =
    error instanceof Error ? error : new Error('Unknown error');
  Sentry.captureException(normalizedError);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <div className="max-w-md space-y-2">
        <p className="text-lg font-semibold text-foreground">We hit a snag</p>
        <p className="text-sm text-muted-foreground">
          Something broke while loading the app. You can retry or head back to a
          safe page.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={resetError} className="w-full sm:w-auto">
          Try again
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.assign('/')}
        >
          Go home
        </Button>
      </div>
    </div>
  );
}
