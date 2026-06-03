export interface IPurchaseOrderItem {
  product_id: string;
  product_batch_id: string | null; // or null if backend allows
  purchase_unit_id: string;

  quantity_purchase: number;
  unit_cost: number;
  discount: number;
  tax: number;

  expected_expiry_date: string | null;
  batch_number: string;
}

export interface IPurchaseOrder {
  id: string;

  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string | undefined;

  notes: string | null;

  items: IPurchaseOrderItem[];
  totalqty: number,
  totalreceiveqty: number

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

export interface IPurchaseOrderResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IPurchaseOrder[];
}

export interface IGetPurchaseOrdersQuery {
  page?: number;
  limit?: number;

  q?: string;

  supplierId?: string;

  includeDeleted?: boolean;
}

export interface ICreatePurchaseOrderPayload {
  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string;

  notes?: string;

  items: IPurchaseOrderItem[];
}

export interface IUpdatePurchaseOrderPayload {
  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: string;
  phar_payment_status: string;

  discount_amount: number;
  tax_amount: number;
  shipping_cost: number;

  expected_delivery_date: string;
  delivery_date: string;

  notes?: string;

  items: IPurchaseOrderItem[];
}

export interface IDeletePurchaseOrderResponse {
  success: boolean;
  message: string;
  id: string;
}



// Product type
export interface IProduct {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  calling_name: string;
  generic_name: string;
  description: string;
  overview: string;
  brand_id: string;
  category_id: string;
  unit_id: string;
  default_unit_id: string;
  current_stock: number;
}

// Purchase Order Item type
export interface IGetSinglePurchaseOrderItem {
  lot_number: string;
  id: string;
  purchase_order_id: string;
  product_id: string;
  product_batch_id: string | null;

  quantity: number;
  quantity_received: number;

  unit_cost: string;
  discount: string;
  tax: string;
  line_total: string;

  expected_expiry_date: string | null;
  batch_number: string;

  created_at: string;
  updated_at: string;

  purchase_unit_id: string;

  quantity_purchase: string;
  quantity_stock: number;

  quantity_received_purchase: string;
  quantity_received_stock: number;

  convert_rate_used: string;

  purchase_qty: string;
  receive_qty: string;

  product: IProduct;

  product_name: string;

  stock_unit_id: string;
  default_unit_id: string;

  purchase_unit_name: string;
  stock_unit_name: string;

  quantity_stock_remaining: number;
  quantity_purchase_remaining: string;
}

// Main Purchase Order type
export interface IGetSinglePurchaseOrder {
  id: string;
  po_number: string;

  supplier_id: string;
  shop_id: string;
  branch_id: string;

  status: "pending" | "approved" | "received" | "cancelled" | string;

  subtotal: string;
  discount_amount: string;
  tax_amount: string;
  shipping_cost: string;
  total_amount: string;

  phar_payment_status: "pending" | "paid" | "partial" | string;

  expected_delivery_date: string;
  delivery_date: string;

  placed_at: string;
  created_at: string;
  updated_at: string;

  created_by: string;

  notes: string | null;

  supplier_name: string;

  items: IGetSinglePurchaseOrderItem[];
}