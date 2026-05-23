export interface ILoginUser {
  id: string;
  shopId: string;
  branchId: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  isVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
}