import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp_id: empId, password }),
      });
 
      const data = await response.json();
      setMessage(data.message);
 
      if (response.ok) {
        console.log("Login success:", data);
        navigate("/Layout"); // 👈 redirect to dashboard
      } else {
        console.log("Login failed:", data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };
 
  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Employee Login</h3>
          <p className="text-muted">Enter your credentials</p>
        </div>
 
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Employee ID */}
          <div className="mb-3">
            <label htmlFor="emp_id" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              id="emp_id"
              className="form-control"
              placeholder="Enter your Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </div>
 
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
 
          {/* Login Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
 
        {message && <div className="alert alert-info text-center mt-3 p-2">{message}</div>}
 
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 
 