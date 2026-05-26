export interface IThana {
  id: string;
  district_id: string;
  code: string;
  name: string;
  postal_code: string;
  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IThanaResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IThana[];
}

export interface IGetThanasQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateThanaPayload {
  district_id: string;
  code: string;
  name: string;
  postal_code: string;
}

export interface IThanaState {
  loading: boolean;
  error: string | null;

  thana: IThana | null;
}

export interface ISingleThanaResponse extends IThana {}

export interface IUpdateThanaPayload {
  district_id: string;
  code: string;
  name: string;
  postal_code: string;
}

export interface IDeleteThanaResponse {
  success: boolean;
  message: string;
  id: string;
}