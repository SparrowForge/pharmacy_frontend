export interface IProductImage {
  id: string;
  product_id: string;
  media_id: string;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
  is_delete: boolean;
}

export interface IProductImageResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductImage[];
}

export interface IGetProductImageQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateProductImage {
  product_id: string;
  media_id: string;
  sort_order: number;
  is_primary: boolean;
}
