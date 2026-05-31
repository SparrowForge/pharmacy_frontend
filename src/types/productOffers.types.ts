export interface IProductOffer {
  id: string;

  product_id: string;

  title: string;
  description: string | null;

  phar_discount_type: "percentage" | "fixed";
  discount_value: number;

  starts_at: string;
  ends_at: string;

  is_active: boolean;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

/* ================= RESPONSE ================= */
export interface IProductOfferResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductOffer[];
}

/* ================= QUERY ================= */
export interface IGetProductOffersQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* ================= CREATE ================= */
export interface ICreateProductOfferPayload {
  product_id: string;

  title: string;
  description?: string | null;

  phar_discount_type: "percentage" | "fixed";
  discount_value: number;

  starts_at: string;
  ends_at: string;

  is_active: boolean;
}

/* ================= UPDATE ================= */
export interface IUpdateProductOfferPayload {
  product_id: string;

  title: string;
  description?: string | null;

  phar_discount_type: "percentage" | "fixed";
  discount_value: number;

  starts_at: string;
  ends_at: string;

  is_active: boolean;
}

/* ================= DELETE ================= */
export interface IDeleteProductOfferResponse {
  success: boolean;
  message: string;
  id: string;
}
