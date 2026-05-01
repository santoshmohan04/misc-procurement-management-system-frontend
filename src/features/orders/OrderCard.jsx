import React from "react";
import UpdateOrderRequest from "../../components/models/UpdateOrderRequest";

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

/**
 * OrderCard – presentational component rendering a single order row.
 * Wrapped in React.memo to skip re-renders when neither the order nor
 * the onDelete callback reference changes.
 */
const OrderCard = ({ order, onDelete }) => (
  <div
    className="rounded-lg shadow-lg bg-white max-w-m"
    style={{ height: "260px", width: "1000px", marginBottom: "50px" }}>
    <br />
    <div style={{ display: "flex" }}>
      <div>
        <p style={{ marginLeft: "30px", paddingTop: "30px" }}>
          Order ID <br />
          {order._id}
        </p>
        <br />
      </div>
      <div
        style={{
          borderLeft: "6px solid black",
          height: "230px",
          marginLeft: "50px",
        }}
      />
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "30px" }}>
          <p>Placed By : {order.managerID}</p>
          <br />
          <p>Supplier : {order.supplierID}</p>
          <br />
          <p>Order Status : {order.status}</p>
          <br />
          <p>Delivery Status : {order.available}</p>
          <br />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "150px", display: "flex" }}>
            <p style={{ paddingRight: "20px" }}>{order.requiredDate}</p>
            <UpdateOrderRequest order={order} />
            <div
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
              onClick={() => onDelete(order._id)}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(OrderCard);
