import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartSkeleton from "./ChartSkeleton";
import ErrorState from "./ErrorState";

const buildMonthlyData = (payments) => {
  const totals = {};
  payments.forEach((p) => {
    const date = new Date(p.createdAt || p.date || p.paymentDate);
    if (isNaN(date)) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    totals[key] = (totals[key] || 0) + (Number(p.amount) || 0);
  });
  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, Amount]) => ({ month, Amount: parseFloat(Amount.toFixed(2)) }));
};

const PaymentsChart = ({ payments, isLoading, isError }) => {
  const data = useMemo(() => buildMonthlyData(payments || []), [payments]);

  if (isLoading) return <ChartSkeleton height={300} />;
  if (isError) return <ErrorState message="Failed to load payments chart." />;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">
        Payments Over Time
      </h3>
      {data.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={data}
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Amount"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PaymentsChart;
