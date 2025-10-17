export interface User {
  user_id: string;
  user_name: string;
  email: string;
  avatar_url?: string;
  isGuest: boolean;
  hasEmail: boolean;
  login_bonus_img_id?: string;
  isFemale?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  user_name: string;
  gender: 'male' | 'female';
}

export interface AuthResponse {
  code: number;
  data: {
    token: string;
    user: User;
    login_bonus_img_id?: string;
  };
  message?: string;
}

export interface GuestAccount {
  email: string;
  password: string;
}

export interface StorageKeys {
  TOKEN: string;
  USER_INFO: string;
  USER_SECURITY: string;
  CONFIRM18: string;
  LOGIN_BONUS_IMG_ID: string;
  NOTIFICATION_TOKEN: string;
}
