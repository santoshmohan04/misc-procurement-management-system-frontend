import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import orderRequest from "../../api/Order/order.request";
import deliveryRequest from "../../api/delivaryadvice/delivery.request";

const UpdateDeliveryAdvice = ({ chi }) => {
  const [showModal, setShowModal] = React.useState(false);

  const [orderID, setorderID] = useState("");
  const [deliveryItems, setdeliveryItems] = useState("");
  const [deliveredDate, setdeliveredDate] = useState("");
  const [quantity, setquantity] = useState("");
  const [description, setdescription] = useState("");
  const [supplierID, setsupplierID] = useState("");
  const [managerID, setmanagerID] = useState("");
  const [orders, setorders] = useState([]);
  const [deliveries, setdeliveries] = useState([]);
  const [unitPrice, setunitprice] = useState(0);
  const [total, settotal] = useState(0);

  const fetchDeliveryAdvice = () => {
    deliveryRequest.getdelivery().then((res) => {
      //console.log(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    orderRequest.getOrdersforSupplier().then((res) => {
      //console.log(res.data);
      setorders(res.data);
    });
  }, []);

  useEffect(() => {
    if ({ chi }) {
      setorderID(chi.orderID);
      setdeliveryItems(chi.deliveryItems);
      setdeliveredDate(chi.deliveredDate);
      setquantity(chi.quantity);
      setdescription(chi.description);
      setsupplierID(chi.supplierID);
      setmanagerID(chi.managerID);
      setunitprice(chi.unitPrice);
      settotal(chi.total);
    }
  }, [chi]);

  useEffect(() => {
    if (orderID) {
      orderRequest.getOrder(orderID).then((res) => {
        console.log(res.data);
        setsupplierID(res.data.supplierID);
        setmanagerID(res.data.managerID);
        console.log(res.data.managerID);
      });
    }
  }, [orderID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deliveryRequest
      .updatedeliveryAdvice(
        {
          orderID,
          deliveryItems,
          deliveredDate,
          quantity,
          description,
          supplierID,
          unitPrice,
          total,
          managerID,
        },
        chi._id,
      )
      .then((res) => {
        console.log(res);
        toast.success("Delivery Advice updated successfully!");
        fetchDeliveryAdvice();
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <div
        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
        onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Delivery Advice
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="flex items-center justify-center p-12">
                  <div className="w-full px-3 " style={{ width: "500px" }}>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="guest"
                          className="mb-3 block text-base font-medium text-[#07074D]">
                          Order ID
                        </label>
                        <select
                          id="countries"
                          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => setorderID(e.target.value)}>
                          <option value="Select">Select </option>
                          {!orders.length ? (
                            <option value="none">
                              No Supplier ID's Available
                            </option>
                          ) : (
                            orders.map((supplier) => (
                              <option value={supplier._id} key={supplier._id}>
                                {supplier._id}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Delivered Items
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter a Description"
                          value={deliveryItems}
                          onChange={(e) =>
                            setdeliveryItems(e.target.value)
                          }></textarea>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Delivered Date
                        </label>
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <input
                          datepicker
                          datepicker-format="mm/dd/yyyy"
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date"
                          value={deliveredDate}
                          onChange={(e) => setdeliveredDate(e.target.value)}
                        />
                      </div>

                      <div className="w-full">
                        <div className="mb-3">
                          <label
                            htmlFor="hobby"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="hobby"
                            id="hobby"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                            value={quantity}
                            onChange={(e) => setquantity(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="mb-3">
                          <label
                            htmlFor="hobby"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Unit Price
                          </label>
                          <input
                            type="number"
                            name="hobby"
                            id="hobby"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                            value={unitPrice}
                            onChange={(e) => setunitprice(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="mb-3">
                          <label
                            htmlFor="hobby"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Total
                          </label>
                          <input
                            type="number"
                            name="hobby"
                            id="hobby"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                            value={total}
                            onChange={(e) => settotal(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Description
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter a Description"
                          value={description}
                          onChange={(e) =>
                            setdescription(e.target.value)
                          }></textarea>
                      </div>

                      <div className="flex">
                        <button
                          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                          type="submit">
                          Submit
                        </button>

                        <button
                          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none ml-2"
                          onClick={() => setShowModal(false)}>
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UpdateDeliveryAdvice;
