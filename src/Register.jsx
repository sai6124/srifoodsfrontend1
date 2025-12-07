import { useForm } from "react-hook-form";
import axios from "axios";  // ✅ REQUIRED
import Swal from "sweetalert2";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submitLogic = async (data) => {
    if (!data.name) return alert("Please enter your name!");
    if (!data.email.match(/^\S+@\S+\.\S+$/))
      return alert("Please enter a valid email!");
    if (!data.phone.match(/^[0-9]{10}$/))
      return alert("Enter valid 10-digit phone number!");
    if (data.password.length < 6)
      return alert("Password must be at least 6 characters!");
    if (!data.address || data.address.length < 5)
      return alert("Please enter a valid address!");

    try {
      // ⭐ CLEAN & CORRECT API CALL (NO SYNTAX ERROR)
      await axios.post(
        "https://srifoodsbackend.vercel.app/api/v1/products/register",
        data
      );

      Swal.fire({
        icon: "success",
        title: "Registered Successfully!",
        text: "Redirecting to Login...",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Registration failed!",
      });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit(submitLogic)}>
          <h2>Create New Account 📝</h2>

          <input placeholder="Full Name" {...register("name")} />
          <input type="email" placeholder="Email" {...register("email")} />
          <input placeholder="Phone Number" {...register("phone")} />
          <input type="password" placeholder="Password" {...register("password")} />
          <textarea placeholder="Full Address" rows="3" {...register("address")} />

          <button type="submit" className="register-btn">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
