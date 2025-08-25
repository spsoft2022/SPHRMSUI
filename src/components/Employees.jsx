import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    emp_id: "",
    name: "",
    email: "",
    workLocation: "Spsoft",
    clientName: "",
    defaultPassword: "hrms123"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
const res = await axios.post("http://localhost:5000/api/employees/addEmployee", formData);
      alert(res.data.message);
      setFormData({
        emp_id: "",
        name: "",
        email: "",
        workLocation: "Spsoft",
        clientName: "",
        defaultPassword: "hrms123"
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-body d-flex">
        <Sidebar />
        <main className="app-content flex-grow-1 p-3">
          <h1>Employees</h1>

          <button
            className="btn btn-primary mb-3 mx-5"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add Employee"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="p-3 border rounded">
              <div className="mb-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Work Location</label>
                <select
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="inhouse">Inhouse</option>
                  <option value="client">Client</option>
                </select>
              </div>

              {formData.workLocation === "client" && (
                <div className="mb-3">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label>Default Password</label>
                <input
                  type="text"
                  name="defaultPassword"
                  value={formData.defaultPassword}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          )}
            <button
            className="btn btn-primary mb-3"
          >Import
          </button>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Employees;
