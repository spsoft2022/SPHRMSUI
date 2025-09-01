import React, { useEffect, useState } from "react";
import CustomTable from "../../shared/customtable/CustomTable";
function Organization() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    "orgId",
    "name",
    "establishmentDate",
    "address",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/associates/organizations"); // backend API
        const result = await response.json();

        if (!result.isError && Array.isArray(result.result)) {
          setData(result.result);
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Organization</h3>
      <CustomTable columns={columns} data={data} />
    </div>
  );
}

export default Organization;
