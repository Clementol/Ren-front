import { Alert } from "@mui/material";
import React from "react";
// import { useForm } from "react-hook-form";
import { Form, Modal, Row, Col, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../helpers/axios";
import { positions, departments } from "../data";

const EditStaffModal = ({ show, handleClose, staff, setShowEditModal }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [succMsg, setSuccMsg] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const queryClent = useQueryClient();

  const mutateUpdateStaff = useMutation(
    async (data) => {
      const { id, lastName, firstName, email, position, department } = data;
      const userData = { lastName, firstName, email, position, department };
      await axios.put(`/update/${id}`, userData);
    },
    {
      onError: (e) => {
        // console.log(e);
        setErrMsg(e.response.data.error);
      },
      onSuccess: () => {
        queryClent.invalidateQueries(["staffs"]);
        setSuccMsg(true);
      },
    }
  );

  const updateStaff = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccMsg(false);
    let data = {
      id: staff.id,
      lastName,
      firstName,
      email,
      position,
      department,
    };

    mutateUpdateStaff.mutate(data);
  };
  const cancel = () => {
    setShowEditModal(false);
    setErrMsg("");
    setSuccMsg(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPosition("");
    setDepartment("");
  };
  // console.log(staff)

  if (!staff) {
    return null;
  }
  return (
    <Modal show={show} onHide={cancel}>
      <Form onSubmit={updateStaff}>
        <Modal.Header closeButton>
          <Modal.Title>Update Staff</Modal.Title>
        </Modal.Header>
        {succMsg ? <Alert severity="success">Updated</Alert> : null}

        {errMsg ? <Alert severity="error">{errMsg}</Alert> : null}
        <Modal.Body>
          <Row className="mb-11" style={{ marginBottom: "9px" }}>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder={staff.firstName}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasiclastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder={staff.lastName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-11" style={{ marginBottom: "9px" }}>
            <Col md={11}>
              <Form.Group className="mb-3" controlId="formBasicemail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder={staff.email}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-11">
            <Col md={6}>
              <Form.Label>Position</Form.Label>
              <Form.Select
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select option</option>
                {positions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Department</Form.Label>
              <Form.Select
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select option</option>
                {departments.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={mutateUpdateStaff.isLoading}
            variant="primary"
            onClick={updateStaff}
          >
            {mutateUpdateStaff.isLoading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditStaffModal;
