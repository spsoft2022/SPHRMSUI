import { useEffect } from "react";

import { getValidToken } from "../utils/auth";

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

  return <h1>Welcome to Dashboard</h1>;
}

export default Dashboard;
