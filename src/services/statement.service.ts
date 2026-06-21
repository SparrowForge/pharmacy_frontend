import { ICustomerStatementParams, ICustomerStatementResponse, ISupplierStatementParams, ISupplierStatementResponse } from "../types/statements.types";
import axiosInstance from "./axios";


const getSupplierStatementService = async (
  params: ISupplierStatementParams
): Promise<ISupplierStatementResponse> => {
  const { supplierId, filters } = params;

  const response = await axiosInstance.get<ISupplierStatementResponse>(
    `/reports/suppliers/${supplierId}/statement`,
    {
      params: filters,
    }
  );

  return response.data;
};

const getCustomerStatementService = async (
  params: ICustomerStatementParams,
): Promise<ICustomerStatementResponse> => {
  const { customerId, filters } = params;

  const response = await axiosInstance.get<ICustomerStatementResponse>(
    `/reports/customers/${customerId}/statement`,
    {
      params: {
        start_date: filters.start_date,
        end_date: filters.end_date,
      },
    },
  );

  return response.data;
};

export const statementService = {
    getSupplierStatementService,
    getCustomerStatementService
};