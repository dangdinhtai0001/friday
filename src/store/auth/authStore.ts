import { create } from 'zustand';
import { AuthState, User, Tokens, AuthError } from './auth.d'; // Đảm bảo đường dẫn này đúng

interface AuthActions {
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  setTokens: (tokens: Tokens) => void;
  setError: (error: AuthError | undefined) => void;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | undefined) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  user: undefined,
  tokens: undefined,
  error: undefined,
  isLoading: false,

  login: (user, tokens) => set({ isAuthenticated: true, user, tokens, error: undefined, isLoading: false }),
  logout: () => set({ isAuthenticated: false, user: undefined, tokens: undefined, error: undefined, isLoading: false }),
  setTokens: (tokens) => set({ tokens }),
  setError: (error) => set({ error, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setUser: (user) => set({ user }),
  resetAuth: () => set({
    isAuthenticated: false,
    user: undefined,
    tokens: undefined,
    error: undefined,
    isLoading: false,
  }),
}));