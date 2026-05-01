import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import supplierRequest from "../api/Supplier/supplier.request";
import orderRequest from "../api/Order/order.request";
import { toast } from "sonner";
import AppLayout from "../components/AppLayout";

const AddSuppliers = () => {
  const [orderType, setorderType] = useState("");
  const [itemName, setitemName] = useState("");
  const [email, setemail] = useState("");
  const [company, setcompany] = useState("");
  const [measuringUnit, setmeasuringUnit] = useState("");
  const [quantity, setquantity] = useState(0);
  const [description, setdescription] = useState("");
  const [supplierID, setsupplierID] = useState("");
  const [requiredDate, setrequiredDate] = useState("");
  const [allsuppliers, setAllSuppliers] = useState([]);

  useEffect(() => {
    supplierRequest.getSuppliers().then((res) => {
      console.log(res.data);
      setAllSuppliers(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    orderRequest
      .saveOrderRequest({
        orderType,
        itemName,
        measuringUnit,
        quantity,
        description,
        supplierID,
        requiredDate,
      })
      .then((res) => {
        console.log(res);
        toast.success("Purchase Order created successfully!");
        clear();
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  const clear = () => {
    setquantity(0);
    setdescription("");
    setsupplierID("");
    setitemName("");
    setemail("");
    setcompany("");
    setrequiredDate("");
    setorderType("");
    setmeasuringUnit("");
  };

  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="supplierName" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="supplierName"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Name"
              value={itemName}
              onChange={(e) => setitemName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="number"
              id="mobile"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Mobile"
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              id="company"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Company"
              value={company}
              onChange={(e) => setcompany(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              rows="4"
              className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Address"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddSuppliers;
