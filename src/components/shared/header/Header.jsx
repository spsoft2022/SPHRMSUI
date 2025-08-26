import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/spsoft_logo.png";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  /*
   * Logs out the user by sending a POST request and clearing the token from localStorage.
   * Navigates to the home page and logs any errors if the request fails.
   */
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="app-header d-flex align-items-center justify-content-between px-3 py-2">
      {/* Logo Section */}
      <div className="logo-container d-flex align-items-center">
        <img src={logo} alt="logo" className="lookUp" />
      </div>

      {/* Title */}
      <h3 className="page-title">Leave Management System</h3>

      {/* Profile Section */}
      <div className="user-profile dropdown">
        <div className="d-flex align-items-center profile-trigger">
          <span className="user-name me-2">Admin-HR</span>
          <i className="fa fa-user-circle fa-lg"></i>
        </div>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
