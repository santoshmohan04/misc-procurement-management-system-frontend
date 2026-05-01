import React from "react";
import Header from "../components/Header";
import SupplierSidebar from "../components/SupplierSidebar";
import Cover from "../assets/images/supply.jpg";
import AddDeliveryAdvice from "../components/models/AddDeliveryAdvice";
import DeliveryTable from "../features/delivery/DeliveryTable";
import { useSupplierDelivery } from "../hooks/useDelivery";

const DeliveryAdvice = () => {
  const { deliveries, isLoading, deleteDelivery } = useSupplierDelivery();

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <Header />
        <SupplierSidebar />
        <div
          className="h-full pt-14 pb-14 md:ml-64"
          style={{
            backgroundImage: `url(${Cover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "1200px",
          }}>
          <div
            className="flex justify-center"
            style={{ marginRight: "40px", display: "grid" }}>
            <AddDeliveryAdvice />
            {isLoading ? (
              <p className="text-gray-500 py-10">Loading deliveries…</p>
            ) : (
              <DeliveryTable
                deliveries={deliveries}
                onDelete={deleteDelivery}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAdvice;
