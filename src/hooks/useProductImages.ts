import { useAppDispatch } from "@/src/redux/hooks";
import { toast } from "sonner";

import { productImageService } from "@/src/services/productImage.service";
import {
  fetchProductImagesStart,
  fetchProductImagesSuccess,
  fetchProductImagesFail,
  createProductImageStart,
  createProductImageSuccess,
  createProductImageFail,
  updateProductImageStart,
  updateProductImageSuccess,
  updateProductImageFail,
  deleteProductImageStart,
  deleteProductImageSuccess,
  deleteProductImageFail,
  setSingleProductImage,
  clearSingleProductImage,
} from "@/src/redux/features/product-image/productImageSlice";

export const useProductImages = () => {
  const dispatch = useAppDispatch();

  /* FETCH LIST */
  const fetchProductImages = async (params?: any) => {
    try {
      dispatch(fetchProductImagesStart());

      const res = await productImageService.getAll(params);

      dispatch(fetchProductImagesSuccess(res));
    } catch (error) {
      dispatch(fetchProductImagesFail());
      toast.error("Failed to fetch product images");
    }
  };

  /* SINGLE */
  const getSingleProductImage = async (id: string) => {
    try {
      const res = await productImageService.getSingle(id);

      dispatch(setSingleProductImage(res));

      return res;
    } catch (error) {
      toast.error("Failed to fetch image");
    }
  };

  const clearSingle = () => {
    dispatch(clearSingleProductImage());
  };

  /* CREATE */
  const createProductImage = async (payload: any) => {
    try {
      dispatch(createProductImageStart());

      await productImageService.create(payload);

      dispatch(createProductImageSuccess());

      toast.success("Product image created");

      fetchProductImages();
    } catch (error) {
      dispatch(createProductImageFail());

      toast.error("Failed to create product image");
    }
  };

  /* UPDATE */
  const updateProductImage = async (id: string, payload: any) => {
    try {
      dispatch(updateProductImageStart());

      await productImageService.update(id, payload);

      dispatch(updateProductImageSuccess());

      toast.success("Product image updated");

      fetchProductImages();
    } catch (error) {
      dispatch(updateProductImageFail());

      toast.error("Failed to update product image");
    }
  };

  /* DELETE */
  const deleteProductImage = async (id: string) => {
    try {
      dispatch(deleteProductImageStart());

      await productImageService.remove(id);

      dispatch(deleteProductImageSuccess());

      toast.success("Product image deleted");

      fetchProductImages();
    } catch (error) {
      dispatch(deleteProductImageFail());

      toast.error("Failed to delete product image");
    }
  };

  return {
    fetchProductImages,
    getSingleProductImage,
    clearSingle,

    createProductImage,
    updateProductImage,
    deleteProductImage,
  };
};
