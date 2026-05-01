import React from "react";
import useDataTable from "../../hooks/useDataTable";

const SortIcon = ({ active, dir }) => (
  <span className="ml-1 inline-block text-gray-400">
    {active ? (dir === "asc" ? "▲" : "▼") : "⇅"}
  </span>
);

const COLUMNS = [
  { key: "paymentType", label: "Payment Type" },
  { key: "paymentAmount", label: "Payment Amount (Rs.)" },
  { key: "paymentStatus", label: "Payment Status" },
];

const SEARCH_FIELDS = ["paymentType", "paymentStatus"];

/**
 * PaymentHistoryTable – sortable, searchable, paginated table of historical payments.
 */
const PaymentHistoryTable = ({ payments, onDelete }) => {
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
  } = useDataTable(payments, SEARCH_FIELDS, "paymentType");

  return (
    <div className="w-full">
      {/* Search */}
      <div className="mb-4 max-w-xs">
        <input
          type="text"
          className="block w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Search payments…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none hover:bg-gray-100"
                  onClick={() => handleSort(key)}>
                  {label}
                  <SortIcon active={sortKey === key} dir={sortDir} />
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {!displayRows.length ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No payments found.
                </td>
              </tr>
            ) : (
              displayRows.map((payment, i) => (
                <tr key={payment._id || i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {(page - 1) * 10 + i + 1}
                  </td>
                  {COLUMNS.map(({ key }) => (
                    <td key={key} className="px-4 py-3">
                      {String(payment[key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(payment._id)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <span>{totalCount} payment{totalCount !== 1 ? "s" : ""}</span>
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

export default React.memo(PaymentHistoryTable);
