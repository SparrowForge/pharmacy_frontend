export interface ICustomerPaymentItem {
  date: string;
  payment_number: string;
  customer_name: string;
  invoice_number: string;
  payment_method_name: string;
  amount: number;
  status: string;
  paid_at: string;
  notes: string;
}

export interface ICustomerPaymentTotals {
  total_amount: number;
}

export interface ICustomerPaymentReportResponse {
  report: "customer_payment";
  page: number;
  limit: number;
  total: number;
  total_amount: number;
  data: ICustomerPaymentItem[];
}

export interface ICustomerPaymentQuery {
  start_date: string;
  end_date: string;
  company_id?: string;
  payment_method_id?: string;
  page?: number;
  limit?: number;
}