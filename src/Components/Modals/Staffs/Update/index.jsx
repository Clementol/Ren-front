import { Alert } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, Modal, Row, Col, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../../Helpers/axios";
import { positions, departments } from "../../../../Data/Staff";

const UpdateStaffModal = ({
  show,
  handleClose,
  selectedStaff,
  setShowEditModal,
}) => {
  
  const [succMsg, setSuccMsg] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedStaff,
  });

  const queryClent = useQueryClient();

  const mutateUpdateStaff = useMutation(
    async (data) => {
      // const { id, lastName, firstName, email, position, department } = data;
      // const userData = { lastName, firstName, email, position, department };
      await axios.put(`/update/${data.id}`, data);
    },
    {
      onError: (e) => {
        setErrMsg(e.response.data.error);
      },
      onSuccess: () => {
        queryClent.invalidateQueries(["staffs"]);
        setSuccMsg(true);
      },
    }
  );

  React.useEffect(() => {
    reset(selectedStaff);
  }, [reset, selectedStaff]);

  const updateStaff = (data) => {
    setErrMsg("");
    setSuccMsg(false);

    mutateUpdateStaff.mutate(data);
    // console.log(data);
  };
  const cancel = () => {
    setShowEditModal(false);
    setErrMsg("");
    setSuccMsg(false);
    reset(selectedStaff)
  };
  
  return (
    <Modal show={show} onHide={cancel}>
      <form onSubmit={handleSubmit(updateStaff)}>
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
                  // name="firstName"
                  {...register("firstName")}
                  // value={staff.firstName}
                  // onChange={)}
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
                  {...register("lastName")}
                  // value={lastName}
                  // onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  // placeholder={staff.lastName}
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
                  {...register("email")}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  // placeholder={staff.email}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-11">
            <Col md={6}>
              <Form.Label>Position</Form.Label>
              <Form.Select
                required
                {...register("position")}
                // value={position}
                // onChange={(e) => setPosition(e.target.value)}
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
                {...register("department")}
                // value={department}
                // onChange={(e) => setDepartment(e.target.value)}
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
          >
            {mutateUpdateStaff.isLoading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateStaffModal;
