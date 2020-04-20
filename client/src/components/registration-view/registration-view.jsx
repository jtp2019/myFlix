import React, { useState } from "react";
import PropTypes from 'prop-types';

/*sources of Bootstrap code*/
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/*sources of all Individual files and folders*/
import "./registration-view.scss";

export const RegistrationView = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDOB] = useState("");

  const handleSubmit = () => {
    console.log(username, password);
    props.onLoggedIn(username);
  }

  return (
    <Container className="registrationForm">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => createEmail(e.target.value)} />
          <Form.Text className="emailShare">
            We"ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check to see if you're not a robot" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Form.Text className="text-muted">
          Already have an account? Log in <a href="#" onClick={() => props.onClick()}>HERE</a>
        </Form.Text>
      </Form>
    </Container>
  )
}
