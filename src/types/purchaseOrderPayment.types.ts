export interface IPurchaseOrderPaymentRequest {
  payments: {
    payment_method_id: string;
    amount: number;
    shop_id: string;
    branch_id: string;
    reference_type?: string;
    reference_id?: string | null;
    status: "paid" | "partial" | "due" | string;
    paid_at: string;
    notes?: string;
  }[];
}

export interface IPurchaseOrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  quantity_received: number;
  unit_cost: number;
  line_total: number;
}

export interface IPurchaseOrderPayment {
  id: string;
  payment_number: string;
  payment_method_id: string;
  payment_method_name: string;
  payment_method_type: string;
  amount: number;
  status: string;
  paid_at: string;
}

export interface IPurchaseOrderResponse {
  id: string;
  po_number: string;
  supplier_id: string;
  supplier_name: string;

  total_amount: number;
  paid_amount: number;
  due_amount: number;

  status: string;

  items: IPurchaseOrderItem[];
  payments: IPurchaseOrderPayment[];
}