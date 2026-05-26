

export interface ICompany {
  id: string;
  company_type: string;

  name: string;
  code: string;

  contact_person: string;

  email: string;
  phone: string;

  website: string;

  address: string;
  city: string;
  postal_code: string;

  country_id: string;
  division_id: string;
  district_id: string;
  thana_id: string;

  route_id: string;
  line_id: string;

  established_year: number;

  credit_limit: number;
  payment_terms: string;

  lead_time_days: number;

  loyalty_points: number;

  total_orders: number;
  total_spent: number;

  status: string;
  notes: string;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface ICompanyResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: ICompany[];
}

export interface IGetCompaniesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateCompanyPayload {
  company_type: string;

  name: string;
  code: string;

  contact_person: string;

  email: string;
  phone: string;

  website: string;

  address: string;
  city: string;
  postal_code: string;

  country_id: string;
  division_id: string;
  district_id: string;
  thana_id: string;

  route_id: string;
  line_id: string;

  established_year: number;

  credit_limit: number;
  payment_terms: string;

  lead_time_days: number;

  loyalty_points: number;

  total_orders: number;
  total_spent: number;

  status: string;
  notes: string;
}

export interface ICompanyState {
  loading: boolean;
  error: string | null;

  company: ICompany | null;
}

export interface ISingleCompanyResponse extends ICompany {}

export interface IUpdateCompanyPayload {
  company_type: string;

  name: string;
  code: string;

  contact_person: string;

  email: string;
  phone: string;

  website: string;

  address: string;
  city: string;
  postal_code: string;

  country_id: string;
  division_id: string;
  district_id: string;
  thana_id: string;

  route_id: string;
  line_id: string;

  established_year: number;

  credit_limit: number;
  payment_terms: string;

  lead_time_days: number;

  loyalty_points: number;

  total_orders: number;
  total_spent: number;

  status: string;
  notes: string;
}

export interface IDeleteCompanyResponse {
  success: boolean;
  message: string;
  id: string;
}
