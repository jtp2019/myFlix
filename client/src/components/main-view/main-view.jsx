import React, { Component } from "react";
import axios from "axios";
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/*sources of Bootstrap code*/
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/Navbar';

/*sources of all Individual files and folders*/
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
//import { RegistrationView } from "../registration-view/registration-view";
//import { DirectorView } from '../director-view/director-view';
//import { GenreView } from '../genre-view/genre-view';
//import { ProfileView } from '../profile-view/profile-view';


export class MainView extends Component {
  constructor() {
    /* Call the superclass constructor so React can initialize it */
    super();
    /* Initialize the state to an empty object so we can destructure it later */
    this.state = {
      movies: [],
      user: null,
      register: false
    };
  }
//The server generates a token for the logged in user and sends it back with the response

   getMovies = (token) => {
     const endpoint = "https://cors-anywhere.herokuapp.com/https://rhubarb-crisp-92657.herokuapp.com/movies";
     axios.get(endpoint, {
       headers: { Authorization: `Bearer ${token}` }
     })
       .then(response => {
         this.setState({
           movies: response.data,
         });
       })
       .catch(error => {
         console.log(error);
       });
   }

 //To get the value of the token from localStorage
   componentDidMount = () => {
     let accessToken = localStorage.getItem('token');
     if (accessToken !== null) {
       this.setState({
         user: localStorage.getItem('user'),
         userData: localStorage.getItem('data')
       });
       this.getMovies(accessToken);
     }
   }

   onMovieClick = (movie) => {
     this.setState({
       selectedMovie: movie
     });
   }

   //This authdata method will allow us to stay logged in and will help us implement and
   //  test the client-side app routing later on in this Exercise (updated onLoggedin)
   //
   //   onLoggedIn(user) {
   //     this.setState({
   //       user,
   //     });
   //   }
   //

   onLoggedIn = (authData) => {
     this.setState({
       user: authData.user.Username
     });

     localStorage.setItem('token', authData.token);
     localStorage.setItem('user', authData.user.Username);
     this.getMovies(authData.token);
   }

 //To delete the token and the user from localStorage
   onLogOut = () => {
     this.setState({
       user: null,
       register: null
     });

     localStorage.removeItem('token');
     localStorage.removeItem('user');
   }

  /* This overrides the render() method of the superclass, No need to call super() though, as it does nothing by default */

  render() {
  const { movies, user } = this.state;
  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  if (!movies) return <div className="main-view"/>;


    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                previous={(movie) => this.onMovieClick(!movie)}
              />
            ) : (
                movies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    click={(movie) => this.onMovieClick(movie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>

      </div>
    );
  }
}
