import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import {
  useGetManagerPaymentsQuery,
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useDeletePaymentMutation,
} from "../store/procurementApi";

/**
 * useManagerPayments – fetches payments for the current manager and provides
 * delete with confirmation.
 */
export const useManagerPayments = () => {
  const { data, isLoading, isError } = useGetManagerPaymentsQuery();
  const [deletePaymentMutation] = useDeletePaymentMutation();

  const payments = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );

  const deletePayment = useCallback(
    async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Please confirm whether you intend to delete this Payment",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });
      if (result.isConfirmed) {
        try {
          await deletePaymentMutation(id).unwrap();
          Swal.fire(
            "Payment Deleted Successfully!",
            "Click Ok to continue",
            "success",
          );
        } catch {
          Swal.fire("Error!", "Something went wrong", "error");
        }
      }
    },
    [deletePaymentMutation],
  );

  return { payments, isLoading, isError, deletePayment };
};

/**
 * useCreatePayment – encapsulates payment creation logic including total
 * calculation derived from a deliveries list.
 */
export const useCreatePayment = () => {
  const [createPaymentMutation, { isLoading }] = useCreatePaymentMutation();

  const calculateTotal = useCallback((orders) => {
    return orders.reduce(
      (sum, o) => sum + (Number(o.unitPrice) || 0) * (Number(o.quantity) || 0),
      0,
    );
  }, []);

  const settlePayment = useCallback(
    async (totalPrice) => {
      try {
        await createPaymentMutation({
          paymentName: `${new Date()}${totalPrice}`,
          paymentType: "Regular",
          paymentAmount: totalPrice,
          paymentStatus: "Paid",
        }).unwrap();
        Swal.fire(
          "Payment Created Successfully!",
          "Click Ok to continue",
          "success",
        );
        return true;
      } catch {
        Swal.fire("Error!", "Something went wrong", "error");
        return false;
      }
    },
    [createPaymentMutation],
  );

  return { settlePayment, calculateTotal, isSubmitting: isLoading };
};

/**
 * useAllPayments – fetches all payments (admin / account view).
 */
export const useAllPayments = () => {
  const { data, isLoading, isError } = useGetPaymentsQuery();
  const payments = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );
  return { payments, isLoading, isError };
};
