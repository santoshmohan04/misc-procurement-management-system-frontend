import React from "react";
import UpdateUser from "../../components/models/updateUser";
import useDataTable from "../../hooks/useDataTable";

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

const SortIcon = ({ active, dir }) => (
  <span className="ml-1 inline-block text-gray-400">
    {active ? (dir === "asc" ? "▲" : "▼") : "⇅"}
  </span>
);

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile" },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
];

const SEARCH_FIELDS = ["name", "email", "mobile", "department", "role"];

/**
 * UsersTable – sortable, searchable, paginated table of all users.
 */
const UsersTable = ({ users, onDelete }) => {
  const {
    search,
    setSearch,
    sortKey,
    sortDir,
    handleSort,
    page,
    setPage,
    displayRows,
    totalPages,
    totalCount,
  } = useDataTable(users, SEARCH_FIELDS, "name");

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-4 max-w-xs">
        <input
          type="text"
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-max w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  className="py-3 px-6 text-left cursor-pointer select-none hover:bg-gray-300"
                  onClick={() => handleSort(key)}>
                  {label}
                  <SortIcon active={sortKey === key} dir={sortDir} />
                </th>
              ))}
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 font-light">
            {!displayRows.length ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No Users Found.
                </td>
              </tr>
            ) : (
              displayRows.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  {COLUMNS.map(({ key }) => (
                    <td key={key} className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{user[key]}</span>
                    </td>
                  ))}
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <UpdateUser user={user} />
                      <button
                        className="w-4 text-gray-400 hover:text-red-500 hover:scale-110 transition-transform"
                        onClick={() => onDelete(user._id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <span>{totalCount} user{totalCount !== 1 ? "s" : ""}</span>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}>
            ‹ Prev
          </button>
          <span className="px-2">
            {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 rounded border border-gray-300 disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}>
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UsersTable);
