import React from "react";

const DashboardFilters = ({
  dateFrom,
  dateTo,
  selectedSupplier,
  suppliers,
  onDateFromChange,
  onDateToChange,
  onSupplierChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-end">
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-xs text-gray-500 font-medium">From</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[150px]">
        <label className="text-xs text-gray-500 font-medium">To</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[180px]">
        <label className="text-xs text-gray-500 font-medium">Supplier</label>
        <select
          value={selectedSupplier}
          onChange={(e) => onSupplierChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
          <option value="">All Suppliers</option>
          {suppliers.map((s) => (
            <option key={s._id || s.id} value={s._id || s.id}>
              {s.name || s.supplierName || s._id}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onReset}
        className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition">
        Reset
      </button>
    </div>
  );
};

export default DashboardFilters;
