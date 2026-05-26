
import axiosInstance from "./axios";

import {
  ICompany,
  ICompanyResponse,
  ICreateCompanyPayload,
  IDeleteCompanyResponse,
  IGetCompaniesQuery,
  IUpdateCompanyPayload,
} from "@/src/types/company.types";

const getAllCompanies = async (
  params: IGetCompaniesQuery,
): Promise<ICompanyResponse> => {
  const res = await axiosInstance.get<ICompanyResponse>("/companies", {
    params,
  });

  return res.data;
};

const createCompanyService = async (
  payload: ICreateCompanyPayload,
): Promise<ICompany> => {
  const response = await axiosInstance.post("/companies", payload);

  return response.data;
};

const getSingleCompanyService = async (id: string): Promise<ICompany> => {
  const response = await axiosInstance.get(`/companies/${id}`);

  return response.data;
};

const updateCompanyService = async (
  id: string,
  payload: IUpdateCompanyPayload,
): Promise<ICompany> => {
  const response = await axiosInstance.patch(`/companies/${id}`, payload);

  return response.data;
};

const deleteCompanyService = async (
  id: string,
): Promise<IDeleteCompanyResponse> => {
  const response = await axiosInstance.delete(`/companies/${id}`);

  return response.data;
};

export const companyService = {
  getAllCompanies,
  createCompanyService,
  getSingleCompanyService,
  updateCompanyService,
  deleteCompanyService,
};
