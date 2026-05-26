// types/route.types.ts

export interface IRoute {
  id: string;
  zone_id: string;
  name: string;
  description: string;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IRouteResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IRoute[];
}

export interface IGetRoutesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateRoutePayload {
  zone_id: string;
  name: string;
  description: string;
}

export interface IRouteState {
  loading: boolean;
  error: string | null;

  route: IRoute | null;
}

export interface ISingleRouteResponse extends IRoute {}

export interface IUpdateRoutePayload {
  zone_id: string;
  name: string;
  description: string;
}

export interface IDeleteRouteResponse {
  success: boolean;
  message: string;
  id: string;
}
