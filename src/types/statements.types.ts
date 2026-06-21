/* -------------SUPPLIER STATEMENT------------------ */
export interface ISupplierStatementFilters {
  start_date: string;
  end_date: string;
}

export interface ISupplierStatementParams {
  supplierId: string;
  filters: ISupplierStatementFilters;
}

export interface ISupplierStatementItem {
  date: string;
  type: "purchase" | "return" | string;
  reference_number: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface ISupplierStatementTotals {
  total_debit: number;
  total_credit: number;
  closing_balance: number;
}

export interface ISupplierStatementResponse {
  report: string;
  supplier_id: string;
  filters: ISupplierStatementFilters;
  totals: ISupplierStatementTotals;
  data: ISupplierStatementItem[];
}


/*--------------------------CUSTOMER STATEMENT-------------------- */

export interface ICustomerStatementFilters {
  start_date: string;
  end_date: string;
}

export interface ICustomerStatementParams {
  customerId: string;
  filters: ICustomerStatementFilters;
}

export interface ICustomerStatementItem {
  date: string;
  type: "sale" | "payment" | "return" | string;
  reference_number: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface ICustomerStatementTotals {
  total_debit: number;
  total_credit: number;
  closing_balance: number;
}

export interface ICustomerStatementResponse {
  report: string;
  customer_id: string;
  filters: ICustomerStatementFilters;
  totals: ICustomerStatementTotals;
  data: ICustomerStatementItem[];
}