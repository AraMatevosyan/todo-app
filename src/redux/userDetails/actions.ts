import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFromDB } from "../../services/indexedDB";
import { User } from "../usersList/interface";

export const fetchUserById = createAsyncThunk<User | null, number>(
  "users/fetchById",
  async (id) => {
    debugger;
    return await getUserFromDB(id);
  },
);
