import React from "react";
import "./Header.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className="app-header d-flex align-items-center justify-content-between px-3">
      <h2 className="logo">SPHRMSUI</h2>
      <button 
        className="btn btn-outline-light d-md-none" 
        onClick={toggleSidebar}  // call toggle function
      >
        ☰
      </button>
    </header>
  );
}
