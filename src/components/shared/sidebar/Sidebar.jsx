import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`app-sidebar d-flex flex-column p-3 ${
        isExpanded ? "expanded" : "collapsed"
      }`}
    >
      <button
        className="btn mb-3 toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaBars />
      </button>

      <ul className="nav flex-column mt-2">
        <li className="nav-item">
          <Link to="/associates" className="nav-link d-flex align-items-center ">
            <i className="fas fa-users me-2 py-2"></i>
            {isExpanded && <span>Associates</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/employee" className="nav-link d-flex align-items-center ">
            <i className="fas fa-users me-2 py-2"></i>
            {isExpanded && <span>Employees</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/leaves" className="nav-link d-flex align-items-center">
            <i className="fas fa-calendar me-2 py-2"></i>
            {isExpanded && <span>Leaves</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/master" className="nav-link d-flex align-items-center">
            <i className="fas fa-cogs me-2 py-2"></i>
            {isExpanded && <span>Master</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/leaves-process" className="nav-link d-flex align-items-center">
            <i className="fas fa-sliders me-2 py-2"></i>
            {isExpanded && <span>Leaves Process</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/project" className="nav-link d-flex align-items-center">
            <i className="fas fa-list me-2 py-2"></i>
            {isExpanded && <span>Project</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/uploads" className="nav-link d-flex align-items-center">
            <i className="fas fa-upload me-2 py-2"></i>
            {isExpanded && <span>Uploads</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/downloads" className="nav-link d-flex align-items-center">
            <i className="fas fa-download me-2 py-2"></i>
            {isExpanded && <span>Downloads</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link d-flex align-items-center">
            <i className="fas fa-user me-2 py-2"></i>
            {isExpanded && <span>Profile</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
