import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/*sources of Bootstrap code*/
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

/*sources of all Individual files and folders*/
import "./login-view.scss";

export const LoginView = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

//Added 'https://cors-anywhere.herokuapp.com/' to fix core policy problem
//let loginUrl = "https://cors-anywhere.herokuapp.com/https://rhubarb-crisp-92657.herokuapp.com/login";

const handleSubmit = (e) => {
  e.preventDefault();
// Send a request to the server for authentication
  axios({
    method: 'post',
    url: 'https://cors-anywhere.herokuapp.com/https://rhubarb-crisp-92657.herokuapp.com/login',
    params: {
      Username: username,
      Password: password
    },
  })
    .then((response) => {
      const { data } = response.data;
      // This method triggers onLoggedIn method in Mainview and updates user state
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user'+ e);
    });
};

  return (
    <Container className="login-form">
      <Card className="login-card">
        <h2 className="login-title">Login</h2>

      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="current-password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

          <Form.Group controlId="newUser">
          <Form.Text>
           No Account? Sign up for a new account
                    New user? Sign up for an account <a href="#" onClick={() => props.onClick()}>HERE</a>                     New user? Sign up for a new account <a href="#" onClick={() => props.onClick()}>HERE</a>
                 </Form.Text>
                </Form.Group>
               </Form>
             </Card>
           </Container>
         )
       }

       LoginView.propTypes = {
         onLoggedIn: PropTypes.func.isRequired
       }
