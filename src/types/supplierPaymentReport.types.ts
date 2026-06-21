export interface ISupplierPaymentFilters {
  start_date?: string;
  end_date?: string;
  company_id?: string;
  payment_method_id?: string;
  page?: number;
  limit?: number;
}

export interface ISupplierPaymentParams extends ISupplierPaymentFilters {}

export interface ISupplierPaymentItem {
  date: string;
  payment_number: string;
  supplier_name: string;
  po_number: string;
  payment_method_name: string;
  amount: number;
  status: string;
  paid_at: string;
  notes: string;
}

export interface ISupplierPaymentReportResponse {
  report: string;
  page: number;
  limit: number;
  total: number;
  total_amount: number;
  data: ISupplierPaymentItem[];
}