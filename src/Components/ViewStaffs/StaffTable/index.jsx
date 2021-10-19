import { CircularProgress } from "@mui/material";
import React from "react";
import Paginate from "react-paginate";
import {
  VscChevronLeft,
  VscChevronRight,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";

export default function StaffTable({
  res,
  staffList,
  staffs,
  searchTerm,
  firstSn,
  lastSn,
  updateStaffModal,
  pageCount,
  deleteStaffModal,
  pagination,
}) {
  return (
    <>
      <div
        className="table-responsive "
        style={{ position: "static", padding: "0rem 2rem" }}
      >
        <table className="table table-striped mydatatable">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {res.isLoading ? (
              <span>
                <CircularProgress />
              </span>
            ) : (
              staffList().map((staff, index) => (
                <tr key={index}>
                  <td>{staff.sn}</td>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.position}</td>
                  <td>{staff.department}</td>
                  <td>
                    <VscEdit
                      key={staff.id}
                      onClick={() => updateStaffModal(staff)}
                      style={{ cursor: "pointer" }}
                    />{" "}
                    |{" "}
                    <VscTrash
                      onClick={() => deleteStaffModal(staff)}
                      style={{ cursor: "pointer" }}
                    />{" "}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <nav
        style={{ zIndex: -1, justifyContent: "space-evenly" }}
        className="d-flex"
      >
        {(staffList().length > 0) & (searchTerm === "") ? (
          <p>
            Showing {firstSn} to {lastSn} of {staffs.length} Entries
          </p>
        ) : (staffList().length > 0) & (searchTerm !== "") ? (
          <p>
            Showing {staffList().length} results of {staffs.length} Entries
          </p>
        ) : (staffList().length < 1) & (staffs.length > 0) ? (
          <p>No matching Record</p>
        ) : (staffs.length < 1) & !res.isLoading ? (
          <p>No Data</p>
        ) : null}

        {staffList().length > 1 ? (
          <Paginate
            previousLabel={<VscChevronLeft />}
            nextLabel={<VscChevronRight />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={pagination}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        ) : null}
      </nav>
    </>
  );
}
