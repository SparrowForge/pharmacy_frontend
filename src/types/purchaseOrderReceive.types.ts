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

export interface IReceivePurchaseOrderResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
  };
}