export interface IProductTag {
  id: string;
  product_id: string;
  tag: string;
  created_at: string;
  is_delete: boolean;
}

export interface IProductTagResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductTag[];
}

export interface IGetProductTagsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateProductTagPayload {
  product_id: string;
  tag: string[];
}

export type IUpdateProductTagPayload = ICreateProductTagPayload;
