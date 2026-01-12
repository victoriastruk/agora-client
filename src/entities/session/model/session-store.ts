import { useStore } from '@tanstack/react-store';
import { Store } from '@tanstack/store';

import type { SessionState, SessionUser } from './types';

const STORAGE_KEY = 'session_user';

const loadUserFromStorage = (): SessionUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'id' in parsed &&
      'username' in parsed &&
      typeof (parsed as any).id === 'string' &&
      typeof (parsed as any).username === 'string'
    ) {
      return parsed as SessionUser;
    }

    return null;
  } catch {
    return null;
  }
};

const saveUserToStorage = (user: SessionUser | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
};

const initialUser = loadUserFromStorage();

const initialState: SessionState = {
  user: initialUser,
  isAuthenticated: false,
  isLoading: Boolean(initialUser),
  error: null,
};

export const sessionStore = new Store<SessionState>(initialState);

let prevUser: SessionUser | null = initialUser;

sessionStore.subscribe(() => {
  const { user, isAuthenticated } = sessionStore.state;

  if (isAuthenticated && user !== prevUser) {
    saveUserToStorage(user);
    prevUser = user;
  }

  if (!isAuthenticated && prevUser !== null) {
    saveUserToStorage(null);
    prevUser = null;
  }
});

export const sessionActions = {
  initialize(user: SessionUser | null) {
    sessionStore.setState({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
      error: null,
    });
  },

  login(user: SessionUser) {
    sessionStore.setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },

  logout() {
    sessionStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  setLoading(isLoading: boolean) {
    sessionStore.setState(prev => ({
      ...prev,
      isLoading,
    }));
  },

  setError(error: string | null) {
    sessionStore.setState(prev => ({
      ...prev,
      error,
      isLoading: false,
    }));
  },
} as const;

export const useSessionState = () => useStore(sessionStore);
export const useSessionUser = () => useStore(sessionStore).user;
export const useIsAuthenticated = () => useStore(sessionStore).isAuthenticated;
