import React from "react";
import UpdateUser from "../../components/models/updateUser";

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

/**
 * UserRow – memoized single table row. Only re-renders when the specific
 * user object or onDelete reference changes.
 */
const UserRow = React.memo(({ user, onDelete }) => (
  <tr
    className="border-b border-gray-200 hover:bg-gray-100"
    key={user._id}>
    {[user.name, user.email, user.mobile, user.department, user.role].map(
      (val, i) => (
        <td key={i} className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{val}</span>
          </div>
        </td>
      ),
    )}
    <td className="py-3 px-6">
      <div className="flex item-center justify-center">
        <UpdateUser user={user} />
        <div
          className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
          onClick={() => onDelete(user._id)}>
          <DeleteIcon />
        </div>
      </div>
    </td>
  </tr>
));

UserRow.displayName = "UserRow";

/**
 * UsersTable – presentational table of all users.
 * Wrapped in React.memo; rows are individually memoized for granular updates.
 */
const UsersTable = ({ users, onDelete }) => (
  <div className="overflow-x-auto ml-10">
    <div className="w-full lg:w-5/6">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {["Name", "Email", "Mobile", "Department", "Role", "Actions"].map(
                (h) => (
                  <th key={h} className="py-3 px-6 text-left">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {!users.length ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No Users Found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow key={user._id} user={user} onDelete={onDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default React.memo(UsersTable);
