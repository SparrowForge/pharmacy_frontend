// types/product-batches.types.ts

export interface IProductBatch {
  id: string;

  product_id: string;
  batch_number: string;
  barcode: string;

  supplier_id: string;
  manufacturer_id: string;

  manufacturing_date: string;
  expiry_date: string;
  received_date: string;

  quantity_on_hand: number;

  purchase_price: number;
  selling_price: number;

  status: string;
  location_description: string | null;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

/* ================= RESPONSE ================= */
export interface IProductBatchResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductBatch[];
}

/* ================= QUERY ================= */
export interface IGetProductBatchesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* ================= CREATE ================= */
export interface ICreateProductBatchPayload {
  product_id: string;

  batch_number: string;
  barcode: string;

  supplier_id: string;
  manufacturer_id: string;

  manufacturing_date: string;
  expiry_date: string;
  received_date: string;

  quantity_on_hand: number;

  purchase_price: number;
  selling_price: number;

  status: string;
  location_description?: string | null;
}

/* ================= UPDATE ================= */
export interface IUpdateProductBatchPayload {
  product_id: string;

  batch_number: string;
  barcode: string;

  supplier_id: string;
  manufacturer_id: string;

  manufacturing_date: string;
  expiry_date: string;
  received_date: string;

  quantity_on_hand: number;

  purchase_price: number;
  selling_price: number;

  status: string;
  location_description?: string | null;
}

/* ================= DELETE ================= */
export interface IDeleteProductBatchResponse {
  success: boolean;
  message: string;
  id: string;
}