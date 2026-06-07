export interface IShopPlanEnumResponse {
  type: string;
  values: string[];
}

export interface ICompanyTypeEnumResponse {
  type: string;
  values: string[];
}

export interface IProductUnitTypeResponse {
  type: string;
  values: string[];
}

export interface ISalesStatusEnumTypeResponse {
  type: string;
  values: string[];
}

export interface IPaymentMethodTypeResponse {
  type: string;
  values: string[];
}

export interface IPurchaseOrderStatusResponse {
  type: string;
  values: string[];
}

export interface IPaymentStatusResponse {
  type: string;
  values: string[];
}
export interface IReturnPurchase {
  type: string;
  values: string[];
}
export interface ISaleTypes {
  type: string;
  values: string[];
}

export interface IEnumbState {
  loading: boolean;
  error: string | null;

  shopPlans: string[];
  companyTypes: string[];
  unitTypes: string[];
  salesStatus: string[];
  paymentMethodTypes: string[];
  purchaseOrderStatuses: string[];
  paymentStatuses: string[];
  returnPurchaseStatuses: string[];
  saleTypes: string[];
}
