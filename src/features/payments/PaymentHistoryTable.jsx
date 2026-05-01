import React from "react";

/**
 * PaymentHistoryTable – pure presentational table of historical payments.
 * Wrapped in React.memo; only re-renders when `payments` or `onDelete`
 * reference changes.
 */
const PaymentHistoryTable = ({ payments, onDelete }) => (
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
              <th>Payment Type</th>
              <th>Payment Amount (Rs.)</th>
              <th>Payment Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, i) => (
              <tr key={payment._id || i}>
                <th scope="row">{i + 1}</th>
                <td>{payment.paymentType}</td>
                <td>{String(payment.paymentAmount)}</td>
                <td>{payment.paymentStatus}</td>
                <td>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(payment._id);
                    }}>
                    <button style={{ borderRadius: "25px" }}>Delete</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
    </center>
  </div>
);

export default React.memo(PaymentHistoryTable);
