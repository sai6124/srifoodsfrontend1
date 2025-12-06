function Contact() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "15px",
        background: "#ffffff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "10px", color: "#333" }}>📞 Contact Us</h1>

      <p style={{ fontSize: "16px", color: "#555", marginBottom: "25px" }}>
        We’re always here to help! Feel free to reach out for any support,
        feedback, or order-related queries.
      </p>

      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f8f8f8",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#222", marginBottom: "8px" }}>📧 Email Support</h3>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#0077cc" }}>
          sai612498@gmail.com
        </p>
      </div>

      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f8f8f8",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#222", marginBottom: "8px" }}>📱 Phone Support</h3>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#00aa55" }}>
          +91 95811 98270
        </p>
      </div>

      <p style={{ fontSize: "15px", color: "#777" }}>
        ⏰ Response Time: <b>1–2 hours</b> during working hours.
      </p>

      <p style={{ marginTop: "20px", fontSize: "16px", color: "#444" }}>
        💬 Your satisfaction is our top priority — feel free to reach out anytime!
      </p>
    </div>
  );
}

export default Contact;
