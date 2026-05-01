import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../store/procurementApi";

/**
 * useUsers – fetches all users and provides a delete handler with
 * Swal confirmation. RTK Query auto-refetches after the mutation.
 */
const useUsers = () => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [deleteUserMutation] = useDeleteUserMutation();

  const users = useMemo(
    () => (Array.isArray(data?.data) ? data.data : data || []),
    [data],
  );

  const deleteUser = useCallback(
    async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Please confirm whether you intend to delete this User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      });
      if (result.isConfirmed) {
        try {
          await deleteUserMutation(id).unwrap();
        } catch (err) {
          const msgText =
            err?.message?.split("Error: ")[1] || "Something went wrong";
          Swal.fire("Error!", msgText, "error");
        }
      }
    },
    [deleteUserMutation],
  );

  return { users, isLoading, isError, deleteUser };
};

export default useUsers;
