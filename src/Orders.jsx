import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./store";
import "./Orders.css";

function Orders() {
  const dispatch = useDispatch();
  const { orderList, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User NOT logged in → Orders NOT loaded");
      return;
    }

    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <h2 className="orders-loading">Loading Orders...</h2>;

  return (
    <div className="orders-wrapper">
      <h1 className="orders-title">🍽️ Your Orders</h1>

      {orderList.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orderList.map((order) => (
          <div key={order._id} className="order-section">
            <div className="order-header">
              <div>
                <h2>Order ID: {order._id}</h2>
                <p>📅 {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="order-summary">
                <p><b>Bill:</b> ₹{order.totalAmount}</p>
                <p><b>Discount:</b> {order.discountPercent}%</p>
                <p><b>GST:</b> ₹{order.gst}</p>
                <h3 className="net-amount">₹{order.netAmount}</h3>
              </div>
            </div>

            <h3 className="items-title">Items Ordered</h3>

            <div className="items-grid">
              {order.items.map((item, index) => (
                <div className="item-card" key={index}>
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="order-divider" />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
