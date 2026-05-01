import React from "react";

/**
 * PaymentTable – pure presentational table of delivery items used during
 * payment settlement. Wrapped in React.memo to avoid re-renders when the
 * parent container re-renders for unrelated reasons.
 */
const PaymentTable = ({
  orders,
  totalPrice,
  showTotal,
  onCalculate,
  onSettle,
}) => (
  <div className="w-full overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
          <th className="px-4 py-3 text-left font-semibold text-gray-600">Delivery Items</th>
          <th className="px-4 py-3 text-left font-semibold text-gray-600">Quantity</th>
          <th className="px-4 py-3 text-left font-semibold text-gray-600">Unit Price (Rs.)</th>
          <th className="px-4 py-3 text-left font-semibold text-gray-600">Total (Rs.)</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {orders.map((order, i) => (
          <tr key={order._id || i} className="hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">{i + 1}</td>
            <td className="px-4 py-3">{order.deliveryItems}</td>
            <td className="px-4 py-3">{String(order.quantity)}</td>
            <td className="px-4 py-3">{String(order.unitPrice)}</td>
            <td className="px-4 py-3">{String(order.unitPrice * order.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 flex flex-col items-center gap-3">
      {!showTotal && (
        <button
          onClick={onCalculate}
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
          Check the Total Price
        </button>
      )}
      {showTotal && totalPrice > 0 && (
        <>
          <h3 className="text-lg font-bold">Total Price (Rs.) = {totalPrice}</h3>
          <button
            onClick={onSettle}
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            Settle the Payment
          </button>
        </>
      )}
    </div>
  </div>
);

export default React.memo(PaymentTable);
