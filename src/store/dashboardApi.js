// Re-export from procurementApi for backward compatibility.
// The Dashboard page imports from this file; all RTK Query state is now
// served by the single procurementApi service registered in the store.
export {
  procurementApi as dashboardApi,
  useGetOrdersQuery,
  useGetPaymentsQuery,
  useGetDeliveryAdviceQuery,
  useGetSuppliersQuery,
} from "./procurementApi";
