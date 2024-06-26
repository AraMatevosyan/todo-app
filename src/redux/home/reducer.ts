import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeState, Task } from "./interface";
import { fetchTasks } from "./actions";

const initialState: HomeState = {
  tasks: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTasks(state, action: PayloadAction<number[]>) {
      state.tasks = state.tasks.filter(
        (task) => !action.payload.includes(task.id),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const { addTask, deleteTasks } = homeSlice.actions;
export default homeSlice.reducer;
