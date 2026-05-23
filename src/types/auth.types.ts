import { ILoginUser } from "./user.types";

export interface IAuthLoginPayload {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface IAuthLoginResponse {
  message: string;
  user: ILoginUser;
  tokens: ITokens;
}
