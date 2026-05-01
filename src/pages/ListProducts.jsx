import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productRequest from "../api/product/product.request";
import UpdateProduct from "../components/models/UpdateProduct";
import { toast } from "sonner";
import AppLayout from "../components/AppLayout";

const ListProducts = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    productRequest.getProductsForSupplier().then((res) => {
      console.log(res.data);
      setorders(res.data);
    });
  }, []);

  const deleteOrder = (id) => {
    if (!window.confirm("Please confirm whether you intend to delete this Product")) return;
    productRequest
      .deleteProduct(id)
      .then((res) => {
        console.log(res);
        toast.success("Product deleted successfully.");
        setorders((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => {
        console.log(err.message);
        const msgText = err.message?.split("Error: ")[1];
        toast.error(msgText || "Something went wrong.");
      });
  };

  return (
    <AppLayout>
      {!orders.length ? (
        <div className="bg-blue-100 rounded p-6 max-w-md">
          <h4 className="font-semibold">No Products Created!</h4>
          <p className="text-sm">No Products Were Found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg shadow bg-white overflow-hidden">
              <img className="w-full h-40 object-cover" src={order.image} alt={order.itemName} />
              <div className="p-3">
                <p className="font-semibold text-sm">{order.itemName}</p>
                <p className="text-xs text-gray-500">{order.itemBrand}</p>
                <p className="text-xs">Qty: {order.availableQty}</p>
                <p className="text-xs">Price: {order.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <UpdateProduct order={order} />
                  <button
                    className="w-4 text-gray-500 hover:text-red-500 hover:scale-110 transition-transform"
                    onClick={() => deleteOrder(order._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default ListProducts;
