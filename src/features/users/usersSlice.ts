import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../actions/types";

export interface UserState {
  isDocumentUploaded: boolean;
  currentUser: UserData | null;
  users: Array<{ id: string; email: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  isDocumentUploaded: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersSuccess: (
      state,
      action: PayloadAction<{ id: string; email: string }[]>
    ) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    documentUploadSuccess: (state, action: PayloadAction<File[]>) => {
      if (state.currentUser) state.currentUser.documents = action.payload;
      state.loading = false;
    },
    addFavoriteSuccess: (state, action: PayloadAction<string[]>) => {
      if (state.currentUser) state.currentUser.favoriteSymbols = action.payload;
      state.loading = false;
    },
    removeFavoriteSuccess: (state, action: PayloadAction<string[]>) => {
      if (state.currentUser) state.currentUser.favoriteSymbols = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getUsersSuccess,
  getUsersFail,
  getUsersStart,
  loadUser,
  documentUploadSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
} = userSlice.actions;

export default userSlice.reducer;
