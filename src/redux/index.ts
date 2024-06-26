import { combineReducers, configureStore } from "@reduxjs/toolkit";
import home from "./home/reducer";
import users from "./usersList/reducer";
import userDetails from "./userDetails/reducer";

const rootReducer = combineReducers({
  home,
  users,
  userDetails,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
