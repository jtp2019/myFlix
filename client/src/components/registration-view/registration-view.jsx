import React, { useState } from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "./registration-view.scss";

export const RegistrationView = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
    props.onRegister(username);
  };

  return (
    <Container className="registrationForm">
      <Card className="registration-card">
        <h2 className="registration-title">Register</h2>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="emailShare">
              We"ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={birthdate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
          <Form.Text className="text-muted">
            Already have an account? Log in{" "}
            <a href="#" onClick={() => props.onClick()}>
              HERE
            </a>
          </Form.Text>
        </Form>
      </Card>
    </Container>
  );
};

RegistrationView.PropTypes = {
  onRegister: PropTypes.func.isRequired,
};
