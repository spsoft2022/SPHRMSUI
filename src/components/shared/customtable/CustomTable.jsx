import React, { useState } from "react";
import "./CustomTable.css";
 
function CustomTable({ columns = [], data = [], onEdit, extraAction }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
 
  const recordsPerPage = 10;
  const normalizedColumns = columns.map((col) => (typeof col === "string" ? { field: col, label: col } : col));
  const showAction = typeof onEdit === "function";
 
  // Filtering
  let filteredData = data.filter((row) =>
    normalizedColumns.some((col) => row[col.field]?.toString().toLowerCase().includes(search.toLowerCase()))
  );
 
  // Sorting
  if (sortConfig.key) {
    filteredData = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
 
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === "asc"
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });
  }
 
  // Pagination
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
 
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
 
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: field, direction });
  };
 
  return (
    <div>
      {/* Search bar */}
      <div className="d-flex justify-content-end mb-2">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
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
              <th
                key={index}
                className="custom-thead"
                onClick={() => handleSort(col.field)}
                style={{ cursor: "pointer" }}
              >
                {col.label}{" "}
                {sortConfig.key === col.field ? (
                  sortConfig.direction === "asc" ? (
                    <i className="fa-solid fa-arrow-up ms-1 sort-icon active"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-down ms-1 sort-icon active"></i>
                  )
                ) : (
                  <i className="fa-solid fa-arrow-up ms-1 sort-icon"></i>
                )}
              </th>
            ))}
            {showAction && <th className="custom-thead text-end">Action</th>}
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
                  <td className="text-end">
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
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                « Previous
              </button>
            </li>
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
 
 