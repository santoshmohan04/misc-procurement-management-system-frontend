import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetSupplierDeliveryQuery,
  useGetManagerDeliveryQuery,
  useGetDeliveryAdviceQuery,
  useDeleteDeliveryMutation,
} from "../store/procurementApi";

const toArray = (data) => (Array.isArray(data?.data) ? data.data : data || []);

/**
 * useSupplierDelivery – delivery advice list for a supplier, with delete.
 */
export const useSupplierDelivery = () => {
  const { data, isLoading, isError } = useGetSupplierDeliveryQuery();
  const [deleteDeliveryMutation] = useDeleteDeliveryMutation();

  const deliveries = useMemo(() => toArray(data), [data]);

  const deleteDelivery = useCallback(
    async (id) => {
      if (!window.confirm("Please confirm whether you intend to delete this Delivery Advice")) return;
      try {
        await deleteDeliveryMutation(id).unwrap();
        toast.success("Delivery Advice deleted successfully.");
      } catch (err) {
        const msgText =
          err?.message?.split("Error: ")[1] || "Something went wrong";
        toast.error(msgText);
      }
    },
    [deleteDeliveryMutation],
  );

  return { deliveries, isLoading, isError, deleteDelivery };
};

/**
 * useManagerDelivery – delivery advice list for manager view.
 */
export const useManagerDelivery = () => {
  const { data, isLoading, isError } = useGetManagerDeliveryQuery();
  const deliveries = useMemo(() => toArray(data), [data]);
  return { deliveries, isLoading, isError };
};

/**
 * useAllDelivery – all delivery advice records (account / admin view).
 */
export const useAllDelivery = () => {
  const { data, isLoading, isError } = useGetDeliveryAdviceQuery();
  const deliveries = useMemo(() => toArray(data), [data]);
  return { deliveries, isLoading, isError };
};
