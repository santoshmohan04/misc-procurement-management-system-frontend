import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartSkeleton from "./ChartSkeleton";
import ErrorState from "./ErrorState";

const buildMonthlyData = (orders) => {
  const counts = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt || order.date);
    if (isNaN(date)) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, Orders: count }));
};

const OrdersChart = ({ orders, isLoading, isError }) => {
  const data = useMemo(() => buildMonthlyData(orders || []), [orders]);

  if (isLoading) return <ChartSkeleton height={300} />;
  if (isError) return <ErrorState message="Failed to load orders chart." />;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">
        Orders Over Time
      </h3>
      {data.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersChart;
