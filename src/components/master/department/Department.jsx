import React, { useEffect, useState } from "react";

import CustomTable from "../../shared/customtable/CustomTable";

function Department() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    code: "",
  });

  const columns = [
    { field: "deptId", label: "Department Id" },
    { field: "code", label: "Department Code" },
    { field: "name", label: "Department Name" },
  ];

  const fetchAllDepartments = async () => {
    try {
      const response = await fetch("http://localhost:5000/associates/departments");
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const filtered = result.data.map((dept) => ({
          deptId: dept.deptId,
          code: dept.code,
          name: dept.name,
        }));
        setData(filtered);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  // ✅ Handle edit (only update existing)
  const handleEdit = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/associates/departments/${row.deptId}`);
      const result = await response.json();

      if (!result.isError && result.result) {
        const dept = result.result;
        setEditingRow(dept.deptId);
        setFormValues({
          name: dept.name,
          code: dept.code,
        });
      } else {
        alert("Failed to fetch department details");
      }
    } catch (error) {
      console.error("Error fetching department by id:", error);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setIsAdding(false);
    setFormValues({ name: "", code: "" });
  };

  // ✅ Update Department
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/associates/departments/${editingRow}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!result.isError) {
        await fetchAllDepartments();
        setEditingRow(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  // ✅ Create Department (only code + name)
  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/associates/departments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!result.isError) {
        await fetchAllDepartments();
        handleCancel();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container mt-3">
      <h3>Department</h3>

      {/* Show Table if not editing/adding */}
      {!editingRow && !isAdding && (
        <CustomTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          createAction={
            <i
              className="fa-solid fa-user-plus p-2 rounded-3"
              style={{
                fontSize: "15px",
                backgroundColor: "#2199e8",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => {
                setIsAdding(true);
                setFormValues({ code: "", name: "" });
              }}
            ></i>
          }
        />
      )}

      {/* Show Form for Add/Edit */}
      {(editingRow || isAdding) && (
        <div className="mt-4 p-3 border rounded">
          <div className="row mb-3">
            <div className="col">
              <label>Department Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>Department Code</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={formValues.code}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={isAdding ? handleCreate : handleUpdate}
            >
              {isAdding ? "Create" : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Department;
