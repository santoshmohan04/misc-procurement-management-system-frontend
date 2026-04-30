import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Please confirm whether you intend to delete this Delivery Advice",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });
      if (result.isConfirmed) {
        try {
          await deleteDeliveryMutation(id).unwrap();
        } catch (err) {
          const msgText =
            err?.message?.split("Error: ")[1] || "Something went wrong";
          Swal.fire("Error!", msgText, "error");
        }
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
