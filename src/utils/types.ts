export interface CommonResponse<T = void> {
  statusCode: number;
  error?: string;
  message?: string;
  data?: T;
  token?: string;
  publicKey?: string;
}

export interface User {
  user_id?: number;
  email?: string;
  password?: string;
  name?: string;
  date_of_birth?: number;
  phone_number?: string;
  gender?: string;
  profile_picture_url?: string;
  bio?: string;
  is_verified?: boolean;
  is_active?: boolean;
  last_login?: number;
  created_at?: number;
  updated_at?: number;
}
