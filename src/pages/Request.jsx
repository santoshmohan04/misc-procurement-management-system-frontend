import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import UpdateStatusModel from "../components/models/UpdateStatus";
import orderRequest from "../api/Order/order.request";

const Request = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    orderRequest.getOrders().then((res) => {
      console.log(res.data);
      setorders(res.data);
    });
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        {!orders.length ? (
          <div className="bg-blue-100 rounded p-6 max-w-md">
            <h4 className="font-semibold">No Order Purchase Created!</h4>
            <p className="text-sm">No Orders Were Found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg shadow-lg bg-white p-6 flex flex-col sm:flex-row gap-4">
              <div className="min-w-[180px]">
                <p className="font-semibold text-sm text-gray-500">Order ID</p>
                <p className="text-sm break-all">{order._id}</p>
              </div>
              <div className="border-l border-gray-300 hidden sm:block" />
              <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div>
                  <p className="text-sm">Placed By: <span className="font-medium">{order.managerID}</span></p>
                  <p className="text-sm">Supplier: <span className="font-medium">{order.supplierID}</span></p>
                  <p className="text-sm">Order Status: <span className="font-medium">{order.approval}</span></p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm text-gray-500">{order.requiredDate}</p>
                  <div className="mt-2">
                    <UpdateStatusModel order={order} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default Request;
