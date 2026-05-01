import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";
import { procurementApi } from "./procurementApi";

const store = configureStore({
  reducer: {
    user: userReducer,
    [procurementApi.reducerPath]: procurementApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(procurementApi.middleware),
});

export default store;
