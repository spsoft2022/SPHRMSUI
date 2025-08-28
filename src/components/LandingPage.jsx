import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getValidToken } from "../util/auth";
import Associates from "./associates/Associates";
import Downloads from "./downloads/Downloads";
import Employees from "./employees/Employees";
import LeaveProcess from "./leaveProcess/LeaveProcess";
import Leaves from "./leaves/Leaves";
import Master from "./master/Master";
import Profile from "./profile/Profile";
import Project from "./project/Project";
import Footer from "./shared/footer/Footer";
import Header from "./shared/header/Header";
import Sidebar from "./shared/sidebar/Sidebar";
import Uploads from "./uploads/Uploads";

function LandingPage() {
  useEffect(() => {
    const handleUserAction = async () => {

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
          {/* Define nested routes here */}
          <Routes>
            <Route path="/associates" element={<Associates />} />
            <Route path="/employee" element={<Employees />} />
            <Route path="/leaves" element={<Leaves />} />

            <Route path="/master" element={<Master />} />
            <Route path="/leaves-process" element={<LeaveProcess />} />
            <Route path="/project" element={<Project />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
