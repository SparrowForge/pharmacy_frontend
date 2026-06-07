import { ICompanyTypeEnumResponse, IPaymentMethodTypeResponse, IProductUnitTypeResponse, IPurchaseOrderStatusResponse, ISalesStatusEnumTypeResponse, IShopPlanEnumResponse, IPaymentStatusResponse, IReturnPurchase} from "../types/enum.types";
import axiosInstance from "./axios";

const getShopPlansService = async (): Promise<IShopPlanEnumResponse> => {

  const response = await axiosInstance.get("/datatypes/_shop_plan");
  return response.data;
};

const getCompanyTypeService = async (): Promise<ICompanyTypeEnumResponse> => {
  const response = await axiosInstance.get("/datatypes/_company_type");
  return response.data;
};

/* ================= GET PRODUCT UNIT TYPES ================= */
const getProductUnitTypes = async (): Promise<IProductUnitTypeResponse> => {
  const res = await axiosInstance.get<IProductUnitTypeResponse>(
    "/datatypes/product_unit_type"
  );

  return res.data;
};
/* ================= GET SALES STATUS TYPES ================= */
const getSalesStatus = async (): Promise<ISalesStatusEnumTypeResponse> => {
  const res = await axiosInstance.get<ISalesStatusEnumTypeResponse>(
    "/datatypes/sales_status"
  );

  return res.data;
};
/* ================= GET SALES STATUS TYPES ================= */
const getPaymentMethodTypes = async (): Promise<IPaymentMethodTypeResponse> => {
  const res = await axiosInstance.get<IPaymentMethodTypeResponse>(
    "/datatypes/payment_method_type"
  );

  return res.data;
};

/* ================= GET SALES STATUS TYPES ================= */
const getPurchaseOrderStatuses = async (): Promise<IPurchaseOrderStatusResponse> => {
  const res = await axiosInstance.get<IPurchaseOrderStatusResponse>(
    "/datatypes/purchase_order_status"
  );

  return res.data;
};

/* ================= GET SALES STATUS TYPES ================= */
const getPaymentStatuses = async (): Promise<IPaymentStatusResponse> => {
  const res = await axiosInstance.get<IPaymentStatusResponse>(
    "/datatypes/_payment_status"
  );

  return res.data;
};

/* ================= GET SALES STATUS TYPES ================= */
const getReturnPurchaseStatuses = async (): Promise<IReturnPurchase> => {
  const res = await axiosInstance.get<IReturnPurchase>(
    "/datatypes/return_status"
  );

  return res.data;
};


export const enumServices = {
  getShopPlansService,
  getCompanyTypeService,
  getProductUnitTypes,
  getSalesStatus,
  getPaymentMethodTypes,
  getPurchaseOrderStatuses,
  getPaymentStatuses,
  getReturnPurchaseStatuses
};
