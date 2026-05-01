import React from "react";

const ChartSkeleton = ({ height = 300 }) => {
  return (
    <div
      className="bg-gray-100 rounded-lg animate-pulse w-full"
      style={{ height }}
    />
  );
};

export default ChartSkeleton;
