import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "./registration-view.scss";

export function RegistrationView() {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleSubmit = () => {
    console.log(username, password);
    props.onRegister(username);
  }

    return (
       <Container className="registrationContainer">
           <Form className="registrationForm">
           <Form.Group controlId="formBasicName">
             <Form.Label>Name</Form.Label>
             <Form.Control
               type="text"
               placeholder="Name"
               value={name}
               onChange={(e) => createName(e.target.value)}
             />
           </Form.Group>

           <Form.Group controlId="formBasicUsername">
             <Form.Label>Username</Form.Label>
             <Form.Control
               type="text"
               placeholder="Username"
               value={username}
               onChange={(e) => createUsername(e.target.value)}
             />
           </Form.Group>

           <Form.Group controlId="formBasicEmail">
             <Form.Label>Email address</Form.Label>
             <Form.Control
               type="email"
               placeholder="Enter email"
               value={email}
               onChange={(e) => createEmail(e.target.value)}
             />
             <Form.Text className="text-muted">
               We will never share your email with anyone else.
             </Form.Text>
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
             <Form.Label>Password</Form.Label>
             <Form.Control
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => createPassword(e.target.value)}
             />
           </Form.Group>

           <Form.Group controlId="formBasicDob">
             <Form.Label>Date of Birth</Form.Label>
             <Form.Control
               type="date"
               placeholder="01/01/1970"
               value={birthday}
               onChange={(e) => createDob(e.target.value)}
             />
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
