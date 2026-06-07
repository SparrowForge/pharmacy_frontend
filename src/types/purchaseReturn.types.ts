
export interface IPurchaseReturnItem {
  purchase_order_item_id: string;
  product_batch_id: string;
  return_unit_id: string;
  return_qty: number;
  unit_cost: number;
  reason: string;
}

export interface ICreatePurchaseReturnPayload {
  purchase_order_id: string;
  return_number: string;
  status: string;
  reason: string;
  notes?: string;
  items: IPurchaseReturnItem[];
}

export interface IPurchaseReturn {
  id: string;
  return_number: string;
  purchase_order_id: string;
  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  total_amount: number;

  reason: string;
  notes: string;

  created_by: string;
  processed_by: string;

  processed_at: string;
  created_at: string;
  updated_at: string;

  is_delete: boolean;

  supplier_name: string;
  po_number: string;

  item_count: number;
  total_return_stock: number;
}

export interface IPurchaseReturnResponse {
  entity: "purchase_returns";
  page: number;
  limit: number;
  total: number;
  data: IPurchaseReturn[];
}

export interface IGetPurchaseReturnParams {
  page?: number;
  limit?: number;

  q?: string;

  includeDeleted?: boolean;

  status?: string;

  supplierId?: string;

  purchaseOrderId?: string;
}