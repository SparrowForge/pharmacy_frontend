export interface IProduct {
  id: string;

  sku: string;
  barcode: string;

  name: string;
  calling_name: string;
  generic_name: string;

  product_number: string;

  description: string;
  overview: string;
  tag_name: string;

  brand_id: string;
  category_id: string;
  unit_id: string;
  default_unit_id:string
  supplier_id: string;
  manufacturer_id: string;
  distributor_id: string;

  purchase_price: number;
  mrp: number;
  selling_price: number;
  offered_price: number;

  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_level: number;

  rack_no: string;

  tax_rate: number;
  shipping_cost: number;
  weight: number;

  track_expiry_alert: boolean;
  allow_warranty_claim: boolean;
  allow_return: boolean;

  return_period_days: number;

  bundle_offer: string;

  meta_title: string;
  meta_keyword: string;
  meta_description: string;

  preview_media_id: string;
  product_video_url: string;

  status: string;
  is_active: boolean;

  created_at?: string;
  updated_at?: string;
  is_delete?: boolean;
}

export interface IProductResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProduct[];
}

export interface IGetProductsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

export interface ICreateProductPayload {
  sku: string;
  barcode: string;

  name: string;
  calling_name: string;
  generic_name: string;

  product_number: string;

  description: string;
  overview: string;
  tag_name: string;

  brand_id: string | null;
  category_id: string | null;
  default_unit_id:string | null
  unit_id: string | null;
  supplier_id: string | null;
  manufacturer_id: string | null;
  distributor_id: string | null;

  purchase_price: number;
  mrp: number;
  selling_price: number;
  offered_price: number;

  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_level: number;

  rack_no: string;

  tax_rate: number;
  shipping_cost: number;
  weight: number;

  track_expiry_alert: boolean;
  allow_warranty_claim: boolean;
  allow_return: boolean;

  return_period_days: number;

  bundle_offer: string;

  meta_title: string;
  meta_keyword: string;
  meta_description: string;

  preview_media_id: string | null;
  product_video_url: string | null;

  status: string;
  is_active: boolean;
}

export interface IUpdateProductPayload
  extends ICreateProductPayload {}

export interface IDeleteProductResponse {
  success: boolean;
  message: string;
  id: string;
}

export interface IProductState {
  loading: boolean;
  error: string | null;
  product: IProduct | null;
}

export interface ISingleProductResponse extends IProduct {}