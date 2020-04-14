import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import "./movie-view.scss"

export class MovieView extends Component {
  constructor() {
    super();

    this.state = {};
  }


  render() {
    const { movie, previous } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="movie-view">
              <img className="movie-poster" style={{textAlign: "center"}} src={movie.ImageURL} />
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-year">
                <span className="label">Year: </span>
                <span className="value">{movie.Year}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>

              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="movie-actors">
                <span className="label">Actors: </span>
                <span className="value">{movie.Actors}</span>
              </div>

              <Button variant="primary" className="back-button" onClick={() => previous(movie)}>
        Back
  </Button>
            </div>
          </Col>
        </Row>

      </Container>

    );
  }
}
