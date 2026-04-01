import { createSlice } from "@reduxjs/toolkit";
import type { ModalStateSlice } from "../../Types";

const initialState: ModalStateSlice = {
  isUploadModal: { open: false, type: "image", multiple: false },
  selectedFiles: [],
  isWorkCountModal: { open: false, data: null },
  isServiceModal: { open: false, data: null },
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setUploadModal: (state, action) => {
      state.isUploadModal = action.payload;
    },

    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },

    setWorkCountModal: (state, action) => {
      state.isWorkCountModal = action.payload;
    },
    setServiceModal: (state, action) => {
      state.isServiceModal = action.payload;
    },
  },
});

export const { setSelectedFiles, setUploadModal, setWorkCountModal, setServiceModal } = ModalSlice.actions;

export default ModalSlice.reducer;
