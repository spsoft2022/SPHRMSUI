import { useState } from "react";

import "./CustomTable.css";

function CustomTable({ columns = [], data = [], onEdit, extraAction }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const normalizedColumns = columns.map((col) => (typeof col === "string" ? { field: col, label: col } : col));
  // Filter rows based on search text
  const filteredData = data.filter((row) =>
    normalizedColumns.some((col) => row[col.field]?.toString().toLowerCase().includes(search.toLowerCase()))
  );
  const showAction = typeof onEdit === "function";

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {/* Header row with search bar aligned right */}
      {/* Header row with search bar aligned right and icon */}
      <div className="d-flex justify-content-end mb-2 align-items-center">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page after search
          }}
        />

        {/* User Plus Icon */}
        {extraAction && <div className="ms-2">{extraAction}</div>}
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            {normalizedColumns.map((col, index) => (
              <th key={index} className="custom-thead">
                {col.label}
              </th>
            ))}
            {showAction && <th className="custom-thead">Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={normalizedColumns.length + (showAction ? 1 : 0)} className="text-center">
                No Data Available
              </td>
            </tr>
          ) : (
            currentRecords.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {normalizedColumns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.field]}</td>
                ))}
                {showAction && (
                  <td className="text-center">
                    <i
                      className="fas fa-edit"
                      style={{ cursor: "pointer", color: "#2199e8" }}
                      onClick={() => onEdit(row)}
                    ></i>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <ul className="pagination">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                « Previous
              </button>
            </li>

            {/* Show only 4 page numbers at a time */}
            {(() => {
              const maxVisible = 4;
              const startPage = Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
              const endPage = Math.min(startPage + maxVisible - 1, totalPages);

              return [...Array(endPage - startPage + 1)].map((_, index) => {
                const pageNumber = startPage + index;
                return (
                  <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                    <button className="page-link" onClick={() => goToPage(pageNumber)}>
                      {pageNumber}
                    </button>
                  </li>
                );
              });
            })()}

            {/* Next Button */}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                Next »
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
