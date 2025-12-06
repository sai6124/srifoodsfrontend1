import emailjs from "@emailjs/browser";
import { useState } from "react";

function SendOrderEmail({ cartItems, totalAmount, gst, netAmount }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const sendEmail = () => {
    
    if (email.trim() === "") {
      setEmailError("Please enter email");
      return;
    }

    // Wrong format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    const orderHTML = cartItems
      .map(
        (item) => `
          <div style="margin-bottom:15px; border-bottom:1px solid #ddd; padding:10px;">
            <img src="${item.image}" alt="${item.name}" width="100" />
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price} × ${item.quantity}</p>
          </div>
        `
      )
      .join("");

    const templateParams = {
      email,
      total: totalAmount.toFixed(2),
      gst: gst.toFixed(2),
      net: netAmount.toFixed(2),
      orders: orderHTML,
    };

    emailjs
      .send(
        "service_zbtloi5",
        "template_vo5isj3",
        templateParams,
        "1OFQYG970S1s7sAiA"
      )
      .then(() => alert("Email Sent Successfully!"))
      .catch(() => alert("Failed to send email"));
  };

  return (
    <div className="email-box">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
      />

      
      {emailError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{emailError}</p>
      )}

      <button onClick={sendEmail}>Send Order Email</button>
    </div>
  );
}

export default SendOrderEmail;
