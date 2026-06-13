import axiosInstance from "./axios";

import {
  ICreateSalesReturnPayload,
  ISalesReturn,
  ISalesReturnResponse,
  IGetSalesReturnsQuery,

} from "@/src/types/salesReturn.types";

const getAllSalesReturns = async (
  params: IGetSalesReturnsQuery,
): Promise<ISalesReturnResponse> => {
  const res = await axiosInstance.get(
    "/sales_returns",
    { params },
  );

  return res.data;
};

const createSalesReturnService = async (
  payload: ICreateSalesReturnPayload,
): Promise<ISalesReturn> => {
  const res = await axiosInstance.post(
    "/sales_returns",
    payload,
  );

  return res.data;
};

const getSingleSalesReturnService = async (
  id: string,
): Promise<ISalesReturn> => {
  const res = await axiosInstance.get(
    `/sales_returns/${id}`,
  );

  return res.data;
};

// const updateSalesReturnService = async (
//   id: string,
//   payload: IUpdateSalesReturnPayload,
// ): Promise<ISalesReturn> => {
//   const res = await axiosInstance.patch(
//     `/sales_returns/${id}`,
//     payload,
//   );

//   return res.data;
// };

// const deleteSalesReturnService = async (
//   id: string,
// ): Promise<IDeleteSalesReturnResponse> => {
//   const res = await axiosInstance.delete(
//     `/sales_returns/${id}`,
//   );

//   return res.data;
// };

export const salesReturnService = {
  getAllSalesReturns,
  createSalesReturnService,
  getSingleSalesReturnService,
  // updateSalesReturnService,
  // deleteSalesReturnService,
};