import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
/* Call the superclass constructor so React can initialize it */
    super();

/* Initialize the state to an empty object so we can destructure it later */
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

/* One of the "hooks" available in a React Component */
  componentDidMount() {
    axios.get('https://rhubarb-crisp-92657.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

/* This overrides the render() method of the superclass, No need to call super() though, as it does nothing by default */
  render() {
/* if the state isn't initialized, this will throw on runtime, before the data is initially loaded */
    const { movies, selectedMovie } = this.state;

/* before the movies have been loaded */
    if (!movies) return <div className="main-view">No Movies!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}
