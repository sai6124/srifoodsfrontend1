import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  increment,
  decrement,
  applyCoupon,
  clearCoupon,
  clearCart,
  placeOrder,
} from "./store";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import SendOrderEmail from "./SendOrderEmail";
import QRCode from "qrcode";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.coupon);

  const [inputCode, setInputCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [buttonDiscountPercent, setButtonDiscountPercent] = useState(0);

  const [upiQR, setUPIQR] = useState("");
  const [upiError, setUPIError] = useState("");

  const upiID = "9581198270@kotak811";
  const payeeName = "sri foods";

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const couponDiscount = (totalAmount * (coupon.discount || 0)) / 100;
  const buttonDiscount = (totalAmount * (buttonDiscountPercent || 0)) / 100;

  const appliedDiscount = Math.max(couponDiscount, buttonDiscount);
  const discountPercent = Math.max(coupon.discount || 0, buttonDiscountPercent);

  const gst = (totalAmount - appliedDiscount) * 0.18;
  const netAmount = totalAmount - appliedDiscount + gst;

  const generateUPIQR = async () => {
    if (netAmount <= 0) {
      setUPIError("Invalid bill amount");
      return;
    }
    setUPIError("");

    const upiLink =
      `upi://pay?pa=${upiID}` +
      `&pn=${encodeURIComponent(payeeName)}` +
      `&am=${netAmount.toFixed(2)}` +
      `&cu=INR`;

    try {
      const qr = await QRCode.toDataURL(upiLink);
      setUPIQR(qr);
    } catch {
      setUPIError("Failed to generate QR");
    }
  };

  // ⭐ UPDATED CHECKOUT WITH SWEETALERT2 ⭐
  const handleCheckout = async () => {
    const orderData = {
      items: cart,
      totalAmount,
      discountPercent,
      discountAmount: appliedDiscount,
      gst,
      netAmount,
    };

    try {
      await dispatch(placeOrder(orderData));

      Swal.fire({
        title: "Success!",
        text: "Order Placed Successfully!",
        icon: "success",
        confirmButtonText: "Go to Orders",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        dispatch(clearCart());
        navigate("/orders");
      });

    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Order failed, please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <main className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <h2 className="empty-msg">No items are present in your cart</h2>
      ) : (
        <>
          <section className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  src={item.image || "/fallback.jpg"}
                  className="cart-image"
                  alt={item.name}
                />
                <div className="cart-details">
                  <h2>{item.name}</h2>
                  <p>₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => dispatch(decrement(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increment(item.id))}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <div className="discount-buttons">
            <button onClick={() => setButtonDiscountPercent(10)}>10% Discount</button>
            <button onClick={() => setButtonDiscountPercent(20)}>20% Discount</button>
            <button onClick={() => setButtonDiscountPercent(30)}>30% Discount</button>
          </div>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Enter coupon"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setCouponError("");
              }}
            />

            <button
              onClick={() => {
                if (inputCode.trim() === "") {
                  setCouponError("Please enter coupon code");
                  return;
                }
                dispatch(applyCoupon(inputCode));
              }}
            >
              Apply
            </button>

            <button
              onClick={() => {
                dispatch(clearCoupon());
                setButtonDiscountPercent(0);
                setCouponError("");
              }}
            >
              Clear All
            </button>
          </div>

          {couponError && (
            <p style={{ color: "red", fontWeight: "bold" }}>{couponError}</p>
          )}

          {coupon.message && (
            <p
              style={{
                color: coupon.applied ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {coupon.message}
            </p>
          )}

          <section className="bill-box">
            <h2>Billing Details</h2>

            <p>Total: ₹{totalAmount.toFixed(2)}</p>
            <p>Discount ({discountPercent}%): ₹{appliedDiscount.toFixed(2)}</p>
            <p>GST (18%): ₹{gst.toFixed(2)}</p>

            <hr />
            <h2>Net: ₹{netAmount.toFixed(2)}</h2>
          </section>

          <button className="checkout-btn" onClick={generateUPIQR}>
            Generate UPI QR
          </button>

          {upiError && <p style={{ color: "red" }}>{upiError}</p>}

          {upiQR && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>Scan to Pay</h2>
              <h3>Amount: ₹{netAmount.toFixed(2)}</h3>
              <img src={upiQR} width="250" alt="UPI QR Code" />
            </div>
          )}

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>

          <SendOrderEmail
            cartItems={cart}
            totalAmount={totalAmount}
            gst={gst}
            netAmount={netAmount}
          />
        </>
      )}
    </main>
  );
}

export default Cart;
