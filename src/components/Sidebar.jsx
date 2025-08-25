import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="app-sidebar p-3">
      <ul className="list-unstyled">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/leaves">Leave Management</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
}
