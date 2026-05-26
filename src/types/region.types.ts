
export interface IRegion {
  id: string;
  name: string;
  description: string;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IRegionResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IRegion[];
}

export interface IGetRegionsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateRegionPayload {
  name: string;
  description: string;
}

export interface IRegionState {
  loading: boolean;
  error: string | null;

  region: IRegion | null;
}

export interface ISingleRegionResponse extends IRegion {}

export interface IUpdateRegionPayload {
  name: string;
  description: string;
}

export interface IDeleteRegionResponse {
  success: boolean;
  message: string;
  id: string;
}