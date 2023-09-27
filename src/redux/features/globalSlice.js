import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistData: JSON.parse(localStorage.getItem("data"))?.data || [],
  singleVideoInfo: null,
  modalState: false,
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    // set playlist data
    setPlaylist: (state, { payload }) => {
      state.playlistData = payload;
    },

    // delete playlist
    deletePlaylist: (state, { payload }) => {
      state.playlistData = state.playlistData.filter(
        (item) => item?.etag !== payload
      );
      localStorage.setItem(
        "data",
        JSON.stringify({ data: state?.playlistData })
      );
    },

    // set single video info
    setSingleVideoInfo: (state, { payload }) => {
      state.singleVideoInfo = payload;
    },

    // setModalState
    setModalState: (state, { payload }) => {
      state.modalState = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPlaylist,
  deletePlaylist,
  setSingleVideoInfo,
  setModalState,
} = globalSlice.actions;

export default globalSlice.reducer;
