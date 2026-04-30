import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const procurementApi = createApi({
  reducerPath: "procurementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("token") || "null");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Orders",
    "ManagerOrders",
    "SupplierOrders",
    "Payments",
    "ManagerPayments",
    "Delivery",
    "ManagerDelivery",
    "AllDelivery",
    "Users",
    "Suppliers",
  ],
  endpoints: (builder) => ({
    // ─── Orders ────────────────────────────────────────────────────────────
    getOrders: builder.query({
      query: () => "/api/orderNew/",
      providesTags: ["Orders"],
    }),
    getManagerOrders: builder.query({
      query: () => "/api/orderNew/manager/",
      providesTags: ["ManagerOrders"],
    }),
    getSupplierOrders: builder.query({
      query: () => "/api/orderNew/supplier/",
      providesTags: ["SupplierOrders"],
    }),
    getOrder: builder.query({
      query: (id) => `/api/orderNew/single/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orderNew/",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders", "ManagerOrders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `/api/orderNew/${id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ["Orders", "ManagerOrders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({ url: `/api/orderNew/${id}`, method: "DELETE" }),
      invalidatesTags: ["Orders", "ManagerOrders"],
    }),

    // ─── Payments ──────────────────────────────────────────────────────────
    getPayments: builder.query({
      query: () => "/api/payment/",
      providesTags: ["Payments"],
    }),
    getManagerPayments: builder.query({
      query: () => "/api/payment/manager",
      providesTags: ["ManagerPayments"],
    }),
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/api/payment/",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Payments", "ManagerPayments"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...payment }) => ({
        url: `/api/payment/${id}`,
        method: "PUT",
        body: payment,
      }),
      invalidatesTags: ["Payments", "ManagerPayments"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({ url: `/api/payment/${id}`, method: "DELETE" }),
      invalidatesTags: ["Payments", "ManagerPayments"],
    }),

    // ─── Delivery Advice ───────────────────────────────────────────────────
    getDeliveryAdvice: builder.query({
      query: () => "/api/deliveryAdvice/",
      providesTags: ["AllDelivery"],
    }),
    getSupplierDelivery: builder.query({
      query: () => "/api/deliveryAdvice/supplier/",
      providesTags: ["Delivery"],
    }),
    getManagerDelivery: builder.query({
      query: () => "/api/deliveryAdvice/manager",
      providesTags: ["ManagerDelivery"],
    }),
    createDelivery: builder.mutation({
      query: (delivery) => ({
        url: "/api/deliveryAdvice/",
        method: "POST",
        body: delivery,
      }),
      invalidatesTags: ["Delivery", "AllDelivery", "ManagerDelivery"],
    }),
    updateDelivery: builder.mutation({
      query: ({ id, ...delivery }) => ({
        url: `/api/deliveryAdvice/${id}`,
        method: "PUT",
        body: delivery,
      }),
      invalidatesTags: ["Delivery", "AllDelivery", "ManagerDelivery"],
    }),
    deleteDelivery: builder.mutation({
      query: (id) => ({ url: `/api/deliveryAdvice/${id}`, method: "DELETE" }),
      invalidatesTags: ["Delivery", "AllDelivery", "ManagerDelivery"],
    }),

    // ─── Users ─────────────────────────────────────────────────────────────
    getUsers: builder.query({
      query: () => "/api/user/",
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({ url: "/api/user/", method: "POST", body: user }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/api/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),

    // ─── Suppliers ─────────────────────────────────────────────────────────
    getSuppliers: builder.query({
      query: () => "/api/supplier/",
      providesTags: ["Suppliers"],
    }),
    createSupplier: builder.mutation({
      query: (supplier) => ({
        url: "/api/supplier/",
        method: "POST",
        body: supplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  // Orders
  useGetOrdersQuery,
  useGetManagerOrdersQuery,
  useGetSupplierOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  // Payments
  useGetPaymentsQuery,
  useGetManagerPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  // Delivery
  useGetDeliveryAdviceQuery,
  useGetSupplierDeliveryQuery,
  useGetManagerDeliveryQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  // Users
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  // Suppliers
  useGetSuppliersQuery,
  useCreateSupplierMutation,
} = procurementApi;
