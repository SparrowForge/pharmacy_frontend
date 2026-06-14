// purchaseOrderReceive.types.ts

export interface IPurchaseOrderReceiveItem {
  purchase_order_item_id: string;

  quantity_receive: number;
  unit_cost: number;

  expiry_date: string;
  lot_number: string;

  product_batch_id: string;
}

export interface IReceivePurchaseOrderPayload {
  receipt_number: string;
  received_at: string; // ISO string
  status: string;
  notes?: string;
  purchase_order_id: string;

  items: IPurchaseOrderReceiveItem[];
}

export interface IPurchaseReceipt {
  id: string;
  receipt_number: string;
  purchase_order_id: string;
  received_at: string; // ISO date string
  received_by: string;
  status: "received" | "pending" | "cancelled" | string;
  total_amount: string; // keep string if API returns decimal as string
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IPurchaseReceiptsResponse {
  entity: "purchase_receipts";
  page: number;
  limit: number;
  total: number;
  data: IPurchaseReceipt[];
}

export interface IReceivePurchaseOrderResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
  };
}

export interface IAvailablePurchaseReceiptItem {
  id: string;
  purchase_receipt_id: string;
  purchase_order_item_id: string;
  product_id: string;
  product_batch_id: string;

  quantity_received: number;
  unit_cost: number;
  expiry_date: string;
  lot_number: string;
  line_total: number;

  created_at: string;

  purchase_unit_id: string;

  quantity_received_purchase: number;
  quantity_received_stock: number;

  convert_rate_used: number;

  product_name: string;
  batch_number: string;
  purchase_unit_name: string;

  selling_price: number;
  available_stock: number;
}

export interface IAvailablePurchaseReceiptItemsResponse {
  product_id: string;
  items: IAvailablePurchaseReceiptItem[];
}

export interface IGetAvailablePurchaseReceiptItemsQuery {
  product_id: string;
}

export interface ISinglePurchaseReceiptItem {
  id: string;
  purchase_receipt_id: string;
  purchase_order_item_id: string;
  product_id: string;
  product_batch_id: string;
  quantity_received: number;
  unit_cost: number;
  expiry_date: string;
  lot_number: string;
  line_total: number;
  created_at: string;
  purchase_unit_id: string;
  quantity_received_purchase: number;
  quantity_received_stock: number;
  convert_rate_used: number;
  product_name: string;
  batch_number: string;
  purchase_unit_name: string;
}

export interface ISinglePurchaseReceiptResponse {
  id: string;
  receipt_number: string;
  purchase_order_id: string;
  received_at: string;
  received_by: string;
  status: string;
  total_amount: string;
  notes: string;
  created_at: string;
  updated_at: string;
  items: ISinglePurchaseReceiptItem[];
}
