import React, { Component } from "react";
import PropTypes from "prop-types"; /*props transmit data between components and help to avoid bugs*/

/*sources of Bootstrap code*/
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieCard extends Component {
  render() {
    /* This is given to the <MovieCard/> component by the outer world which, in this case, is `MainView`, */
    /* as `MainView` is what’s connected to our database via the movies endpoint of our API */
    const { movie, click } = this.props;

    return (
      <Card className="mb-3 mb-sm-4" style={{ width: "16rem" }}>
        <Card.Img variant="top" src="movie.ImageURL" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => click(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

/* Set the static proptypes property with the objects to give them proper look*/
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    Featured: PropTypes.bool,
  }).isRequired,
  Actors: PropTypes.string,
  click: PropTypes.func.isRequired,
};
