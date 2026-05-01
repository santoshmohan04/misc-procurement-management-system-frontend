import React from "react";
import AppLayout from "../components/AppLayout";
import { usePurchasedOrders } from "../hooks/useOrders";

const PurchasedOrder = () => {
  const { orders, isLoading } = usePurchasedOrders();

  return (
    <AppLayout>
      {isLoading ? (
        <p className="text-gray-500 mt-10">Loading orders…</p>
      ) : !orders.length ? (
        <div className="bg-blue-100 rounded p-6 max-w-md">
          <h4 className="font-semibold">No Order Purchase Created!</h4>
          <p className="text-sm">No Orders Were Found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg shadow bg-white p-4 text-center">
              <p className="font-bold text-sm">Order ID</p>
              <p className="text-xs break-all mb-2">{order._id}</p>
              <p className="font-bold text-sm">Manager ID</p>
              <p className="text-xs mb-2">{order.managerID}</p>
              <p className="font-bold text-sm">Supplier ID</p>
              <p className="text-xs mb-2">{order.supplierID}</p>
              <p className="font-bold text-sm">Delivery Status</p>
              <p className="text-xs bg-yellow-200 rounded px-2 py-0.5 inline-block">{order.available}</p>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default PurchasedOrder;
