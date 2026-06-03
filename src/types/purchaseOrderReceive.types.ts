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