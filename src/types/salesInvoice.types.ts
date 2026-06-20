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
  product_batch_id?: string;
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

  payments?: ISalesInvoicePayment[];
  items: ISalesInvoiceItem[];
}


export interface ISalesInvoiceResponse {
  id: string;
}



export interface ISalesInvoiceData {
  id: string;
  invoice_number: string;

  customer_id: string;
  customer_name: string;

  shop_id: string;
  branch_id: string;
  created_by: string;

  status: string;
  sale_type: string;

  subtotal: string;
  tax_amount: string;
  discount_amount: string;

  total_amount: string;
  paid_amount: string;
  due_amount: string;
  change_amount: string;

  invoice_date: string;
  notes: string;

  item_count: number;

  created_at: string;
  updated_at: string;
}

export interface ISalesInvoicesResponses {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: ISalesInvoiceData[];
}

export interface IGetSalesInvoicesQuery {
  page?: number;
  limit?: number;
  q?: string;

  customer_id?: string;

  status?: string;

  includeDeleted?: boolean;
}

export interface ISingleSalesInvoiceResponse
  extends ISalesInvoiceData {}

export interface IDeleteSalesInvoiceResponse {
  success: boolean;
  message: string;
  id: string;
}

export interface ISalesInvoiceState {
  loading: boolean;
  error: string | null;

  salesInvoice: ISalesInvoiceData | null;
}