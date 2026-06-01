export interface IPurchaseOrderItem {
  product_id: string;
  product_batch_id: string;
  purchase_unit_id: string;

  quantity_purchase: number;
  unit_cost: number;
  discount: number;
  tax: number;

  expected_expiry_date: string;
  batch_number: string;
}

export interface IPurchaseOrder {
  id: string;

  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string | undefined;

  notes: string | null;

  items: IPurchaseOrderItem[];

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

export interface IPurchaseOrderResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IPurchaseOrder[];
}

export interface IGetPurchaseOrdersQuery {
  page?: number;
  limit?: number;

  q?: string;

  supplierId?: string;

  includeDeleted?: boolean;
}

export interface ICreatePurchaseOrderPayload {
  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string;

  notes?: string;

  items: IPurchaseOrderItem[];
}

export interface IUpdatePurchaseOrderPayload {
  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string;

  notes?: string;

  items: IPurchaseOrderItem[];
}

export interface IDeletePurchaseOrderResponse {
  success: boolean;
  message: string;
  id: string;
}
