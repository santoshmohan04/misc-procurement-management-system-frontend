import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cover from "../assets/images/supply.jpg";
import PaymentHistoryTable from "../features/payments/PaymentHistoryTable";
import { useManagerPayments } from "../hooks/usePayments";

const PaymentHistory = () => {
  const { payments, isLoading, deletePayment } = useManagerPayments();

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
                Payment History
              </h2>
              <div
                style={{
                  width: "600px",
                  marginLeft: "30px",
                  padding: "50px",
                }}
              />
              {isLoading ? (
                <p className="text-center text-gray-500 py-10">
                  Loading payments…
                </p>
              ) : (
                <PaymentHistoryTable
                  payments={payments}
                  onDelete={deletePayment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
