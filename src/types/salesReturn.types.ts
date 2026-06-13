export interface ISalesReturnItemPayload {
  sales_invoice_item_id: string;
  return_unit_id: string;
  return_qty: number;
  unit_price: number;
  reason: string;
}

export interface ICreateSalesReturnPayload {
  sales_invoice_id: string;
  return_number: string;
  status: string;
  reason: string;
  notes: string;
  return_date: string;
  items: ISalesReturnItemPayload[];
}
export interface ICreateSalesReturnResponse {
  sales_invoice_id: string;
  return_number: string;
  status: string;
  reason: string;
  notes: string;
  return_date: string;
  items: ISalesReturnItemPayload[];
}

export interface ISalesReturn {
  id: string;

  return_number: string;

  sales_invoice_id: string;
  customer_id: string;

  shop_id: string;
  branch_id: string;

  status: "pending" | "completed" | "rejected" | string;

  total_amount: number;

  reason: string;
  notes: string;

  created_by: string;
  processed_by: string | null;

  is_delete: boolean;

  return_date: string;

  created_at: string;
  updated_at: string;

  customer_name?: string;
  invoice_number?: string;

  item_count: number;
}

export interface ISalesReturnResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;

  data: ISalesReturn[];
}

export interface IGetSalesReturnsQuery {
  page?: number;
  limit?: number;

  q?: string;

  sales_invoice_id?: string;
  customer_id?: string;

  status?: string;

  includeDeleted?: boolean;
}