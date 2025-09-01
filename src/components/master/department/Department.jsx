import React, { useEffect, useState } from "react";
import CustomTable from "../../shared/customtable/CustomTable";
 
function Department() {
  const [data, setData] = useState([]);
  const columns = [
      { field: "deptId", label: "Department Id" },
      { field: "code", label: "Department Code" },
      { field: "name", label: "Department Name" },
      { field: "departmentHead", label: "Department Head" }
    ];
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/associates/departments");
        const result = await response.json();
 
        console.log("API Result:", result);
 
        if (result.success && Array.isArray(result.data)) {
          const filtered = result.data.map((dept) => ({
            deptId: dept.deptId,
            code: dept.code,
            name: dept.name,
           departmentHead: "Admin HR",
          }));
 
          console.log("Filtered Data:", filtered);
          setData(filtered);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
 
    fetchData();
  }, []);
 
  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    // open modal or navigate to edit page
  };
 
  return (
    <div className="container mt-3">
      <h3>Department</h3>
      <CustomTable columns={columns} data={data} onEdit={handleEdit} />
    </div>
  );
}
 
export default Department;
 
 
 
 