import React from "react";

/**
 * PaymentTable – pure presentational table of delivery items used during
 * payment settlement. Wrapped in React.memo to avoid re-renders when the
 * parent container re-renders for unrelated reasons.
 */
const PaymentTable = ({ orders, totalPrice, onCalculate, onSettle }) => (
  <div className="col">
    <center>
      <div>
        <table
          id="table"
          className="table table-hover"
          style={{ marginTop: "20px", marginLeft: "10px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price (Rs.)</th>
              <th>Total (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id || i}>
                <th scope="row">{i + 1}</th>
                <td>{order.deliveryItems}</td>
                <td>{String(order.quantity)}</td>
                <td>{String(order.unitPrice)}</td>
                <td>{String(order.unitPrice * order.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      {!totalPrice && (
        <button onClick={onCalculate} className="btn btn-primary btn-block">
          Check the Total Price
        </button>
      )}
      {totalPrice > 0 && (
        <div>
          <h3>Total Price (Rs.) = {totalPrice}</h3>
          <br />
          <button onClick={onSettle} className="btn btn-primary btn-block">
            Settle the Payment
          </button>
        </div>
      )}
      <br />
    </center>
  </div>
);

export default React.memo(PaymentTable);
