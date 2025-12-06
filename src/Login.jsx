import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "./store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(LoginUser(form)).then((res) => {
      if (res.payload?.status === true) {
        Swal.fire({
          title: "Login Successful 🎉",
          text: "Welcome back! Redirecting to Menu...",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        Swal.fire({
          title: "Login Failed ❌",
          text: "Invalid Email or Password",
          icon: "error",
          confirmButtonColor: "#ff5e00",
        });
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-sub">Login to continue ordering food</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            className="login-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="login-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;