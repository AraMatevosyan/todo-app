import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUsersParams, FetchUsersPayload } from "./interface";

const FETCH_USERS = "users/fetchUsers";

// export const fetchUsersFromIndexDB = createAsyncThunk<FetchUsersPayload, FetchUsersParams>(
//   FETCH_USERS,
//   async ({ page, limit, sort, search_query }) => {
//     return await getUsersFromDB(page, limit, sort, search_query);
//   },
// );

export const fetchUsers = createAsyncThunk<FetchUsersPayload, FetchUsersParams>(
  FETCH_USERS,
  async ({ page, limit, sort, search_query }) => {
      const skip = page * limit - limit;
      const sortField = sort.field;
      const sortOrder = sort.order;

      let url = `https://dummyjson.com/users/search?q=${search_query}&limit=${limit}&skip=${skip}`;

      if (sortOrder !== undefined && sortField !== undefined) {
          url += `&order=${sortOrder}&sortBy=${sortField}`;
      }

      const response = await fetch(url);
      return await response.json();
  },
);
