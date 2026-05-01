import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cover from "../assets/images/supply.jpg";
import { usePurchasedOrders } from "../hooks/useOrders";

const PurchasedOrder = () => {
  const { orders, isLoading } = usePurchasedOrders();

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <Header />
        <Sidebar />
        <div
          className="h-full pt-14 pb-14 md:ml-64"
          style={{
            backgroundImage: `url(${Cover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "1200px",
          }}>
          <div className="grid grid-cols-3 gap-4" style={{ marginLeft: "100px" }}>
            {isLoading ? (
              <div style={{ width: "1300px" }}>
                <p className="text-gray-500 mt-20 ml-40">Loading orders…</p>
              </div>
            ) : !orders.length ? (
              <div style={{ width: "1300px" }}>
                <div
                  style={{
                    background: "lightblue",
                    marginLeft: "150px",
                    marginTop: "150px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}>
                  <h4>No Order Purchase Created !</h4>
                  <p>No Orders Were Found.</p>
                </div>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-lg shadow-lg bg-white max-w-m"
                  style={{
                    height: "510px",
                    width: "300px",
                    textAlign: "center",
                    padding: "10px",
                  }}>
                  <p style={{ fontWeight: "bold" }}>Order ID</p>
                  <br />
                  <p>{order._id}</p>
                  <br />
                  <p style={{ fontWeight: "bold" }}>Manager ID</p>
                  <br />
                  <p>{order.managerID}</p>
                  <br />
                  <p style={{ fontWeight: "bold" }}>Supplier ID</p>
                  <br />
                  <p>{order.supplierID}</p>
                  <br />
                  <p style={{ fontWeight: "bold" }}>Delivery Status</p>
                  <br />
                  <p style={{ backgroundColor: "yellow" }}>{order.available}</p>
                  <br />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedOrder;
