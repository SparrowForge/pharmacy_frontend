export interface IProductBrand {
  id: string;

  name: string;
  slug: string;
  description: string;

  manufacturer_id: string;
  logo_media_id: string;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

/* LIST RESPONSE */
export interface IProductBrandResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductBrand[];
}

/* QUERY */
export interface IGetProductBrandsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* CREATE */
export interface ICreateProductBrandPayload {
  name: string;
  slug: string;
  description: string;
  manufacturer_id: string;
  logo_media_id: string;
}

/* UPDATE */
export interface IUpdateProductBrandPayload {
  name: string;
  slug: string;
  description: string;
  manufacturer_id: string;
  logo_media_id: string;
}

/* DELETE */
export interface IDeleteProductBrandResponse {
  success: boolean;
  message: string;
  id: string;
}