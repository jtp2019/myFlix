import React, { useState } from "react";
import axios from "axios";
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/*sources of Bootstrap code*/
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

/*sources of all Individual files and folders*/
import "./registration-view.scss";

export function RegistrationView() {
  const [name, createName] = useState('');
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  // const handleSubmit = () => {
  //  e.preventDefault();
  //   console.log(username, password);
  //   props.onLoggedIn(username,password);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://rhubarb-crisp-92657.herokuapp.com/users', {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
      .then((response) => {
        const { data } = response;
        console.log(data);
        window.open('/', '_self'); // with '_self' page will open in the current tab
      })
      .catch((error) => {
        console.log('error registering the user'+ error);
      });
  };

  return (
    <Container className="registrationForm">
      <Card className="registration-card">
        <h2 className="registration-title">Sign Up</h2>
        <Form>
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
               type="current-password"
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
     </Card>
    </Container>
   )
  }
