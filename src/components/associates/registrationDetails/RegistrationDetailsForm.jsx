import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonComponent from "../../shared/ButtonComponent";
import InputField from "../../shared/InputField";
import RadioGroup from "../../shared/RadioGroup";
import SelectField from "../../shared/SelectField";

function RegistrationDetailsForm() {
  const [formData, setFormData] = useState({
    associateNo: "",
    maritalStatus: "Single",
    panNo: "",
    uanNo: "",
    emergencyContact1: "",
    emergencyContact2: "",
    bloodGroup: "",
    bankAccount: "",
    mobile: "",
    aadhaar: "",
    insuranceNo: "",
    pfNo: "",
    esicNo: "",
    relation1: "",
    relationName1: "",
    relation2: "",
    relationName2: "",
    designation: "",
    revision: "",
    ctc: "",
    permanentAddress: "",
    presentAddress: "",
  });

  const [associateNo, setAssociateNo] = useState("");
  const [designations, setDesignations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isAssociateValid, setIsAssociateValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch designations & associates
  const fetchDesignations = async () => {
    try {
      const [designationsRes, associatesRes] = await Promise.all([
        axios.get("http://localhost:5000/associates/designations"),
        axios.get("http://localhost:5000/associates/allAssociates"),
      ]);

      if (designationsRes.status === 200) {
        setDesignations(designationsRes.data.result || []);
      }
      if (associatesRes.status === 200) {
        // not used directly, but could be for caching
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch registration by associateNo
  const fetchRegistration = async (associateNo) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/associates/registration/${associateNo}`
      );
      if (res.status === 200 && res.data) {
        toast.info(" Registration data already exists. You can update it.");
        setFormData({ associateNo, ...res.data });
        setIsAssociateValid(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setFormData((prev) => ({ ...prev, associateNo }));
        setIsAssociateValid(true);
      } else {
        console.error("Error fetching registration:", err);
      }
    }
  };

  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAssociateNo(value);
    setIsAssociateValid(false);
  };

  const fetchAssociates = async (number) => {
    if (!number) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/associates/search/${number}`
      );
      if (response.status === 200) {
        setSuggestions(response.data);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (associateNo) {
      fetchAssociates(associateNo);
    } else {
      setSuggestions([]);
    }
  }, [associateNo]);

  const handleSelectAssociate = (assoc) => {
    setAssociateNo(assoc.associateNo);
    setSuggestions([]);
    document.activeElement.blur();
    fetchRegistration(assoc.associateNo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/associates/registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(" Registration saved successfully");
        console.log("Saved data:", result.data);
      } else {
        toast.error(` Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(" Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Associate Registration</h3>
      <Form onSubmit={handleSubmit}>
        {/* Associate No with Suggestions */}
        <Row>
          <Col md={4} className="position-relative">
            <InputField
              label="Associate No"
              type="text"
              name="associateNo"
              value={associateNo}
              onChange={handleAssociateChange}
              placeholder="Enter Associate No"
              required
            />
            {suggestions.length > 0 && (
              <ListGroup
                className="position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((assoc) => (
                  <ListGroup.Item
                    key={assoc._id}
                    action
                    onClick={() => handleSelectAssociate(assoc)}
                  >
                    {assoc.associateNo} - {assoc.initiation?.fullName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <RadioGroup
              label="Marital Status"
              name="maritalStatus"
              options={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
              ]}
              selectedValue={formData.maritalStatus}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <SelectField
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={[
                "A+",
                "A-",
                "B+",
                "B-",
                "O+",
                "O-",
                "AB+",
                "AB-",
              ].map((g) => ({ label: g, value: g }))}
            />
          </Col>
        </Row>

        {/* PAN / Aadhaar / UAN */}
        <Row>
          <Col md={4}>
            <InputField
              label="PAN No"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              placeholder="Enter PAN"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Enter Aadhaar"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="UAN No"
              name="uanNo"
              value={formData.uanNo}
              onChange={handleChange}
              placeholder="Enter UAN"
            />
          </Col>
        </Row>

        {/* PF / ESIC / Insurance */}
        <Row>
          <Col md={4}>
            <InputField
              label="PF No"
              name="pfNo"
              value={formData.pfNo}
              onChange={handleChange}
              placeholder="Enter PF"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="ESIC No"
              name="esicNo"
              value={formData.esicNo}
              onChange={handleChange}
              placeholder="Enter ESIC"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Insurance No"
              name="insuranceNo"
              value={formData.insuranceNo}
              onChange={handleChange}
              placeholder="Enter Insurance"
            />
          </Col>
        </Row>

        {/* Bank / Mobile / Designation */}
        <Row>
          <Col md={4}>
            <InputField
              label="Bank Account"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              placeholder="Enter Bank Account"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile"
            />
          </Col>
          <Col md={4}>
            <SelectField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              options={designations.map((d) => ({
                label: d.name,
                value: d.name,
              }))}
            />
          </Col>
        </Row>

        {/* Emergency Contacts */}
        <Row>
          <Col md={4}>
            <InputField
              label="Emergency Contact 1"
              name="emergencyContact1"
              value={formData.emergencyContact1}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Relation"
              name="relation1"
              value={formData.relation1}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Relation Name"
              name="relationName1"
              value={formData.relationName1}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Emergency Contact 2 */}
        <Row>
          <Col md={4}>
            <InputField
              label="Emergency Contact 2"
              name="emergencyContact2"
              value={formData.emergencyContact2}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Relation"
              name="relation2"
              value={formData.relation2}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Relation Name"
              name="relationName2"
              value={formData.relationName2}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Revision / CTC / Address */}
        <Row>
          <Col md={4}>
            <SelectField
              label="Revision Month"
              name="revision"
              value={formData.revision}
              onChange={handleChange}
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m) => ({ label: m, value: m }))}
            />
          </Col>
          <Col md={4}>
            <InputField
              label="CTC"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
              placeholder="Enter CTC"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter Permanent Address"
              as="textarea"
              rows={2}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <InputField
              label="Present Address"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              placeholder="Enter Present Address"
              as="textarea"
              rows={2}
            />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <ButtonComponent
            variant="secondary"
            type="button"
            onClick={() => {
              setFormData({
                associateNo: "",
                maritalStatus: "Single",
                panNo: "",
                uanNo: "",
                emergencyContact1: "",
                emergencyContact2: "",
                bloodGroup: "",
                bankAccount: "",
                mobile: "",
                aadhaar: "",
                insuranceNo: "",
                pfNo: "",
                esicNo: "",
                relation1: "",
                relationName1: "",
                relation2: "",
                relationName2: "",
                designation: "",
                revision: "",
                ctc: "",
                permanentAddress: "",
                presentAddress: "",
              });
              toast.info("Form has been reset");
            }}
            label="Reset"
          />
          <ButtonComponent
            variant="primary"
            type="submit"
            disabled={loading}
            label={loading ? "Saving..." : "Save / Update"}
          />
        </div>
      </Form>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default RegistrationDetailsForm;
