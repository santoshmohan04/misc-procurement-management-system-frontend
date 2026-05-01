import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useGetManagerOrdersQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
} from "../store/procurementApi";

/**
 * useManagerOrders – business logic for the "Placed Order Requests" view.
 * Manages fetch, search filtering, and delete with confirmation.
 */
export const useManagerOrders = () => {
  const { data, isLoading, isError } = useGetManagerOrdersQuery();
  const [deleteOrderMutation] = useDeleteOrderMutation();
  const [searchWord, setSearchWord] = useState("");

  const allOrders = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );

  const filteredOrders = useMemo(() => {
    if (!searchWord) return allOrders;
    const lower = searchWord.toLowerCase();
    return allOrders.filter(
      (o) =>
        o.supplierID?.toLowerCase().includes(lower) ||
        o.status?.toLowerCase().includes(lower) ||
        o.available?.toLowerCase().includes(lower) ||
        o.requiredDate?.toLowerCase().includes(lower),
    );
  }, [allOrders, searchWord]);

  const deleteOrder = useCallback(
    async (id) => {
      if (!window.confirm("Please confirm whether you intend to delete this Order")) return;
      try {
        await deleteOrderMutation(id).unwrap();
        toast.success("Order deleted successfully.");
      } catch {
        toast.error("Something went wrong while deleting the order.");
      }
    },
    [deleteOrderMutation],
  );

  return {
    orders: filteredOrders,
    isLoading,
    isError,
    searchWord,
    setSearchWord,
    deleteOrder,
  };
};

/**
 * usePurchasedOrders – business logic for the "Purchased Orders" list view.
 */
export const usePurchasedOrders = () => {
  const { data, isLoading, isError } = useGetOrdersQuery();
  const orders = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );
  return { orders, isLoading, isError };
};

/**
 * useCreateOrder – business logic for the "Purchase Order" creation form.
 */
export const useCreateOrder = () => {
  const [createOrderMutation, { isLoading }] = useCreateOrderMutation();

  const createOrder = useCallback(
    async (orderData) => {
      try {
        await createOrderMutation(orderData).unwrap();
        toast.success("Purchase Order created successfully!");
        return true;
      } catch {
        toast.error("Something went wrong. Please try again.");
        return false;
      }
    },
    [createOrderMutation],
  );

  return { createOrder, isSubmitting: isLoading };
};
