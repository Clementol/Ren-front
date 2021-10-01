import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../helpers/axios";
import { Alert } from "@mui/material";

const RemoveStaffModal = ({ show, handleClose, staff, setShowDeleteModal }) => {
  const [errMsg, setErrMsg] = React.useState(false);
  const [succMsg, setSuccMsg] = React.useState(false);

  const queryClent = useQueryClient();

  const mutateDeleteStaff = useMutation(
    async (id) => {
      await axios.delete(`/delete/${id}`);
    },
    {
      onError: () => {
        setErrMsg(true)
      },
      onSuccess: () => {
        setSuccMsg(true);
        queryClent.invalidateQueries(["staffs"]);
      },
    }
  );
  const deleteStaff = (id) => {
    setErrMsg(false)
    setSuccMsg(false)
    mutateDeleteStaff.mutate(id);
    // console.log(id);
  };

  const cancel = () => {
    setShowDeleteModal(false)
    setErrMsg(false)
    setSuccMsg(false)
  }

  if (!staff) {
    return null;
  }
  return (
    <>
      <Modal show={show} onHide={cancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Staff</Modal.Title>
        </Modal.Header>
        {succMsg ? (
          <Alert severity="success">Deleted</Alert>
        ) : (
          <>
            <Modal.Body>
              {errMsg ? (
                <Alert severity="error">{mutateDeleteStaff.error}</Alert>
              ): null}
              <Alert severity="warning">
                Are you sure you want to delete{" "}
                <span style={{ fontWeight: "bolder" }}>{staff.name}</span>?
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancel}>
                Cancel
              </Button>
              <Button
                disabled={mutateDeleteStaff.isLoading}
                variant="danger"
                onClick={() => deleteStaff(staff.id)}
              >
                {mutateDeleteStaff.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </Modal.Footer>{" "}
          </>
        )}
      </Modal>
    </>
  );
};

export default RemoveStaffModal;
