import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer text-center py-2">
      <p>© {new Date().getFullYear()} SPHRMSUI. All Rights Reserved.</p>
    </footer>
  );
}
