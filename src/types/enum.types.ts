export interface IShopPlanEnumResponse {
  type: string;
  values: string[];
}

export interface IEnumbState {
  loading: boolean;
  error: string | null;

  shopPlans: string[];
  companyTypes: string[],
}

export interface ICompanyTypeEnumResponse {
  type: string;
  values: string[];
}