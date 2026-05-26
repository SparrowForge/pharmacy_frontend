
import axiosInstance from "./axios";

import {
  ICountry,
  ICountryResponse,
  ICreateCountryPayload,
  IDeleteCountryResponse,
  IGetCountriesQuery,
  IUpdateCountryPayload,
} from "@/src/types/country.types";

const getAllCountries = async (
  params: IGetCountriesQuery,
): Promise<ICountryResponse> => {
  const res = await axiosInstance.get<ICountryResponse>("/countries", {
    params,
  });

  return res.data;
};

const createCountryService = async (
  payload: ICreateCountryPayload,
): Promise<ICountry> => {
  const response = await axiosInstance.post("/countries", payload);

  return response.data;
};

const getSingleCountryService = async (
  id: string,
): Promise<ICountry> => {
  const response = await axiosInstance.get(`/countries/${id}`);

  return response.data;
};

const updateCountryService = async (
  id: string,
  payload: IUpdateCountryPayload,
): Promise<ICountry> => {
  const response = await axiosInstance.patch(
    `/countries/${id}`,
    payload,
  );

  return response.data;
};

const deleteCountryService = async (
  id: string,
): Promise<IDeleteCountryResponse> => {
  const response = await axiosInstance.delete(`/countries/${id}`);

  return response.data;
};

export const countryService = {
  getAllCountries,
  createCountryService,
  getSingleCountryService,
  updateCountryService,
  deleteCountryService,
};