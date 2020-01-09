const express = require('express');
const app = express();
const morgan = require('morgan');

    // My top 10 movies
    let topMovies = [{
        title: 'Gladiator',
        director: 'Ridley Scott'
    }, {
        title: 'Slumdog Millionaire',
        director: 'Danny Boyle'
    }, {
        title: 'Schindler\'s List',
        director: 'Steven Spielberg'
    }, {
        title: 'The Shape of Water',
        director: 'Guillermo del Toro'
    }, {
        title: 'Heaven & Earth',
        director: 'Oliver Stone'
    }, {
        title: 'Twilight',
        director: 'Catherine Hardwicke'
    }, {
        title: 'The Tiger: An Old Hunter\'s Tale',
        director: 'Park Hoon-jung'
    }, {
        title: 'Avatar',
        director: 'James Cameron'
    }, {
        title: 'Raiders of the Lost Ark',
        director: 'Steven Spielberg'
    }, {
        title: 'Ben-Hur',
        director: 'William Wyler'
    }];
// Logging with Morgan
app.use(morgan('common'));
// GET requests
app.get('/', function(req, res) {
    res.send('Welcome to myFlix')
});
app.get('/movies', function(req, res) {
    res.json(topMovies)
});
app.use(express.static('public'));
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Listen for requests on port 8080
app.listen(8080);
