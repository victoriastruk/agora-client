export interface SessionUser {
  id: string;
  username: string;
  email?: string;
}

export interface Session {
  user: SessionUser;
  isAuthenticated: true;
  isLoading?: boolean;
  error?: string | null;
}

export interface UnauthenticatedSession {
  user: null;
  isAuthenticated: false;
  isLoading?: boolean;
  error?: string | null;
}

export interface AuthenticatingSession {
  user: null;
  isAuthenticated: true;
  isLoading?: boolean;
  error?: string | null;
}

export type SessionState = Session | UnauthenticatedSession | AuthenticatingSession;
