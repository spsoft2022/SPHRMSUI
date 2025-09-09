import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import AuthRouteHandler from "./routes/handlers/AuthRouteHandler";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Route wrapped in AuthRouteHandler */}
        <Route element={<AuthRouteHandler />}>
          <Route path="/*" element={<LandingPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
