export interface SigninRequest {
  username: string;
  password: string;
}

export interface SigninResponse {
  access_token: string;
  token_type: string;
}
