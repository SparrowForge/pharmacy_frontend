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


export interface IUser {
  id: string;
  shopId: string;
  branchId: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  isDelete: boolean;
  isVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ================= LIST RESPONSE ================= */

export interface IUserMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IUsersResponse {
  items: IUser[];
  meta: IUserMeta;
}

/* ================= QUERY ================= */

export interface IGetUsersQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;

  company_id?: string;
  shop_id?: string;
  branch_id?: string;
  phone_no?: string;

  status?: boolean;
  isVerified?: boolean;
}

/* ================= SINGLE RESPONSE ================= */

export interface ISingleUserResponse extends IUser {}

/* ================= UPDATE ================= */

export interface IUpdateUserPayload {
  role?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  status?: boolean;
  isVerified?: boolean;
}