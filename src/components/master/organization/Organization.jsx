import React from "react";

function Organization() {
  const columns = [
    "Organization Id",
    "Organization Name",
    "Establishment Date",
    "Address",
  ];

  return (
    <div className="container mt-3">
      <h3>Organization</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length} className="text-center">
              No Data Available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Organization;
