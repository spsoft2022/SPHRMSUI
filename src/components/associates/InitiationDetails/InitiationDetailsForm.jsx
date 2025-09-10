import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import ButtonComponent from "../../shared/ButtonComponent";
import CheckboxGroup from "../../shared/CheckboxGroup";
import InputField from "../../shared/InputField";
import RadioGroup from "../../shared/RadioGroup";
import SelectField from "../../shared/SelectField";
import "./InitiationDetailsForm.css";

/**
 * This component handles the initiation details form.
 * @return {*}
 */
function InitiationDetailsForm() {
  const [formData, setFormData] = useState({
    associateNo: "",
    fullName: "",
    personalEmail: "",
    companyEmail: "",
    gender: "Male",
    dateOfBirth: "",
    dateOfJoining: "",
    role: "",
    joiningDesignation: "",
    joiningCTC: "",
    currentStatus: "Active",
    employmentType: "",
    department: "",
    reportingAssociate: "",
    client: "",
    headOffice: "",
    sites: [],
  });

  const [selectOptions, setSelectOptions] = useState({
    designations: [],
    departments: [],
    clients: [],
    headOffices: [],
    sites: [],
    filteredReportingAssociates: [],
    allAssociates: [],
  });

  const [isRoleEnabled, setIsRoleEnabled] = useState(false);

  /**
   * Fetch all initial data on component mount
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [associatesRes, sitesRes, departmentsRes, designationsRes] = await Promise.all([
          axios.get("http://localhost:5000/associates/allAssociates"),
          axios.get("http://localhost:5000/associates/sites"),
          axios.get("http://localhost:5000/associates/departments"),
          axios.get("http://localhost:5000/associates/designations"),
        ]);

        setSelectOptions((prev) => ({
          ...prev,
          allAssociates: associatesRes.data.data || [],
          sites: sitesRes.data.result || [],
          departments: departmentsRes.data.data || [],
          designations: designationsRes.data.result || [],
        }));

        const sitesResult = sitesRes.data.result || [];
        const siteStatus = sitesResult.reduce(
          (acc, site, index) => ({
            ...acc,
            [site.siteName.toLowerCase()]: index === 0, // Set the first one to true, others to false
          }),
          {}
        );

        setFormData((prev) => ({ ...prev, ...siteStatus }));
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };
    fetchInitialData();
  }, []);

  /**
   * Fetch dynamic options based on employmentType
   */
  useEffect(() => {
    const fetchDynamicOptions = async () => {
      if (formData.employmentType === "OnSite") {
        try {
          const res = await axios.get("http://localhost:5000/api/clients");
          setSelectOptions((prev) => ({ ...prev, clients: res.data.result || [] }));
          setFormData((prev) => ({ ...prev, headOffice: "", client: "" }));
        } catch (err) {
          console.error("Error fetching clients:", err);
        }
      } else if (formData.employmentType === "OffShore") {
        try {
          const res = await axios.get("http://localhost:5000/associates/headOffices");
          setSelectOptions((prev) => ({ ...prev, headOffices: res.data.result || [] }));
          setFormData((prev) => ({ ...prev, client: "", headOffice: "" }));
        } catch (err) {
          console.error("Error fetching head offices:", err);
        }
      } else {
        setSelectOptions((prev) => ({ ...prev, clients: [], headOffices: [] }));
      }
    };
    fetchDynamicOptions();
  }, [formData.employmentType]);

  /**
   * Use a new useEffect to call the API when the department changes
   */
  useEffect(() => {
    if (formData.department) {
      axios
        .get(`http://localhost:5000/associates/departments/${formData.department}`)
        .then((res) => {
          setSelectOptions((prev) => ({
            ...prev,
            filteredReportingAssociates: res.data.data || [],
          }));
        })
        .catch((err) => {
          console.error("Error fetching department details:", err);
          setSelectOptions((prev) => ({ ...prev, filteredReportingAssociates: [] }));
        });
    } else {
      setSelectOptions((prev) => ({ ...prev, filteredReportingAssociates: [] }));
    }
  }, [formData.department]);

  /**
   * Updates form state based on input, handling checkboxes and enabling role field if 'employmentType' is set.
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        // Create a copy of the sites array to avoid direct mutation
        let updatedSites = [...prevData.sites];

        if (checked) {
          // Add the name of the checked checkbox to the array
          updatedSites.push(name);
        } else {
          // Remove the name of the unchecked checkbox from the array
          updatedSites = updatedSites.filter((siteName) => siteName !== name);
        }

        return {
          ...prevData,
          sites: updatedSites,
        };
      });
    } else {
      // For non-checkbox inputs, handle as before
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Your existing logic for role enablement
    if (name === "employmentType" && value !== "") {
      setIsRoleEnabled(true);
    }
  };

  /**
   * Validates form, submits data via API, and resets on success.
   * @param {*} e
   * @returns
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define an array of required fields
    const requiredFields = [
      "associateNo",
      "fullName",
      "personalEmail",
      "companyEmail",
      "dateOfBirth",
      "dateOfJoining",
      "role",
      "joiningDesignation",
      "joiningCTC",
      "employmentType",
      "department",
    ];

    // Check for empty fields and show a toast message
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the '${field}' field.`);
        return; // Stop execution if a required field is empty
      }
    }

    // Special handling for client/headOffice based on employmentType
    if (formData.employmentType === "OnSite" && !formData.client) {
      toast.error("Please select a Client.");
      return;
    }
    if (formData.employmentType === "OffShore" && !formData.headOffice) {
      toast.error("Please select a Head Office.");
      return;
    }

    // If all validations pass, proceed with API call
    console.log("Initiation Form Data:", formData);
    try {
      const response = await axios.post("http://localhost:5000/associates/viewAllAssociates", formData);
      console.log("Data saved successfully:", response.data);
      toast.success("Form submitted successfully!");

      // Clear the form after success
      setFormData({
        associateNo: "",
        fullName: "",
        personalEmail: "",
        companyEmail: "",
        gender: "Male",
        dateOfBirth: "",
        dateOfJoining: "",
        role: "",
        joiningDesignation: "",
        joiningCTC: "",
        currentStatus: "Active",
        employmentType: "",
        department: "",
        reportingAssociate: "",
        client: "",
        headOffice: "",
        sites: [],
      });

      // also reset role enablement
      setIsRoleEnabled(false);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    }
  };

  /**
   * Disables the reporting associate field if the role is Manager/HOD/AVP/VP/Director.
   */
  const isReportingAssociateDisabled = formData.role === "Manager/HOD/AVP/VP/Director";

  /**
   * Gender options for selection (Male/Female).
   */
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  /**
   * Current status options (Active/Inactive).
   */
  const currentStatusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  /**
   * Employment type options (OnSite/OffShore).
   */
  const employmentTypeOptions = [
    { label: "OnSite", value: "OnSite" },
    { label: "OffShore", value: "OffShore" },
  ];

  /**
   * Department options mapped from selectOptions.
   */
  const departmentOptions = selectOptions.departments.map((dept) => ({
    label: dept.name,
    value: dept.deptId,
  }));

  /**
   * Role options based on employment type (Associate for OnSite, multiple roles for OffShore).
   * @returns
   */
  const roleOptions = () => {
    if (formData.employmentType === "OnSite") {
      return [{ label: "Associate", value: "Associate" }];
    }
    if (formData.employmentType === "OffShore") {
      return [
        { label: "Associate", value: "Associate" },
        { label: "HR", value: "Admin-HR" },
        { label: "Manager/HOD/AVP/VP/Director", value: "Manager/HOD/AVP/VP/Director" },
      ];
    }
    return [];
  };

  /**
   * Joining designation options mapped from selectOptions.
   */
  const joiningDesignationOptions = selectOptions.designations.map((designation) => ({
    label: designation.name,
    value: designation.name,
  }));

  /**
   * Client options mapped from selectOptions.
   */
  const clientOptions = (selectOptions.clients || []).map((client) => ({
    label: client.clientName,
    value: client.clientName,
  }));

  /**
   * Head office options mapped from selectOptions (name and location).
   */
  const headOfficeOptions = (selectOptions.headOffices || []).map((office) => ({
    label: `${office.headOfficeName} - ${office.headOfficeLocation}`,
    value: `${office.headOfficeName}-${office.headOfficeLocation}`,
  }));

  /**
   * Default reporting associate options (just Admin-HR).
   */
  const reportingAssociateOptions = [{ label: "Admin-HR", value: "Admin-HR" }];

  /**
   * Resets the form data and clears the dropdown options.
   */
  const handleReset = () => {
    // Reset all form fields to their initial empty or default values
    setFormData({
      associateNo: "",
      fullName: "",
      personalEmail: "",
      companyEmail: "",
      gender: "Male",
      dateOfBirth: "",
      dateOfJoining: "",
      role: "",
      joiningDesignation: "",
      joiningCTC: "",
      currentStatus: "Active",
      employmentType: "",
      department: "",
      reportingAssociate: "",
      client: "",
      headOffice: "",
      sites: [],
    });

    // Reset the options arrays to empty to hide data from dropdowns
    setSelectOptions((prev) => ({
      ...prev,
      clients: [],
      headOffices: [],
      filteredReportingAssociates: [],
    }));

    // Reset role enablement
    setIsRoleEnabled(false);
  };

  return (
    <div>
      <h4 className="mb-3">Initiation Details</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <InputField
              label="Associate No"
              type="number"
              name="associateNo"
              value={formData.associateNo}
              onChange={handleChange}
              placeholder="Enter Associate ID"
              required
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Company Email ID"
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              placeholder="name@company.com"
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <InputField
              label="Personal Email ID"
              type="email"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              placeholder="name@domain.com"
              required
            />
          </Col>
          <Col md={4}>
            <RadioGroup
              label="Gender"
              name="gender"
              options={genderOptions}
              selectedValue={formData.gender}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <InputField
              label="Date of Joining"
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <RadioGroup
              label="Current Status"
              name="currentStatus"
              options={currentStatusOptions}
              selectedValue={formData.currentStatus}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              options={employmentTypeOptions}
              placeholder="Select Employment Type"
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <SelectField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions()}
              placeholder="Select Role"
              disabled={!isRoleEnabled}
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              options={departmentOptions}
              placeholder="Select Department"
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Reporting Associate"
              name="reportingAssociate"
              value={formData.reportingAssociate}
              onChange={handleChange}
              options={reportingAssociateOptions}
              placeholder="Select Reporting Associate"
              disabled={isReportingAssociateDisabled || formData.employmentType !== "OffShore"}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <SelectField
              label="Joining Designation"
              name="joiningDesignation"
              value={formData.joiningDesignation}
              onChange={handleChange}
              options={joiningDesignationOptions}
              placeholder="Select Designation"
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              options={clientOptions}
              placeholder="Select Client"
              disabled={formData.employmentType !== "OnSite"}
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Head Office"
              name="headOffice"
              value={formData.headOffice}
              onChange={handleChange}
              options={headOfficeOptions}
              placeholder="Select Head Office"
              disabled={formData.employmentType !== "OffShore"}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <InputField
              label="Joining CTC"
              type="number"
              name="joiningCTC"
              value={formData.joiningCTC}
              onChange={handleChange}
              placeholder="Enter Joining CTC"
            />
          </Col>
          <Col md={4}>
            <CheckboxGroup label="Select" sites={selectOptions.sites} formData={formData} onChange={handleChange} />
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <ButtonComponent type="reset" variant="danger" label="RESET" className="me-2" onClick={handleReset} />
          <ButtonComponent type="submit" variant="primary" label="CREATE" />
        </div>
      </Form>
    </div>
  );
}

export default InitiationDetailsForm;
