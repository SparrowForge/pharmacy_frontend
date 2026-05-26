

export interface ICountry {
  id: string;
  code: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface ICountryResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: ICountry[];
}

export interface IGetCountriesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateCountryPayload {
  code: string;
  name: string;
}

export interface ICountryState {
  loading: boolean;
  error: string | null;

  country: ICountry | null;
}

export interface ISingleCountryResponse extends ICountry {}

export interface IUpdateCountryPayload {
  code: string;
  name: string;
}

export interface IDeleteCountryResponse {
  success: boolean;
  message: string;
  id: string;
}