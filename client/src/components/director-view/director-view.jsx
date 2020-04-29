import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <div className="directorview">
        <Card>
          <Card.Body>
            <Card.Text>
              Director:
              {director.Name}
            </Card.Text>
            <Card.Text>
              Bio:
              {director.Bio}
            </Card.Text>
            <Card.Text>
              Birth:
              {director.Birth}
            </Card.Text>
            <Link to="" onClick={() => history.back()}>
              <Button type="button" variant="link" size="sm">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    }).isRequired,
};
