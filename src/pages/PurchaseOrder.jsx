import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cover from "../assets/images/supply.jpg";
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
          <div className="flex justify-center" style={{ marginRight: "40px" }}>
            <div className="rounded-lg shadow-lg bg-white max-w-m">
              <h2
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}>
                Purchase Order
              </h2>
              <div
                style={{
                  width: "600px",
                  marginLeft: "30px",
                  padding: "50px",
                }}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
