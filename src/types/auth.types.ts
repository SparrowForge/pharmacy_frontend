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



// Verify Email Interface
export interface IVerifyEmailPayload {
  token: string;
}

export interface IVerifyEmailResponse {
  message: string;
  success?: boolean;
}


// Resend Verify Email
export interface IResendVerificationEmailPayload {
  email: string;
}

export interface IResendVerificationEmailResponse {
  message: string;
}


// Forgot Password
export interface IForgotPasswordPayload {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
}

// Verify Email with code for forgot password
export interface IVerifyResetCodePayload {
  email: string;
  code: string;
}

export interface IVerifyResetCodeResponse {
  message: string;
}

// Change Password
export interface IResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  message: string;
}


// Get Current User
export interface ICurrentUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  shopId?: string;
  branchId?: string;
}