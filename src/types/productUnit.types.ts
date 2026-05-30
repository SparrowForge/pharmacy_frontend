export interface IProductUnit {
  id: string;
  name: string;
  short_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
}

export interface IProductUnitResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductUnit[];
}

export interface IGetProductUnitsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}