// types/paymentMethod.types.ts

export interface IPaymentMethod {
  id: string;
  name: string;
  method_type:
    | "cash"
    | "card"
    | "mobile"
    | "bank_transfer"
    | "credit"
    | "check";

  description: string;
  icon: string | null;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

/* ================= GET ALL ================= */

export interface IPaymentMethodResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IPaymentMethod[];
}

export interface IGetPaymentMethodsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* ================= CREATE ================= */

export interface ICreatePaymentMethodPayload {
  name: string;
  method_type: string;
  description: string;
  icon: string | null;
  is_active: boolean;
}

/* ================= UPDATE ================= */

export interface IUpdatePaymentMethodPayload {
  name: string;
  method_type: string;

  description: string;
  icon: string | null;
  is_active: boolean;
}

/* ================= DELETE ================= */

export interface IDeletePaymentMethodResponse {
  success: boolean;
  message: string;
  id: string;
}

/* ================= STATE ================= */

export interface IPaymentMethodState {
  paymentMethods: IPaymentMethod[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singlePaymentMethod: IPaymentMethod | null;
  singleLoading: boolean;
  singleError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}
