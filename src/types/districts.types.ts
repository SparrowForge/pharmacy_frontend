// types/district.types.ts

export interface IDistrict {
  id: string;
  division_id: string;
  code: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IDistrictResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IDistrict[];
}

export interface IGetDistrictsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateDistrictPayload {
  division_id: string;
  code: string;
  name: string;
}

export interface IDistrictState {
  loading: boolean;
  error: string | null;

  district: IDistrict | null;
}

export interface ISingleDistrictResponse extends IDistrict {}

export interface IUpdateDistrictPayload {
  division_id: string;
  code: string;
  name: string;
}

export interface IDeleteDistrictResponse {
  success: boolean;
  message: string;
  id: string;
}