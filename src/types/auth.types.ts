import { ILoginUser } from "./user.types";


// Registration Interface
export interface IRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "staff" | "pos_user" | "admin" ;
  shopId: string;
  branchId: string;
}

export interface IRegisterUser {
  id: string;
  shopId: string;
  branchId: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  isVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface IRegisterResponse {
  message: string;
  user: IRegisterUser;
  emailDispatched: boolean;
}



// Login Interface
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
