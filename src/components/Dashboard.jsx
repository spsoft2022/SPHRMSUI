import { useEffect } from "react";
import { getValidToken } from "../utils/auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Dashboard.css"; // fixed import path
import axios from "axios";

function Dashboard() {
  useEffect(() => {
    const handleUserAction = async () => {
      console.log("User performed an action");

      const token = localStorage.getItem("token");
      if (!token) return; // skip if not logged in

      const newToken = await getValidToken();
      if (!newToken) {
        console.log("Session expired, please log in again");
      }
    };

    window.addEventListener("click", handleUserAction);
    window.addEventListener("keydown", handleUserAction);

    return () => {
      window.removeEventListener("click", handleUserAction);
      window.removeEventListener("keydown", handleUserAction);
    };
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="app-body d-flex">
        <Sidebar />
        <main className="app-content flex-grow-1 p-3">
          <h1>Welcome to the Dashboard</h1>
          {/* Add your dashboard content here */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
