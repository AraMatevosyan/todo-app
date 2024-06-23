import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchUsersPayload, UsersState } from "./interface";
import { fetchUsers } from "./actions";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<FetchUsersPayload>) => {
          state.loading = false;
          state.users = action.payload.users;
          state.totalPages = Math.round(action.payload.total / 10);
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
