import { useCallback, useMemo } from "react";
import { toast } from "sonner";
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
      if (!window.confirm("Please confirm whether you intend to delete this User")) return;
      try {
        await deleteUserMutation(id).unwrap();
        toast.success("User deleted successfully.");
      } catch (err) {
        const msgText =
          err?.message?.split("Error: ")[1] || "Something went wrong";
        toast.error(msgText);
      }
    },
    [deleteUserMutation],
  );

  return { users, isLoading, isError, deleteUser };
};

export default useUsers;
