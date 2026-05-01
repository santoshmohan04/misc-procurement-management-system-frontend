import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import AddDeliveryAdvice from "../components/models/AddDeliveryAdvice";
import UpdateDeliveryAdvice from "../components/models/UpdateDeliveryAdvice";
import deliveryRequest from "../api/delivaryadvice/delivery.request";

const ListDeliveryAdvice = () => {
  const [deliveries, setdeliveries] = useState([]);
  useEffect(() => {
    deliveryRequest.getAlldeliveryAdvice().then((res) => {
      //console.log(res.data);
      setdeliveries(res.data);
    });
  }, []);

  return (
    <AppLayout>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Delivery ID</th>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-center">Delivery Items</th>
              <th className="py-3 px-6 text-center">Delivered Date</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Unit Price</th>
              <th className="py-3 px-6 text-center">Total</th>
              <th className="py-3 px-6 text-center">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {!deliveries.length ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">No Delivery Advice found.</td>
              </tr>
            ) : (
              deliveries.map((chi) => (
                <tr key={chi._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{chi._id}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{chi.orderID}</td>
                  <td className="py-3 px-6 text-center">{chi.deliveryItems}</td>
                  <td className="py-3 px-6 text-center">{chi.deliveredDate}</td>
                  <td className="py-3 px-6 text-center">{chi.quantity}</td>
                  <td className="py-3 px-6 text-center">{chi.unitPrice}.00</td>
                  <td className="py-3 px-6 text-center">{chi.total}.00</td>
                  <td className="py-3 px-6 text-center">{chi.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};

export default ListDeliveryAdvice;
