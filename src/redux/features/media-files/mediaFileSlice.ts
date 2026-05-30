import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMediaFile } from "@/src/types/mediaFile.types";

interface IMediaFileState {
  files: IMediaFile[];

  singleFile: IMediaFile | null;
  singleLoading: boolean;

  createLoading: boolean;
  deleteLoading: boolean;

  error: string | null;
}

const initialState: IMediaFileState = {
  files: [],

  singleFile: null,
  singleLoading: false,

  createLoading: false,
  deleteLoading: false,

  error: null,
};

const mediaFileSlice = createSlice({
  name: "mediaFile",
  initialState,
  reducers: {
    /* CREATE */
    createMediaStart: (state) => {
      state.createLoading = true;
      state.error = null;
    },

    createMediaSuccess: (state, action: PayloadAction<IMediaFile>) => {
      state.createLoading = false;
      state.files.unshift(action.payload);
    },

    createMediaFailure: (state, action: PayloadAction<string>) => {
      state.createLoading = false;
      state.error = action.payload;
    },

    /* SINGLE */
    fetchMediaStart: (state) => {
      state.singleLoading = true;
      state.error = null;
    },

    fetchMediaSuccess: (state, action: PayloadAction<IMediaFile>) => {
      state.singleLoading = false;
      state.singleFile = action.payload;
    },

    fetchMediaFailure: (state, action: PayloadAction<string>) => {
      state.singleLoading = false;
      state.error = action.payload;
    },

    /* DELETE */
    deleteMediaStart: (state) => {
      state.deleteLoading = true;
      state.error = null;
    },

    deleteMediaSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.files = state.files.filter((f) => f.id !== action.payload);
    },

    deleteMediaFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },

    clearMediaState: (state) => {
      state.createLoading = false;
      state.deleteLoading = false;
      state.singleLoading = false;
      state.error = null;
    },
  },
});

export const {
  createMediaStart,
  createMediaSuccess,
  createMediaFailure,

  fetchMediaStart,
  fetchMediaSuccess,
  fetchMediaFailure,

  deleteMediaStart,
  deleteMediaSuccess,
  deleteMediaFailure,

  clearMediaState,
} = mediaFileSlice.actions;

export default mediaFileSlice.reducer;
