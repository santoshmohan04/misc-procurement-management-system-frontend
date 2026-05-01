import React from "react";
import AppLayout from "../components/AppLayout";
import UsersTable from "../features/users/UsersTable";
import useUsers from "../hooks/useUsers";
import TableSkeleton from "../components/TableSkeleton";

const Users = () => {
  const { users, isLoading, deleteUser } = useUsers();

  return (
    <AppLayout>
      {isLoading ? (
        <TableSkeleton cols={6} rows={6} />
      ) : (
        <UsersTable users={users} onDelete={deleteUser} />
      )}
    </AppLayout>
  );
};

export default Users;
