import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/login";
 import Employees from "./components/Employees";
import LeaveMangement from "./components/LeaveManagement";
import Settings from "./components/Settings";
function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/employees" element={<Employees />} /> 
   <Route path="/leaves" element={<LeaveMangement />} />
 <Route path="/settings" element={<Settings />} />
</Routes>
    </BrowserRouter>
  );
}
 
export default App;
 