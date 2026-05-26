// types/division.types.ts

export interface IDivision {
  id: string;
  country_id: string;
  code: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IDivisionResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IDivision[];
}

export interface IGetDivisionsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateDivisionPayload {
  country_id: string;
  code: string;
  name: string;
}

export interface IDivisionState {
  loading: boolean;
  error: string | null;

  division: IDivision | null;
}

export interface ISingleDivisionResponse extends IDivision {}

export interface IUpdateDivisionPayload {
  country_id: string;
  code: string;
  name: string;
}

export interface IDeleteDivisionResponse {
  success: boolean;
  message: string;
  id: string;
}