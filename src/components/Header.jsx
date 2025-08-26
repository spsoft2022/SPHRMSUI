import React from "react";
import "./Header.css";
import logo from "../assets/image (1).png";
import "font-awesome/css/font-awesome.min.css";

export default function Header({ toggleSidebar }) {
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
            <button className="dropdown-item">Logout</button>
          </li>
        </ul>
      </div>

      {/* Sidebar toggle for mobile */}
      <button
        className="btn btn-outline-light d-md-none"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </header>
  );
}
