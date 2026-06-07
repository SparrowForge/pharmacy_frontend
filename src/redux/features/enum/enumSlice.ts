import { IEnumbState } from "@/src/types/enum.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IEnumbState = {
  loading: false,
  error: null,

  shopPlans: [],
  companyTypes: [],
  unitTypes: [],
  salesStatus: [],
  paymentMethodTypes: [],
  purchaseOrderStatuses: [],
  paymentStatuses: [],
  returnPurchaseStatuses: [],
  saleTypes: [],
};

const enumbSlice = createSlice({
  name: "enumb",

  initialState,

  reducers: {
    /* SHOP */
    getShopPlansStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getShopPlansSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.shopPlans = action.payload;
    },

    getShopPlansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* COMPANY */
    getCompanyTypeStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getCompanyTypeSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.companyTypes = action.payload;
    },

    getCompanyTypeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= FETCH START ================= */
    fetchProductUnitTypesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /* ================= FETCH SUCCESS ================= */
    fetchProductUnitTypesSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.unitTypes = action.payload;
    },

    /* ================= FETCH FAILURE ================= */
    fetchProductUnitTypesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= FETCH START ================= */
    fetchSalesStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /* ================= FETCH SUCCESS ================= */
    fetchSalesStatusSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.salesStatus = action.payload;
    },

    /* ================= FETCH FAILURE ================= */
    fetchSalesSattusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

     /* ================= FETCH START ================= */
    fetchPaymentMethodTypeStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /* ================= FETCH SUCCESS ================= */
    fetchPaymentMethodTypeSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.paymentMethodTypes = action.payload;
    },

    /* ================= FETCH FAILURE ================= */
    fetchPaymentMethodTypeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= FETCH PURCHASE ORDER STATUSES ================= */
    fetchPurchaseOrderStatusesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchPurchaseOrderStatusesSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.purchaseOrderStatuses = action.payload;
    },

    fetchPurchaseOrderStatusesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= FETCH PAYMENT STATUSES ================= */
    fetchPaymentStatusesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchPaymentStatusesSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.paymentStatuses = action.payload;
    },

    fetchPaymentStatusesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* ================= FETCH RETURN PURCHASE STATUSES ================= */
    fetchReturnPurchaseStatusesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchReturnPurchaseStatusesSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.returnPurchaseStatuses = action.payload;
    },

    fetchReturnPurchaseStatusesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },


      /* ================= FETCH SALE TYPES ================= */  
    fetchSaleTypesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchSaleTypesSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.saleTypes = action.payload;
    },

    fetchSaleTypesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearEnumbError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getShopPlansStart,
  getShopPlansSuccess,
  getShopPlansFailure,

  getCompanyTypeStart,
  getCompanyTypeSuccess,
  getCompanyTypeFailure,

  fetchProductUnitTypesStart,
  fetchProductUnitTypesSuccess,
  fetchProductUnitTypesFailure,

  fetchSalesStatusStart,
  fetchSalesStatusSuccess,
  fetchSalesSattusFailure,

  fetchPaymentMethodTypeStart,
  fetchPaymentMethodTypeSuccess,
  fetchPaymentMethodTypeFailure,

  fetchPurchaseOrderStatusesStart,
  fetchPurchaseOrderStatusesSuccess,
  fetchPurchaseOrderStatusesFailure,

  fetchPaymentStatusesStart,
  fetchPaymentStatusesSuccess,
  fetchPaymentStatusesFailure,

  fetchReturnPurchaseStatusesStart,
  fetchReturnPurchaseStatusesSuccess,
  fetchReturnPurchaseStatusesFailure,

  fetchSaleTypesStart,
  fetchSaleTypesSuccess,
  fetchSaleTypesFailure,

  clearEnumbError,
} = enumbSlice.actions;

export default enumbSlice.reducer;
