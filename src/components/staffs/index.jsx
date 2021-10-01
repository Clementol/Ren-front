import React from "react";
import { useQuery } from "react-query";
import axios from "../../helpers/axios";
import { VscChevronLeft, VscChevronRight, VscEdit, VscTrash } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";

import { Alert, CircularProgress } from "@mui/material";
import EditStaffModal from "./UpdateModal";
import RemoveStaffModal from "./DeleteModal";
import AddStaffModal from "./AddModal";
import { Button, ProgressBar } from "react-bootstrap";
import Paginate from "react-paginate";
import _ from "lodash";
import "./index.css";

export default function Staffs() {
  const [staffs, setStaffs] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [paginatedStaffs, setPaginatedStaffs] = React.useState([]);
  // const [currentPage, setCurrentPage] = React.useState(1);

  let pageSize = 10;

  // Add Modal
  const handleAddClose = () => setShowAddModal(false);

  // Edit Modal
  const handleClose = () => {
    setSelectedStaff(null);
    setShowEditModal(false);
  };
  const handleShow = () => setShowEditModal(true);

  // Delete Modal
  const handleDeleteClose = () => {
    setSelectedStaff(null);
    setShowDeleteModal(false);
  };

  const handleShowDelete = () => setShowDeleteModal(true);

  const fectchStaffs = async () => {
    const { data } = await axios.get("/all");
    return data;
  };
  const res = useQuery("staffs", fectchStaffs, {
    onSuccess: (data) => {
      setStaffs(data.staffs);
    },
  });

  React.useEffect(() => {
    fectchStaffs();
    setPaginatedStaffs(_(staffs).slice(0).take(pageSize).value());
  }, [staffs, pageSize]);

  // console.log(staffs);
  const updateStaffModal = (staff) => {
    setSelectedStaff(staff);
    handleShow();
  };

  const deleteStaffModal = (staff) => {
    setSelectedStaff(staff);
    handleShowDelete();
  };

  const pageCount = staffs ? Math.ceil(staffs.length / pageSize) : 0;
  // if (pageCount === 1) return null;

  const pagination = (pageNo) => {
  
    const startIndex = pageNo.selected * pageSize;
    const paginatedStaffs = _(staffs).slice(startIndex, startIndex + pageSize).take(pageSize).value();
    // console.log(staffs);
    setPaginatedStaffs(paginatedStaffs);
  };
  return (
    <>
      <EditStaffModal
        staff={selectedStaff}
        show={showEditModal}
        setShowEditModal={setShowEditModal}
        handleClose={() => handleClose}
      />
      <RemoveStaffModal
        staff={selectedStaff}
        show={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleClose={() => handleDeleteClose}
      />
      <AddStaffModal
        show={showAddModal}
        setShowAddModal={setShowAddModal}
        handleClose={() => handleAddClose}
      />

      <div className="">
        <div
          className="d-flex action"
          style={{
            justifyContent: "space-between",
            margin: "2rem 3rem",
            marginTop: "5rem",
          }}
        >
          <input
            type="text"
            placeholder="search..."
            className="form-control"
            style={{ width: "40%" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            // value={searchTerm}
          />
          {
            staffs.length ? (
              <span style={{ color: "blue" }}>
                {" "}
                <FiUsers style={{ fontSize: 24 }} /> {staffs.length}
              </span>
            ) : null
            // </Badge>
          }
          <Button
            variant="primary"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            Add Staff
          </Button>
        </div>
        {res.error ? (
          <Alert style={{ left: "50%" }} severity="error">
            {res.error.message}
          </Alert>
        ) : null}
        {res.isFetching ? <ProgressBar animated now={100} /> : null}

        <div
          className="table-responsive "
          style={{ position: "static", padding: "0rem 2rem" }}
        >
          <table className="table table-striped mydatatable">
            <thead>
              <tr>
               
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Position</th>
                <th scope="col">Department</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {res.isLoading ? (
                <>
                <span>
                   <CircularProgress />
                 </span>
                </>
                  
              ) : paginatedStaffs ? (
                // empty staff here
                paginatedStaffs //search staff
                  .filter((staff) => {
                    if (searchTerm === "") {
                      return staff;
                    } else if (
                      staff.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      staff.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      staff.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      // setPaginatedStaffs(staff)
                      return staff;
                    } else return null;
                  })
                  .map((staff, index) => (
                    <tr key={index}>
                      {/* <th scope="row">{index + 1}</th> */}
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
              ) : null}
            </tbody>
          </table>
        </div>
        <nav style={{ zIndex: -1, justifyContent: 'space-evenly' }} className="d-flex" >
        {paginatedStaffs.length > 0 ? <p>Showing {paginatedStaffs.length} of {staffs.length} entries</p> : null}

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
        </nav>

      </div>
    </>
  );
}

