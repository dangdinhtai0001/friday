import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Tokens, AuthError, AuthStore } from "./auth";

// Define the store creator with explicit types
const createAuthStore: StateCreator<AuthStore> = (set): AuthStore => ({
  // Initial authentication state
  isAuthenticated: false,
  user: undefined,
  tokens: undefined,
  error: undefined,
  isLoading: false,

  // Actions to update the authentication state
  login: (user: User, tokens: Tokens) =>
    set({
      isAuthenticated: true,
      user,
      tokens,
      error: undefined,
      isLoading: false,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      user: undefined,
      tokens: undefined,
      error: undefined,
      isLoading: false,
    }),
  setTokens: (tokens: Tokens) => set({ tokens }),
  setError: (error: AuthError | undefined) => set({ error, isLoading: false }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setUser: (user: User | undefined) => set({ user }),
  resetAuth: () =>
    set({
      isAuthenticated: false,
      user: undefined,
      tokens: undefined,
      error: undefined,
      isLoading: false,
    }),
});

// Create the Zustand store for managing authentication state
export const useAuthStore = create<AuthStore>()(
  persist<AuthStore>(
    createAuthStore, // Correctly typed store creator
    {
      name: "auth-storage", // Key name used in Local Storage
      storage: createJSONStorage<AuthStore>(() => localStorage), // Use Local Storage API for persistence
    },
  ),
);