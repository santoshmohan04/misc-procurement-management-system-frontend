import React from "react";

const MetricCard = ({ title, value, subtitle, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl flex-shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-0">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mb-0">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mb-0">{subtitle}</p>}
      </div>
    </div>
  );
};

export default MetricCard;
