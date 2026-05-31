export interface IProductUnit {
  id: string;

  name: string;
  short_name: string;

  description: string | null;

  unit_type: string;

  is_deafult_unit: boolean;

  convert_rate: number | string;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

/* ================= RESPONSE ================= */
export interface IProductUnitResponse {
  entity: string;
  page: number;
  limit: number;
  total: number;
  data: IProductUnit[];
}

/* ================= QUERY ================= */
export interface IGetProductUnitsQuery {
  page?: number;
  limit?: number;
  q?: string;
  includeDeleted?: boolean;
}

/* ================= CREATE PAYLOAD ================= */
export interface ICreateProductUnitPayload {
  name: string;

  short_name: string;

  description?: string;

  unit_type: string;

  is_deafult_unit: boolean;

  convert_rate: number;
}

/* ================= UPDATE PAYLOAD ================= */
export interface IUpdateProductUnitPayload {
  name: string;

  short_name: string;

  description?: string;

  unit_type: string;

  is_deafult_unit: boolean;

  convert_rate: number;
}

/* ================= DELETE RESPONSE ================= */
export interface IDeleteProductUnitResponse {
  success: boolean;
  message: string;
  id: string;
}
