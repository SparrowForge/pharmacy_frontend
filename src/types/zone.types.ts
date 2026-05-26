// types/zone.types.ts

export interface IZone {
  id: string;
  region_id: string;
  name: string;
  description: string;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IZoneResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IZone[];
}

export interface IGetZonesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateZonePayload {
  region_id: string;
  name: string;
  description: string;
}

export interface IZoneState {
  loading: boolean;
  error: string | null;

  zone: IZone | null;
}

export interface ISingleZoneResponse extends IZone {}

export interface IUpdateZonePayload {
  region_id: string;
  name: string;
  description: string;
}

export interface IDeleteZoneResponse {
  success: boolean;
  message: string;
  id: string;
}