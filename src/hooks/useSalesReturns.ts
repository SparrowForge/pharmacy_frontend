import { useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { salesReturnService } from "@/src/services/salesReturn.service";
import {
  fetchSalesReturnsStart,
  fetchSalesReturnsSuccess,
  fetchSalesReturnsFailure,
  createSalesReturnStart,
  createSalesReturnSuccess,
  createSalesReturnFailure,
  fetchSingleSalesReturnStart,
  fetchSingleSalesReturnSuccess,
  fetchSingleSalesReturnFailure,
  updateSalesReturnStart,
  updateSalesReturnSuccess,
  updateSalesReturnFailure,
  deleteSalesReturnStart,
  deleteSalesReturnSuccess,
  deleteSalesReturnFailure,
} from "@/src/redux/features/sales-invoices/salesReurnSlice";
import {
  ICreateSalesReturnPayload,
  IGetSalesReturnsQuery,
} from "@/src/types/salesReturn.types";

export const useSalesReturns = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((s) => s.salesReturns);

  /* FETCH */
  const fetchSalesReturns = useCallback(
    async (params?: IGetSalesReturnsQuery) => {
      try {
        dispatch(fetchSalesReturnsStart());

        const res = await salesReturnService.getAllSalesReturns(
          params ?? ({} as IGetSalesReturnsQuery),
        );

        dispatch(fetchSalesReturnsSuccess(res));
      } catch (err: any) {
        dispatch(
          fetchSalesReturnsFailure(
            err?.response?.data?.message || "Failed to fetch sales returns",
          ),
        );
      }
    },
    [dispatch],
  );

  /* CREATE */
  const createSalesReturn = useCallback(
    async (payload: ICreateSalesReturnPayload) => {
      try {
        dispatch(createSalesReturnStart());

        const res = await salesReturnService.createSalesReturnService(payload);

        dispatch(createSalesReturnSuccess(res));

        toast.success("Sales return created");

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to create";

        dispatch(createSalesReturnFailure(msg));

        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  /* SINGLE */
  const fetchSingleSalesReturn = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleSalesReturnStart());

        const res = await salesReturnService.getSingleSalesReturnService(id);

        dispatch(fetchSingleSalesReturnSuccess(res));

        return res;
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to fetch";

        dispatch(fetchSingleSalesReturnFailure(msg));

        toast.error(msg);

        throw err;
      }
    },
    [dispatch],
  );

  /* UPDATE */
  // const updateSalesReturn = useCallback(
  //   async (id: string, payload: IUpdateSalesReturnPayload) => {
  //     try {
  //       dispatch(updateSalesReturnStart());

  //       const res = await salesReturnService.updateSalesReturnService(
  //         id,
  //         payload,
  //       );

  //       dispatch(updateSalesReturnSuccess(res));

  //       toast.success("Updated successfully");

  //       return res;
  //     } catch (err: any) {
  //       const msg = err?.response?.data?.message || "Failed to update";

  //       dispatch(updateSalesReturnFailure(msg));

  //       toast.error(msg);

  //       throw err;
  //     }
  //   },
  //   [dispatch],
  // );

  /* DELETE */
  // const deleteSalesReturn = useCallback(
  //   async (id: string) => {
  //     try {
  //       dispatch(deleteSalesReturnStart());

  //       await salesReturnService.deleteSalesReturnService(id);

  //       dispatch(deleteSalesReturnSuccess(id));

  //       toast.success("Deleted successfully");
  //     } catch (err: any) {
  //       const msg = err?.response?.data?.message || "Failed to delete";

  //       dispatch(deleteSalesReturnFailure(msg));

  //       toast.error(msg);

  //       throw err;
  //     }
  //   },
  //   [dispatch],
  // );

  return {
    ...state,

    fetchSalesReturns,
    createSalesReturn,
    fetchSingleSalesReturn,
    // updateSalesReturn,
    // deleteSalesReturn,
  };
};
