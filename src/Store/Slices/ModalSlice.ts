import { createSlice } from "@reduxjs/toolkit";
import type { ModalStateSlice } from "../../Types";

const initialState: ModalStateSlice = {
  isUploadModal: { open: false, type: "image", multiple: false },
  selectedFiles: [],
  isWorkCountModal: { open: false, data: null },
  isServiceModal: { open: false, data: null },
  isClientLogoModal: { open: false, data: null },
  isWorkExperienceModal: { open: false, data: null },
  isSkillModal: { open: false, data: null },
  isAwardsModal: { open: false, data: null },
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
    setClientLogoModal: (state, action) => {
      state.isClientLogoModal = action.payload;
    },
    setWorkExperienceModal: (state, action) => {
      state.isWorkExperienceModal = action.payload;
    },
    setSkillModal: (state, action) => {
      state.isSkillModal = action.payload;
    },
    setAwardsModal: (state, action) => {
      state.isAwardsModal = action.payload;
    },
  },
});

export const { setSelectedFiles, setUploadModal, setWorkCountModal, setServiceModal, setClientLogoModal, setWorkExperienceModal, setSkillModal, setAwardsModal } = ModalSlice.actions;

export default ModalSlice.reducer;
