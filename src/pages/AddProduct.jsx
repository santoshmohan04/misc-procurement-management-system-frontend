import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import FileBase from "react-file-base64";
import productRequest from "../api/product/product.request";
import AppLayout from "../components/AppLayout";

const AddProduct = () => {
  const [itemName, setitemName] = useState("");
  const [title, settitle] = useState("");
  const [itemBrand, setitemBrand] = useState("");
  const [image, setimage] = useState("");
  const [availableQty, setavailableQty] = useState("");
  const [description, setdescription] = useState("");
  const [measuringUnit, setmeasuringUnit] = useState("");
  const [price, setprice] = useState(0);
  const [inStock, setinStock] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    productRequest
      .saveProduct({
        itemName,
        title,
        itemBrand,
        image,
        availableQty,
        description,
        measuringUnit,
        price,
        inStock: false,
      })
      .then((res) => {
        console.log(res);
        toast.success("Product added successfully!");
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
    setrequiredDate("");
    setorderType("");
    setmeasuringUnit("");
  };

  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemName" className="block mb-1 text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              id="itemName"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setitemName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="measuringUnit" className="block mb-1 text-sm font-medium text-gray-700">Measuring Unit</label>
            <select
              id="measuringUnit"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              onChange={(e) => setmeasuringUnit(e.target.value)}>
              <option value="">Select</option>
              <option value="Kg">Kilogram (Kg)</option>
              <option value="g">gram (g)</option>
            </select>
          </div>
          <div>
            <label htmlFor="itemBrand" className="block mb-1 text-sm font-medium text-gray-700">Item Brand</label>
            <input
              type="text"
              id="itemBrand"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Item Brand"
              value={itemBrand}
              onChange={(e) => setitemBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="availableQty" className="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="availableQty"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Quantity"
              value={availableQty}
              onChange={(e) => setavailableQty(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows="4"
              className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Product Image</label>
            <FileBase
              type="file"
              id="img"
              multiple={false}
              onDone={({ base64 }) => setimage(base64)}
              required
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

export default AddProduct;
