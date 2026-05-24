import { IAuthLoginPayload, IAuthLoginResponse, IRegisterPayload, IRegisterResponse, IVerifyEmailPayload, IVerifyEmailResponse } from "../types/auth.types";
import axiosInstance from "./axios";


const loginUserService = async (
  data: IAuthLoginPayload
): Promise<IAuthLoginResponse> => {
  const response = await axiosInstance.post<IAuthLoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

const registerUserService = async (
  data: IRegisterPayload
): Promise<IRegisterResponse> => {
  const res = await axiosInstance.post<IRegisterResponse>(
    "/auth/register",
    data
  );

  return res.data;
};

const verifyEmailService = async (
  data: IVerifyEmailPayload
): Promise<IVerifyEmailResponse> => {
  const res = await axiosInstance.post<IVerifyEmailResponse>(
    "/auth/verify-email",
    data
  );

  return res.data;
};

export const authService = {
  loginUserService,
  registerUserService,
  verifyEmailService,
};