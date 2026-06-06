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