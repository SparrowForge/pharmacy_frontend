export interface IBranch {
  id: string;
  shop_id: string;
  name: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country_id: string | null;
  division_id: string | null;
  district_id: string | null;
  thana_id: string | null;
  route_id: string | null;
  line_id: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
}

export interface IBranchResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IBranch[];
}

export interface IGetBranchesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}


export interface ICreateBranchPayload {
  shop_id: string;
  name: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country_id?: string | null;
  division_id?: string | null;
  district_id?: string | null;
  thana_id?: string | null;
  route_id?: string | null;
  line_id?: string | null;
  email?: string;
  phone?: string;
  status?: string;
}