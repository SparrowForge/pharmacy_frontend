export interface ISalesInvoicePayment {
  payment_method_id: string;
  amount: number;

  shop_id: string;
  branch_id: string;

  reference_type: string;
  reference_id: string | null;

  status: string;
  paid_at: string;

  notes?: string;
}

export interface ISalesInvoiceItem {
  product_id: string;
  product_batch_id?: string ;
  sales_unit_id: string;

  sales_qty: number;
  unit_price: number;

  discount: number;
  tax: number;
}

export interface ICreateSalesInvoicePayload {
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
  notes?: string;

  payments: ISalesInvoicePayment[];
  items: ISalesInvoiceItem[];
}

export interface ISalesInvoice {
  id: string;

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

  notes?: string;

  created_at: string;
  updated_at: string;
}

export interface ISalesInvoicesResponse {
  entity: "sales_invoices";
  page: number;
  limit: number;
  total: number;
  data: ISalesInvoice[];
}
