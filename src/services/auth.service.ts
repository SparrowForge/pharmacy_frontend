import { IAuthLoginPayload, IAuthLoginResponse } from "../types/auth.types";
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

export const authService = {
  loginUserService,
};