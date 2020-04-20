import React, { Component } from "react";
import axios from "axios";

/*sources of Bootstrap code*/
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/*sources of all Individual files and folders*/
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends Component {
  constructor(props) {
    /* Call the superclass constructor so React can initialize it */
    super(props);
    /* Initialize the state to an empty object so we can destructure it later */
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false,
    };
  }

  componentDidMount() {
    const endpoint = "https://rhubarb-crisp-92657.herokuapp.com/movies";
<<<<<<< HEAD
    axios.get(endpoint)
      .then(res => {
=======
    axios
      .get(endpoint)
      .then((res) => {
>>>>>>> a5c0b001bc69364fba246718f4af493a398a30ef
        console.log(res.data[0]);
        this.setState({ movies: res.data });
      })
      .catch((err) => console.log(err));
  }

<<<<<<< HEAD

=======
  /*clicking movie to get more info*/
>>>>>>> a5c0b001bc69364fba246718f4af493a398a30ef
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

<<<<<<< HEAD
  onRegister = () => {
    if(!this.state.register){
      this.setState({register: true});
    }else{
      this.setState({register: false});
    }
  }

=======
  onRegister() {
    if (!this.state.register) {
      this.setState({ register: true });
    } else {
      this.setState({ register: false });
    }
  }

  /* This overrides the render() method of the superclass, No need to call super() though, as it does nothing by default */
>>>>>>> a5c0b001bc69364fba246718f4af493a398a30ef
  render() {
    const { movies, selectedMovie, user, register } = this.state;
<<<<<<< HEAD

    if (!user && !register) return <LoginView onClick={this.onRegister} onLoggedIn={user => this.onLoggedIn(user)} />
    if (register) return <RegistrationView  onClick={this.onRegister}  />
=======
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    if (register)
      return <RegistrationView onClick={this.onRegister.bind(this)} />;
    /* before the movies have been loaded */
>>>>>>> a5c0b001bc69364fba246718f4af493a398a30ef
    if (!movies) return <div className="main-view" />;

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
<<<<<<< HEAD
                movies.map(movie => (
                  <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard key={movie._id} movie={movie} click={movie => this.onMovieClick(movie)} />
                  </Col>
                ))
              )
            }
=======
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
>>>>>>> a5c0b001bc69364fba246718f4af493a398a30ef
          </Row>
        </Container>

      </div>
    );
  }
}
