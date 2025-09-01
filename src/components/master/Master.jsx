import { useState } from "react";

import AssociateReporting from "./associateReporting/AssociateReporting";
import Department from "./department/Department";
import Designation from "./designation/Designation";
import HeadOffice from "./headOffice/HeadOffice";
import "./Master.css";
import OnSite from "./onSite/OnSite";
import Organization from "./organization/Organization";

const tabs = [
  { key: "organization", label: "Organization" },
  { key: "department", label: "Department" },
  { key: "onSite", label: "On Site" },
  { key: "headOffice", label: "Head Office" },
  { key: "designation", label: "Designation" },
  { key: "associateReporting", label: "Associate Reporting" },
];

function Master() {
  const [activeTab, setActiveTab] = useState("associates");

  return (
    <div className="d-flex" style={{ minHeight: "80vh" }}>
      {/* Vertical Tabs */}
      <div className="nav flex-column nav-pills me-3 p-3 bg-light" style={{ width: "220px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`nav-link text-start mb-2 ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow-1 p-4 border rounded bg-white shadow-sm">
        {activeTab === "organization" && <Organization />}
        {activeTab === "department" && <Department />}
        {activeTab === "onSite" && <OnSite />}
        {activeTab === "headOffice" && <HeadOffice />}
        {activeTab === "designation" && <Designation />}
        {activeTab === "associateReporting" && <AssociateReporting />}
      </div>
    </div>
  );
}

export default Master;
