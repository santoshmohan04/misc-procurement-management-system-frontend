import React from "react";
import Header from "../components/Header";
import Cover from "../assets/images/supply.jpg";
import UsersTable from "../features/users/UsersTable";
import AdminSidebar from "../components/AdminSidebar";
import useUsers from "../hooks/useUsers";

const Users = () => {
  const { users, isLoading, deleteUser } = useUsers();

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <Header />
        <AdminSidebar />
        <div
          className="h-full pt-14 pb-14 md:ml-64"
          style={{
            backgroundImage: `url(${Cover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "1200px",
          }}>
          <div
            className="flex justify-center"
            style={{ marginRight: "40px", display: "grid" }}>
            <br />
            <br />
            {isLoading ? (
              <p className="text-gray-500 py-10 ml-10">Loading users…</p>
            ) : (
              <UsersTable users={users} onDelete={deleteUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
