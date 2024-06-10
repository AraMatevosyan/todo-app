import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersFromDB } from "../../services/indexedDB";
import { FetchUsersParams, FetchUsersPayload } from "./interface";

const FETCH_USERS = "users/fetchUsers";

export const fetchUsers = createAsyncThunk<FetchUsersPayload, FetchUsersParams>(
  FETCH_USERS,
  async ({ page, limit, sort, search_query }) => {
    return await getUsersFromDB(page, limit, sort, search_query);
  },
);
