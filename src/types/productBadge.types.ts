export interface IProductBadge {
  id: string;
  product_id: string;
  badge: string;
  created_at: string;
  is_delete: boolean;
}

export interface ICreateProductBadgePayload {
  product_id: string;
  badge: string[];
}

export interface IUpdateProductBadgePayload {
  product_id: string;
  badge: string;
}

export interface IGetProductBadgesQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface IProductBadgeResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductBadge[];
}
