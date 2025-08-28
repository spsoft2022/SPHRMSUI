import React, { useState } from "react";
import AssociateExitForm from "./associateExit/AssociateExitForm";
import FamilyDetailsForm from "./familyDetails/FamilyDetailsForm";
import EducationDetails from "./educationDetails/EducationDetails";
import EmploymentDetailsForm from "./employmentDetails/EmploymentDetailsForm";
import RegistrationDetailsForm from "./registrationDetails/RegistrationDetailsForm";
import InitiationDetailsForm from "./InitiationDetails/InitiationDetailsForm";
import AssociateDetails from "./associateDetails/AssociateDetails";

const tabs = [
  { key: "associates", label: "Associates" },
  { key: "initiation", label: "Initiation" },
  { key: "registration", label: "Registration" },
  { key: "employment", label: "Employment" },
  { key: "education", label: "Education" },
  { key: "family", label: "Family" },
  { key: "exit", label: "Associate Exit" },
];

function Associates() {
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
        {activeTab === "associates" && <AssociateDetails/>}
        {activeTab === "initiation" && <InitiationDetailsForm/>}
        {activeTab === "registration" && <RegistrationDetailsForm/>}
        {activeTab === "employment" && <EmploymentDetailsForm/>}
        {activeTab === "education" && <EducationDetails/>}
        {activeTab === "family" && <FamilyDetailsForm/>}
        {activeTab === "exit" && <AssociateExitForm/>}
      </div>
    </div>
  );
}

export default Associates;
