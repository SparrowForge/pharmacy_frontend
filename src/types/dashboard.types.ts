export interface IDashboardSummaryQuery {
  expiry_days?: number;
}

export interface IDashboardSummary {
  today_sales: number;
  total_orders: number;
  low_stock_items: number;
  expiring_soon: number;
}

/* ================= TODAY SALES ================= */
export interface ITodaySale {
  id: string;
  invoice_number: string;
  status: string;
  sale_type: string;
  subtotal: string;
  discount_amount: string;
  tax_amount: string;
  total_amount: string;
  paid_amount: string;
  due_amount: string;
  invoice_date: string;
  created_at: string;
  customer_name: string;
  customer_code: string | null;
}

export interface ITodaySalesResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: ITodaySale[];
}

/* ================= TOTAL ORDERS ================= */
export interface ITotalOrder {
  id: string;
  invoice_number: string;
  status: string;
  sale_type: string;
  total_amount: string;
  paid_amount: string;
  due_amount: string;
  invoice_date: string;
  created_at: string;
  customer_name: string;
  customer_code: string | null;
}

export interface ITotalOrdersResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: ITotalOrder[];
}

/* ================= LOW STOCK ================= */
export interface ILowStockItem {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  current_stock: string;
  minimum_stock: number;
  reorder_level: number;
  rack_no: string;
  category_name: string;
  brand_name: string;
}

export interface ILowStockResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: ILowStockItem[];
}

/* ================= EXPIRING SOON ================= */
export interface IExpiringSoonItem {
  id: string;
  batch_number: string;
  barcode: string;
  expiry_date: string;
  quantity_on_hand: number;
  purchase_price: string;
  selling_price: string;
  status: string;

  product_id: string;
  product_name: string;
  product_sku: string;

  category_name: string;

  days_until_expiry: number;
}

export interface IExpiringSoonResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  days: number;
  data: IExpiringSoonItem[];
}

/* ================= COMMON QUERY ================= */
export interface IDashboardPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IExpiringSoonQuery extends IDashboardPaginationQuery {
  days?: number;
}
