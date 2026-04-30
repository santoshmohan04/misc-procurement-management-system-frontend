import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("token") || "null");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders", "Payments", "Delivery", "Suppliers"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/api/orderNew/",
      providesTags: ["Orders"],
    }),
    getPayments: builder.query({
      query: () => "/api/payment/",
      providesTags: ["Payments"],
    }),
    getDeliveryAdvice: builder.query({
      query: () => "/api/deliveryAdvice/",
      providesTags: ["Delivery"],
    }),
    getSuppliers: builder.query({
      query: () => "/api/supplier/",
      providesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetPaymentsQuery,
  useGetDeliveryAdviceQuery,
  useGetSuppliersQuery,
} = dashboardApi;
