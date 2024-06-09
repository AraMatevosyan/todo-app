import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./interface";

const FETCH_TASKS = "home/fetchTasks";

export const fetchTasks = createAsyncThunk<Task[], number>(
  FETCH_TASKS,
  async (page) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=10`,
    );
    return await response.json();
  },
);
