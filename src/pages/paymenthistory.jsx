import React from "react";
import AppLayout from "../components/AppLayout";
import PaymentHistoryTable from "../features/payments/PaymentHistoryTable";
import { useManagerPayments } from "../hooks/usePayments";
import TableSkeleton from "../components/TableSkeleton";

const PaymentHistory = () => {
  const { payments, isLoading, deletePayment } = useManagerPayments();

  return (
    <AppLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-center text-xl font-bold mb-6">Payment History</h2>
        {isLoading ? (
          <TableSkeleton cols={5} rows={5} />
        ) : (
          <PaymentHistoryTable payments={payments} onDelete={deletePayment} />
        )}
      </div>
    </AppLayout>
  );
};

export default PaymentHistory;
