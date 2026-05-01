import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import AddDeliveryAdvice from "../components/models/AddDeliveryAdvice";
import UpdateDeliveryAdvice from "../components/models/UpdateDeliveryAdvice";
import deliveryRequest from "../api/delivaryadvice/delivery.request";

const DeliveryAdviceManager = () => {
  const [deliveries, setdeliveries] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  useEffect(() => {
    deliveryRequest.getdeliveryforManager().then((res) => {
      //console.log(res.data);
      setdeliveries(res.data);
    });
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord);
    setWordEntered(searchWord);
    const newFilter = deliveries.filter((res) => {
      return (
        res.deliveredDate.toLowerCase().includes(searchWord.toLowerCase()) ||
        res.orderID.toLowerCase().includes(searchWord.toLowerCase()) ||
        res.deliveryItems.toLowerCase().includes(searchWord.toLowerCase()) ||
        res.quantity.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      console.log("EMPLTY");
      deliveryRequest.getdeliveryforManager().then((res) => {
        //console.log(res.data);
        setdeliveries(res.data);
      });
    } else {
      setdeliveries(newFilter);
    }
  };

  return (
    <AppLayout>
      <div className="mb-4 max-w-md">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              value={wordEntered}
              onChange={handleFilter}
            />
          </div>
        </form>
      </div>
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

export default DeliveryAdviceManager;
