import React from "react";
import AppLayout from "../components/AppLayout";
import AddDeliveryAdvice from "../components/models/AddDeliveryAdvice";
import DeliveryTable from "../features/delivery/DeliveryTable";
import { useSupplierDelivery } from "../hooks/useDelivery";
import TableSkeleton from "../components/TableSkeleton";

const DeliveryAdvice = () => {
  const { deliveries, isLoading, deleteDelivery } = useSupplierDelivery();

  return (
    <AppLayout>
      <div className="mb-4 flex justify-end">
        <AddDeliveryAdvice />
      </div>
      {isLoading ? (
        <TableSkeleton cols={10} rows={5} />
      ) : (
        <DeliveryTable deliveries={deliveries} onDelete={deleteDelivery} />
      )}
    </AppLayout>
  );
};

export default DeliveryAdvice;
