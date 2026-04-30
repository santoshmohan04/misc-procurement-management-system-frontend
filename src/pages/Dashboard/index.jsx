import React, { useMemo, useState } from "react";
import Header from "../../components/Header";
import {
  useGetOrdersQuery,
  useGetPaymentsQuery,
  useGetDeliveryAdviceQuery,
  useGetSuppliersQuery,
} from "../../store/dashboardApi";
import MetricCard from "./components/MetricCard";
import MetricCardSkeleton from "./components/MetricCardSkeleton";
import DashboardFilters from "./components/DashboardFilters";
import OrdersChart from "./components/OrdersChart";
import PaymentsChart from "./components/PaymentsChart";
import DeliveryChart from "./components/DeliveryChart";

const today = () => new Date().toISOString().slice(0, 10);
const oneYearAgo = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
};

const isInRange = (record, dateFrom, dateTo) => {
  const raw = record.createdAt || record.date || record.paymentDate || record.deliveryDate;
  if (!raw) return true;
  const ts = new Date(raw);
  if (isNaN(ts)) return true;
  const from = dateFrom ? new Date(dateFrom) : null;
  const to = dateTo ? new Date(dateTo + "T23:59:59") : null;
  if (from && ts < from) return false;
  if (to && ts > to) return false;
  return true;
};

const matchesSupplier = (record, supplierId) => {
  if (!supplierId) return true;
  return (
    record.supplierId === supplierId ||
    record.supplier === supplierId ||
    record.supplierID === supplierId
  );
};

const Dashboard = () => {
  const [dateFrom, setDateFrom] = useState(oneYearAgo());
  const [dateTo, setDateTo] = useState(today());
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const {
    data: ordersRaw,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrdersQuery();

  const {
    data: paymentsRaw,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useGetPaymentsQuery();

  const {
    data: deliveryRaw,
    isLoading: deliveryLoading,
    isError: deliveryError,
  } = useGetDeliveryAdviceQuery();

  const {
    data: suppliersRaw,
    isLoading: suppliersLoading,
  } = useGetSuppliersQuery();

  const suppliers = useMemo(() => suppliersRaw || [], [suppliersRaw]);

  const orders = useMemo(() => {
    const raw = Array.isArray(ordersRaw) ? ordersRaw : ordersRaw?.data || [];
    return raw.filter(
      (r) => isInRange(r, dateFrom, dateTo) && matchesSupplier(r, selectedSupplier),
    );
  }, [ordersRaw, dateFrom, dateTo, selectedSupplier]);

  const payments = useMemo(() => {
    const raw = Array.isArray(paymentsRaw) ? paymentsRaw : paymentsRaw?.data || [];
    return raw.filter(
      (r) => isInRange(r, dateFrom, dateTo) && matchesSupplier(r, selectedSupplier),
    );
  }, [paymentsRaw, dateFrom, dateTo, selectedSupplier]);

  const deliveries = useMemo(() => {
    const raw = Array.isArray(deliveryRaw) ? deliveryRaw : deliveryRaw?.data || [];
    return raw.filter(
      (r) => isInRange(r, dateFrom, dateTo) && matchesSupplier(r, selectedSupplier),
    );
  }, [deliveryRaw, dateFrom, dateTo, selectedSupplier]);

  const totalPaymentAmount = useMemo(
    () => payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
    [payments],
  );

  const deliveredCount = useMemo(
    () =>
      deliveries.filter(
        (d) =>
          (d.status || d.deliveryStatus || "").toLowerCase() === "delivered",
      ).length,
    [deliveries],
  );

  const pendingOrdersCount = useMemo(
    () =>
      orders.filter(
        (o) => (o.status || o.orderStatus || "").toLowerCase() === "pending",
      ).length,
    [orders],
  );

  const handleReset = () => {
    setDateFrom(oneYearAgo());
    setDateTo(today());
    setSelectedSupplier("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Procurement Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of orders, payments, and delivery performance
          </p>
        </div>

        {/* Filters */}
        <DashboardFilters
          dateFrom={dateFrom}
          dateTo={dateTo}
          selectedSupplier={selectedSupplier}
          suppliers={suppliers}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onSupplierChange={setSelectedSupplier}
          onReset={handleReset}
        />

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ordersLoading ? (
            <>
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </>
          ) : (
            <>
              <MetricCard
                title="Total Orders"
                value={orders.length}
                subtitle="In selected period"
                icon="📦"
                colorClass="bg-blue-500"
              />
              <MetricCard
                title="Pending Orders"
                value={pendingOrdersCount}
                subtitle="Awaiting processing"
                icon="⏳"
                colorClass="bg-yellow-500"
              />
            </>
          )}
          {paymentsLoading ? (
            <MetricCardSkeleton />
          ) : (
            <MetricCard
              title="Total Payments"
              value={`$${totalPaymentAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              subtitle={`${payments.length} transaction${payments.length !== 1 ? "s" : ""}`}
              icon="💳"
              colorClass="bg-green-500"
            />
          )}
          {deliveryLoading || suppliersLoading ? (
            <MetricCardSkeleton />
          ) : (
            <MetricCard
              title="Delivered"
              value={deliveredCount}
              subtitle={`of ${deliveries.length} deliveries`}
              icon="🚚"
              colorClass="bg-purple-500"
            />
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrdersChart
            orders={orders}
            isLoading={ordersLoading}
            isError={ordersError}
          />
          <PaymentsChart
            payments={payments}
            isLoading={paymentsLoading}
            isError={paymentsError}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeliveryChart
            deliveries={deliveries}
            isLoading={deliveryLoading}
            isError={deliveryError}
          />
          {/* Suppliers summary card */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-600">
              Active Suppliers
            </h3>
            {suppliersLoading ? (
              <div className="animate-pulse space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded" />
                ))}
              </div>
            ) : suppliers.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">
                No suppliers found
              </p>
            ) : (
              <div className="overflow-y-auto max-h-64">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-2 text-xs text-gray-400 font-medium">
                        Name
                      </th>
                      <th className="pb-2 text-xs text-gray-400 font-medium">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.slice(0, 10).map((s) => (
                      <tr
                        key={s._id || s.id}
                        className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 text-gray-700">
                          {s.name || s.supplierName || "—"}
                        </td>
                        <td className="py-2 text-gray-500 text-xs">
                          {s.email || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-auto">
              {suppliers.length} supplier{suppliers.length !== 1 ? "s" : ""}{" "}
              total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
