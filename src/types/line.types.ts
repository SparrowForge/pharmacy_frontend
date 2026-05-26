// types/line.types.ts

export interface ILine {
  id: string;
  route_id: string;
  name: string;
  description: string;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface ILineResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: ILine[];
}

export interface IGetLinesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateLinePayload {
  route_id: string;
  name: string;
  description: string;
}

export interface ILineState {
  loading: boolean;
  error: string | null;

  line: ILine | null;
}

export interface ISingleLineResponse extends ILine {}

export interface IUpdateLinePayload {
  route_id: string;
  name: string;
  description: string;
}

export interface IDeleteLineResponse {
  success: boolean;
  message: string;
  id: string;
}
