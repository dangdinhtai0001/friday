// Interface for the overall authentication state
export interface AuthState {
  isAuthenticated: boolean; // Login status (true/false)
  user?: User; // User information (optional if not authenticated)
  tokens?: Tokens; // Authentication tokens (optional if not authenticated)
  error?: AuthError; // Detailed error information (if any)
  isLoading: boolean; // Loading status (true if authentication is in progress)
}

// Interface for user information
export interface User {
  id: string; // Unique user ID in the system
  profile: UserProfile; // User profile information
  authDetails: AuthDetails; // Details about the login method
}

// Interface for user profile information
export interface UserProfile {
  name: string; // User's name
  avatarUrl?: string; // URL of the user's avatar (optional)
  roles: string[]; // List of user roles
}

// Interface for authentication details
export interface AuthDetails {
  method: string; // Login method (e.g., email, phone, google, facebook, etc.)
  identifier: string; // Identifier used for login (e.g., email, phone number, username, etc.)
  metadata?: AuthMetadata; // Additional metadata depending on the login method (optional)
}

// Interface for additional metadata related to login methods
export interface AuthMetadata {
  phoneNumber?: string; // Phone number (if logged in via phone)
  socialId?: string; // Social ID (if logged in via Google/Facebook)
  provider?: string; // Authentication provider (e.g., google, facebook, etc.)
}

// Interface for authentication tokens
export interface Tokens {
  accessToken: string; // Access token for API authentication
  refreshToken?: string; // Refresh token to obtain a new access token (optional)
  expiresAt: number; // Expiration timestamp of the access token
}

// Interface for detailed error information
export interface AuthError {
  code: string; // Error code (e.g., "INVALID_CREDENTIALS", "NETWORK_ERROR")
  message: string; // Human-readable error message
  details?: Record<string, unknown>; // Additional error details (optional)
}

// Define the actions that can be performed on the authentication state
interface AuthActions {
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  setTokens: (tokens: Tokens) => void;
  setError: (error: AuthError | undefined) => void;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | undefined) => void;
  resetAuth: () => void;
}

// Combine state and actions into a single type
type AuthStore = AuthState & AuthActions;