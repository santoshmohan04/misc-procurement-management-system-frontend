import React from "react";

const MetricCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
};

export default MetricCardSkeleton;
