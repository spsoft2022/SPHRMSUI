import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import AuthRouteHandler from "./routes/handlers/AuthRouteHandler";

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
    </BrowserRouter>
  );
}

export default App;
