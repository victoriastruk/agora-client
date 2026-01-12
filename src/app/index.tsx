import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppErrorFallback } from './error';
import { AppProviders } from './providers';
import { router } from './router';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Sentry.ErrorBoundary fallback={props => <AppErrorFallback {...props} />}>
        <AppProviders router={router} />
      </Sentry.ErrorBoundary>
    </React.StrictMode>,
  );
}
