import { Alert } from "@mui/material";
import React from "react";
import { Form, Modal, Row, Col, Button } from "react-bootstrap";
import { useQueryClient, useMutation } from "react-query";
import axios from "../../../helpers/axios";
import { positions, departments } from "../data";

const AddStaffModal = ({ show, handleClose, setShowAddModal }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const [succMsg, setSuccMsg] = React.useState(false);

  const queryClent = useQueryClient();
  const mutateAddStaff = useMutation(
    async (data) => {
      await axios.post(`/add`, data);
    },
    {
      onError: (e) => {
        setErrMsg(e.response.data.error);
      },
      onSuccess: (data) => {
        setSuccMsg(true);
        queryClent.invalidateQueries(["staffs"]);
      },
    }
  );

  const addStaff = (e) => {
    e.preventDefault();
    setErrMsg("");
    setSuccMsg(false);
    let data = {
      firstName,
      lastName,
      email,
      position,
      department,
    };
    mutateAddStaff.mutate(data);
  };
  const cancel = () => {
    setShowAddModal(false);
    setErrMsg("");
    setSuccMsg(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPosition("");
    setDepartment("");
  };
  return (
    <Modal show={show} onHide={cancel}>
      <Form onSubmit={addStaff}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
        {succMsg ? <Alert severity="success">Added</Alert> : null}
        {errMsg ? <Alert severity="error">{errMsg}</Alert> : null}
        <Modal.Body>
          <Row className="mb-11">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
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
                  placeholder="Last Name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-11">
            <Col md={11}>
              <Form.Group className="mb-3" controlId="formBasicemail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
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
            disabled={mutateAddStaff.isLoading}
            variant="primary"
            type="submit"
            // onClick={addStaff}
          >
            {mutateAddStaff.isLoading ? "Adding..." : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddStaffModal;
