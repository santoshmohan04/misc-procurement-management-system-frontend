import React, { useCallback, useMemo, useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import PaymentTable from "../features/payments/PaymentTable";
import { useCreatePayment } from "../hooks/usePayments";
import { useManagerDelivery } from "../hooks/useDelivery";
import TableSkeleton from "../components/TableSkeleton";

const Payment = () => {
  const { deliveries, isLoading } = useManagerDelivery();
  const { settlePayment, calculateTotal } = useCreatePayment();
  const [showTotal, setShowTotal] = useState(false);

  const totalPrice = useMemo(
    () => calculateTotal(deliveries),
    [calculateTotal, deliveries],
  );

  useEffect(() => {
    setShowTotal(false);
  }, [deliveries]);

  const handleCalculate = useCallback(() => {
    setShowTotal(true);
  }, []);

  const handleSettle = useCallback(
    () => settlePayment(totalPrice),
    [settlePayment, totalPrice],
  );

  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-center text-xl font-bold mb-6">Payments</h2>
        {isLoading ? (
          <TableSkeleton cols={5} rows={5} />
        ) : (
          <PaymentTable
            orders={deliveries}
            totalPrice={totalPrice}
            showTotal={showTotal}
            onCalculate={handleCalculate}
            onSettle={handleSettle}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Payment;
