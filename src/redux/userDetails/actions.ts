import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../usersList/interface";

export const fetchUserById = createAsyncThunk<User | null, number>(
  "users/fetchById",
  async (id) => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      return await response.json();
  },
);
