// hooks/useCompanies.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { companyService } from "../services/company.service";

import {
  fetchCompaniesStart,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  createCompanyStart,
  createCompanySuccess,
  createCompanyFailure,
  fetchSingleCompanyStart,
  fetchSingleCompanySuccess,
  fetchSingleCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
} from "../redux/features/company/companySlice";

import { IUpdateCompanyPayload } from "../types/company.types";

export const useCompanies = () => {
  const dispatch = useAppDispatch();

  const companyState = useAppSelector((state) => state.companies);

  /* ================= FETCH ================= */

  const fetchCompanies = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchCompaniesStart());

        const res = await companyService.getAllCompanies({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchCompaniesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchCompaniesFailure(
            error?.response?.data?.message || "Failed to fetch companies",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createCompany = useCallback(
    async (payload: any) => {
      try {
        dispatch(createCompanyStart());

        const res = await companyService.createCompanyService(payload);

        dispatch(createCompanySuccess(res));

        toast.success("Company created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create company";

        dispatch(createCompanyFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleCompany = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleCompanyStart());

        const res = await companyService.getSingleCompanyService(id);

        dispatch(fetchSingleCompanySuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch company";

        dispatch(fetchSingleCompanyFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateCompany = useCallback(
    async (id: string, payload: IUpdateCompanyPayload) => {
      try {
        dispatch(updateCompanyStart());

        const res = await companyService.updateCompanyService(id, payload);

        dispatch(updateCompanySuccess(res));

        toast.success("Company updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update company";

        dispatch(updateCompanyFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteCompany = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteCompanyStart());

        const res = await companyService.deleteCompanyService(id);

        dispatch(deleteCompanySuccess(id));

        toast.success(res?.message || "Company deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete company";

        dispatch(deleteCompanyFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchCompanies,
    createCompany,
    fetchSingleCompany,
    updateCompany,
    deleteCompany,

    ...companyState,
  };
};
