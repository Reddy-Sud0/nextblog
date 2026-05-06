import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = { id: number; firstName: string; email: string } | null;
type AuthState = {
  user: User;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (
      state,
      _action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: NonNullable<User> }>
    ) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    rehydrateAuth: (
      state,
      action: PayloadAction<{ token: string; user: NonNullable<User> }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, rehydrateAuth } =
  authSlice.actions;
export default authSlice.reducer;
