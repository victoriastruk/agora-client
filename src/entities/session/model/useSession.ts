import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { sessionQueries } from '../api/queries';

import { sessionActions, useSessionState } from './session-store';

import type { SessionUser } from './types';

const mapToSessionUser = (data: {
  id: string | number;
  username: string;
  email?: string;
}): SessionUser => ({
  id: String(data.id),
  username: data.username,
  email: data.email ?? undefined,
});

export const useSession = () => {
  const session = useSessionState();
  const initializedRef = useRef(false);

  const query = useQuery({
    ...sessionQueries.currentUser(),
    enabled: session.isLoading || !initializedRef.current,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (session.isLoading && initializedRef.current) {
      initializedRef.current = false;
    }
  }, [session.isLoading]);

  useEffect(() => {
    if (query.isSuccess && query.data) {
      sessionActions.initialize(mapToSessionUser(query.data));
      initializedRef.current = true;
    }

    if (query.isError) {
      sessionActions.logout();
      initializedRef.current = true;
    }
  }, [query.isSuccess, query.isError, query.data]);

  return {
    ...session,
    isInitializing: session.isLoading && query.isLoading,
  };
};
