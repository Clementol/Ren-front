import React from "react";
import { useQuery } from "react-query";
import { axios } from "../../Helpers";
import { FiUsers } from "react-icons/fi";
import { Alert } from "@mui/material";
import {
  AddStaffModal,
  UpdateStaffModal,
  DeleteStaffModal,
} from "../Modals/Staffs";
import { Button, ProgressBar } from "react-bootstrap";
import _ from "lodash";
import "./ViewStaffs.css";
import StaffTable from "./StaffTable";

export default function ViewStaffs() {
  const [staffs, setStaffs] = React.useState([]);
  const [paginatedStaffs, setPaginatedStaffs] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("");

  let firstSn, lastSn, pageCount, pageNo=null, startIndex, lastIndex;

  const PAGE_SIZE = 10;

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
    return data.staffs;
  };
  const res = useQuery("staffs", fectchStaffs, {
    onSuccess: (data) => {
      // console.log(data.length)
      let dataExist = data.length > 0 ? data : [];
      updateStaffData(dataExist);
    },
  });

  const staffList = () => {
    if (searchTerm.length < 2) {
      return paginatedStaffs;
    }
    if (searchTerm.length >= 2) {
      return staffs.filter((staff) => {
        if (
          staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return staff;
        } else return null;
      });
    }
  };

  const updateStaffData = (staffs) => {
    const newArr = staffs.map((staff, index) => {
      return { ...staff, sn: index + 1 };
    });
    setStaffs(newArr);
    pageNo > 0
      ? setPaginatedStaffs(_(newArr).slice(startIndex, lastIndex).take(PAGE_SIZE).value())
      : setPaginatedStaffs(_(newArr).slice(0).take(PAGE_SIZE).value());
    console.log(paginatedStaffs)
  };

  // fectchStaffs();
  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [currentPage]);

  const pagination = ({ selected }) => {
    setCurrentPage(selected);
    pageNo = selected;
    startIndex = pageNo * PAGE_SIZE;
    lastIndex = startIndex + PAGE_SIZE;

    let _paginatedStaffs = _(staffs)
      .slice(startIndex, lastIndex)
      .take(PAGE_SIZE)
      .value();
    setPaginatedStaffs(_paginatedStaffs);
  };

  const updateStaffModal = (staff) => {
    setSelectedStaff(staff);
    handleShow();
  };

  const deleteStaffModal = (staff) => {
    setSelectedStaff(staff);
    handleShowDelete();
  };

  pageCount = staffs
    ? Math.ceil(
        searchTerm.length < 2
          ? staffs.length / PAGE_SIZE
          : staffList().length / PAGE_SIZE
      )
    : 0;

  if (staffList().length > 0) {
    firstSn = Object.values(staffList())[0].sn;
    lastSn = Object.values(staffList()).sort().reverse()[0].sn;
  }

  return (
    <>
      <UpdateStaffModal
        selectedStaff={selectedStaff}
        show={showEditModal}
        setShowEditModal={setShowEditModal}
        handleClose={() => handleClose}
      />
      <DeleteStaffModal
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
            name="searchTearm"
            placeholder="search..."
            className="form-control"
            style={{ width: "40%" }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
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

        <StaffTable
          res={res}
          staffs={staffs}
          staffList={staffList}
          searchTerm={searchTerm}
          lastSn={lastSn}
          firstSn={firstSn}
          pageCount={pageCount}
          pagination={staffList().length > 0 && pagination}
          deleteStaffModal={deleteStaffModal}
          updateStaffModal={updateStaffModal}
        />
      </div>
    </>
  );
}
