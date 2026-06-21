// stockReport.types.ts

export interface IStockReportItem {
  product_id: string;
  code: string;
  barcode: string;
  name: string;
  category_id: string;
  category_name: string;

  opening_stock: number;
  receive_qty: number;
  purchase_return_qty: number;
  sales_qty: number;
  sales_return_qty: number;
  closing_stock: number;
}

export interface IStockReportTotals {
  opening_stock: number;
  receive_qty: number;
  purchase_return_qty: number;
  sales_qty: number;
  sales_return_qty: number;
  closing_stock: number;
}

export interface IStockReportResponse {
  report: "stock";
  filters: {
    start_date: string;
    end_date: string;
    category_id: string | null;
    product_id: string | null;
  };
  total: number;
  totals: IStockReportTotals;
  data: IStockReportItem[];
}

export interface IStockReportQuery {
  start_date?: string;
  end_date?: string;
  category_id?: string;
  product_id?: string;
}


/* ---------------- SALES REPORT REQUEST ---------------- */

export interface ISalesReportParams {
  start_date: string;
  end_date: string;
  customer_id?: string | null;
  category_id?: string | null;
  product_id?: string | null;
  page?: number;
  limit?: number;
}

/* ---------------- SALES REPORT TOTALS ---------------- */

export interface ISalesReportTotals {
  total_qty: number;
  total_amount: number;
}

/* ---------------- SALES REPORT ITEM ---------------- */

export interface ISalesReportItem {
  date: string;
  invoice_number: string;
  customer_name: string;
  product_name: string;
  category_name: string;
  sales_qty: number;
  unit_price: number;
  sales_amount: number;
}

/* ---------------- SALES REPORT FILTERS ---------------- */

export interface ISalesReportFilters {
  start_date: string;
  end_date: string;
  customer_id: string | null;
  category_id: string | null;
  product_id: string | null;
}

/* ---------------- SALES REPORT RESPONSE ---------------- */

export interface ISalesReportResponse {
  report: "sales";
  filters: ISalesReportFilters;
  page: number;
  limit: number;
  total: number;
  totals: ISalesReportTotals;
  data: ISalesReportItem[];
}