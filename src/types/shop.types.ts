// types/shop.types.ts

export interface IShop {
  id: string;
  company_id: string;

  name: string;

  owner_name: string;
  owner_email: string | null;
  owner_phone: string | null;

  address: string | null;
  city: string | null;
  postal_code: string | null;

  country_id: string | null;
  division_id: string | null;
  district_id: string | null;
  thana_id: string | null;

  plan: string;
  status: string;

  route_id: string | null;
  line_id: string | null;

  branch_limit: number;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

export interface IShopResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IShop[];
}

export interface IGetShopsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateShopPayload {
  company_id: string;

  name: string;

  owner_name: string;
  owner_email: string;
  owner_phone: string;

  address: string;
  city: string;
  postal_code: string;

  country_id: string | null;
  division_id: string | null;
  district_id: string | null;
  thana_id: string | null;

  plan: "starter" | "business" | "enterprise";

  status: string;

  route_id: string | null;
  line_id: string | null;

  branch_limit: number;
}

export interface IUpdateShopPayload {
  company_id: string;

  name: string;

  owner_name: string;
  owner_email: string;
  owner_phone: string;

  address?: string;
  city?: string;
  postal_code?: string;

  country_id?: string | null;
  division_id?: string | null;
  district_id?: string | null;
  thana_id?: string | null;

  plan: "starter" | "business" | "enterprise";

  status: string;

  route_id?: string | null;
  line_id?: string | null;

  branch_limit: number;
}

export interface IDeleteShopResponse {
  success: boolean;
  message: string;
  id: string;
}