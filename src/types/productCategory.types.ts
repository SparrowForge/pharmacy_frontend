export interface IProductCategory {
  id: string;

  parent_id: string | null;

  name: string;
  slug: string;
  description: string | null;

  icon: string | null;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

export interface ICreateProductCategoryPayload {
  parent_id: string | null;

  name: string;
  slug: string;
  description: string | null;

  icon: string | null;
}

export interface IUpdateProductCategoryPayload {
  parent_id: string | null;

  name: string;
  slug: string;
  description: string | null;

  icon: string | null;
}

export interface IProductCategoryResponse {
  data: IProductCategory[];
  page: number;
  limit: number;
  total: number;
}
