// hooks/useCountries.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { countryService } from "../services/country.service";

import {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,

  createCountryStart,
  createCountrySuccess,
  createCountryFailure,

  fetchSingleCountryStart,
  fetchSingleCountrySuccess,
  fetchSingleCountryFailure,

  updateCountryStart,
  updateCountrySuccess,
  updateCountryFailure,

  deleteCountryStart,
  deleteCountrySuccess,
  deleteCountryFailure,
} from "../redux/features/country/countrySlice";

import { IUpdateCountryPayload } from "../types/country.types";

export const useCountries = () => {
  const dispatch = useAppDispatch();

  const countryState = useAppSelector(
    (state) => state.countries,
  );

  /* ================= FETCH ================= */

  const fetchCountries = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchCountriesStart());

        const res = await countryService.getAllCountries({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchCountriesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchCountriesFailure(
            error?.response?.data?.message ||
              "Failed to fetch countries",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createCountry = useCallback(
    async (payload: any) => {
      try {
        dispatch(createCountryStart());

        const res =
          await countryService.createCountryService(payload);

        dispatch(createCountrySuccess(res));

        toast.success("Country created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to create country";

        dispatch(createCountryFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleCountry = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleCountryStart());

        const res =
          await countryService.getSingleCountryService(id);

        dispatch(fetchSingleCountrySuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch country";

        dispatch(fetchSingleCountryFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateCountry = useCallback(
    async (
      id: string,
      payload: IUpdateCountryPayload,
    ) => {
      try {
        dispatch(updateCountryStart());

        const res =
          await countryService.updateCountryService(
            id,
            payload,
          );

        dispatch(updateCountrySuccess(res));

        toast.success("Country updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to update country";

        dispatch(updateCountryFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteCountry = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteCountryStart());

        const res =
          await countryService.deleteCountryService(id);

        dispatch(deleteCountrySuccess(id));

        toast.success(
          res?.message || "Country deleted successfully",
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to delete country";

        dispatch(deleteCountryFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchCountries,
    createCountry,
    fetchSingleCountry,
    updateCountry,
    deleteCountry,

    ...countryState,
  };
};