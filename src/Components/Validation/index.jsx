import React from "react";
import { Form } from "react-bootstrap";

export default function Validation({ error }) {
  return (
    <div>
      {error ? (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      ) : (
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      )}
    </div>
  );
}
