import React from "react";

/**
 * TableSkeleton – animated pulse placeholder matching a data table layout.
 * Pass `cols` to match the number of columns in the target table.
 * Pass `rows` to control how many skeleton rows are shown (default 5).
 */
const TableSkeleton = ({ cols = 5, rows = 5 }) => (
  <div className="bg-white shadow-md rounded overflow-hidden animate-pulse">
    {/* Header */}
    <div className="bg-gray-200 flex gap-4 px-6 py-3">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-400 rounded flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div
        key={rowIdx}
        className="flex gap-4 px-6 py-4 border-b border-gray-100">
        {Array.from({ length: cols }).map((_, colIdx) => (
          <div
            key={colIdx}
            className={`h-3 bg-gray-200 rounded flex-1 ${colIdx % 3 === 0 ? "max-w-[80px]" : ""}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default TableSkeleton;
