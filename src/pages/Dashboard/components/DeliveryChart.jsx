import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartSkeleton from "./ChartSkeleton";
import ErrorState from "./ErrorState";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const buildStatusData = (deliveries) => {
  const counts = {};
  deliveries.forEach((d) => {
    const status = d.status || d.deliveryStatus || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const DeliveryChart = ({ deliveries, isLoading, isError }) => {
  const data = useMemo(() => buildStatusData(deliveries || []), [deliveries]);

  if (isLoading) return <ChartSkeleton height={300} />;
  if (isError) return <ErrorState message="Failed to load delivery chart." />;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">
        Delivery Status Breakdown
      </h3>
      {data.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DeliveryChart;
