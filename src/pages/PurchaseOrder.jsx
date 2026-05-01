import React, { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";
import PurchaseOrderForm from "../features/orders/PurchaseOrderForm";
import { useCreateOrder } from "../hooks/useOrders";
import useSuppliers from "../hooks/useSuppliers";

const EMPTY_FORM = {
  orderType: "",
  itemName: "",
  measuringUnit: "",
  quantity: 0,
  description: "",
  supplierID: "",
  requiredDate: "",
};

const PurchaseOrder = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const { createOrder, isSubmitting } = useCreateOrder();
  const { suppliers } = useSuppliers();

  const handleChange = useCallback((field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const success = await createOrder(form);
      if (success) setForm(EMPTY_FORM);
    },
    [createOrder, form],
  );

  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <h2 className="text-center text-xl font-bold mb-6">Purchase Order</h2>
        <PurchaseOrderForm
          {...form}
          suppliers={suppliers}
          isSubmitting={isSubmitting}
          onOrderTypeChange={handleChange("orderType")}
          onItemNameChange={handleChange("itemName")}
          onMeasuringUnitChange={handleChange("measuringUnit")}
          onQuantityChange={handleChange("quantity")}
          onDescriptionChange={handleChange("description")}
          onSupplierIDChange={handleChange("supplierID")}
          onRequiredDateChange={handleChange("requiredDate")}
          onSubmit={handleSubmit}
        />
      </div>
    </AppLayout>
  );
};

export default PurchaseOrder;
