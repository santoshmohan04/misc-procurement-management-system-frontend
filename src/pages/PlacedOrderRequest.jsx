import React from "react";
import Header from "../components/Header";
import AppLayout from "../components/AppLayout";
import OrderCard from "../features/orders/OrderCard";
import { useManagerOrders } from "../hooks/useOrders";
import { useCallback } from "react";

const PlacedOrderRequest = () => {
  const { orders, isLoading, searchWord, setSearchWord, deleteOrder } =
    useManagerOrders();

  const handleFilter = useCallback(
    (e) => setSearchWord(e.target.value),
    [setSearchWord],
  );

  return (
    <AppLayout>
      <div className="mb-4 max-w-md">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              value={searchWord}
              onChange={handleFilter}
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-6">
        {isLoading ? (
          <p className="text-gray-500 mt-20">Loading orders…</p>
        ) : !orders.length ? (
          <div className="bg-blue-100 rounded p-6 max-w-md">
            <h4 className="font-semibold">No Order Purchase Created!</h4>
            <p className="text-sm">No Orders Were Found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} onDelete={deleteOrder} />
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default PlacedOrderRequest;
