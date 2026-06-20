// Invoice payload structure
export interface InvoiceItem {
  product_id: string;
  product_batch_id?: string;
  sales_unit_id: string;
  sales_qty: number;
  unit_price: number;
  discount: number;
  tax: number;
}

export interface PaymentRecord {
  payment_method_id: string;
  amount: number;
  shop_id: string;
  branch_id: string;
  reference_type: string;
  reference_id: string | null;
  status: string;
  paid_at: string;
  notes: string;
}

export interface InvoicePayload {
  invoice_number: string;
  customer_id: string;
  shop_id: string;
  branch_id: string;
  status: string;
  sale_type: string;
  discount_amount: number;
  tax_amount: number;
  paid_amount: number;
  invoice_date: string;
  notes: string;
  payments?: PaymentRecord[];
  items: InvoiceItem[];
}

export interface DiscountCodeResponse {
  id: string;
  code: string;
  description: string;
  phar_discount_type: "percentage" | "fixed";
  discount_value: string;
  max_usage: number;
  usage_count: number;
  min_purchase_amount: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
}
