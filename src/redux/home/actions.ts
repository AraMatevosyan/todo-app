import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./interface";

const FETCH_TASKS = "home/fetchTasks";

export const fetchTasks = createAsyncThunk<Task[]>(FETCH_TASKS, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10`,
  );
  return await response.json();
});
