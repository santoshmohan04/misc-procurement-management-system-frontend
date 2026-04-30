import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";
import { dashboardApi } from "./dashboardApi";

const store = configureStore({
  reducer: {
    user: userReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dashboardApi.middleware),
});

export default store;
