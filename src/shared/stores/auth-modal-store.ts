import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";

export type AuthView = "login" | "register" | "reset" | "phone";

interface AuthModalState {
  isOpen: boolean;
  view: AuthView;
  phoneMode?: "login" | "register";
}

const initialState: AuthModalState = {
  isOpen: false,
  view: "login",
  phoneMode: undefined,
};

export const authModalStore = new Store<AuthModalState>(initialState);

export const authModalActions = {
  open: (view: AuthView = "login") => {
    authModalStore.setState((prev) => ({
      ...prev,
      isOpen: true,
      view,
    }));
  },

  openPhone: (mode: "login" | "register") => {
    authModalStore.setState((prev) => ({
      ...prev,
      isOpen: true,
      view: "phone",
      phoneMode: mode,
    }));
  },

  close: () => {
    authModalStore.setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  },

  setView: (view: AuthView) => {
    authModalStore.setState((prev) => {
      if (prev.view === view) {
        return prev;
      }

      return {
        ...prev,
        view,
        phoneMode: view === "phone" ? prev.phoneMode : undefined,
      };
    });
  },

  reset: () => {
    authModalStore.setState(() => initialState);
  },
} as const;

export const useAuthModalState = () => useStore(authModalStore);

export const useAuthModalOpen = () => {
  return useStore(authModalStore, (state) => state.isOpen);
};

export const useAuthModalView = () => {
  return useStore(authModalStore, (state) => state.view);
};

export const useAuthModalPhoneMode = () => {
  return useStore(authModalStore, (state) => state.phoneMode);
};
