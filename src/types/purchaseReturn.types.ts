
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
  purchase_order_id: string;
  return_number: string;
  status: string;
  reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IPurchaseReturnResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
  };
}

export interface IPurchaseReturnsResponse {
  entity: "purchase_returns";
  page: number;
  limit: number;
  total: number;
  data: IPurchaseReturn[];
}
