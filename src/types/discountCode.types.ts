// types/discountCode.types.ts

export interface IDiscountCode {
  id: string;
  code: string;
  description: string;
  phar_discount_type: "percentage" | "fixed";

  discount_value: string | number;

  max_usage: number;
  usage_count: number;

  min_purchase_amount: string | number;

  valid_from: string;
  valid_until: string;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

/* ================= GET ALL ================= */

export interface IDiscountCodeResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IDiscountCode[];
}

export interface IGetDiscountCodesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* ================= CREATE ================= */

export interface ICreateDiscountCodePayload {
  code: string;
  description: string;

  phar_discount_type: "percentage" | "fixed";

  discount_value: number;

  max_usage: number;
  usage_count?: number;

  min_purchase_amount: number;

  valid_from: string;
  valid_until: string;

  is_active: boolean;
}

/* ================= UPDATE ================= */

export interface IUpdateDiscountCodePayload {
  code: string;
  description: string;

  phar_discount_type: "percentage" | "fixed";

  discount_value: number;

  max_usage: number;

  usage_count?: number;

  min_purchase_amount: number;

  valid_from: string;
  valid_until: string;

  is_active: boolean;
}

/* ================= SINGLE ================= */

export interface ISingleDiscountCodeResponse extends IDiscountCode {}

/* ================= DELETE ================= */

export interface IDeleteDiscountCodeResponse {
  success: boolean;
  message: string;
  id: string;
}

/* ================= STATE ================= */

export interface IDiscountCodeState {
  discountCodes: IDiscountCode[];

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  singleDiscountCode: IDiscountCode | null;
  singleLoading: boolean;
  singleError: string | null;

  error: string | null;

  page: number;
  limit: number;
  total: number;
}