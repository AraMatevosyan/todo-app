import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserById } from "./actions";
import { UserDetailsState } from "./interface";
import { User } from "../usersList/interface";

const initialState: UserDetailsState = {
  user: undefined,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.user = action.payload ?? undefined;
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default userDetailsSlice.reducer;
