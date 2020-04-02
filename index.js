const express = require('express');
  bodyParser = require('body-parser');
  uuid = require('uuid');
const morgan = require('morgan');
const app = express();

/* app.use initializations */
  app.use(bodyParser.json());
  app.use(morgan('common'));/*Logging with Morgan*/
  app.use(express.static('public'));

/* install validator*/
const { check, validationResult } = require('express-validator');

/*Authentication(passport) and Authorization(auth)*/
const passport = require('passport');
require('./passport');
const auth = require('./auth')(app);

 /*Integrating Mongoose with a REST API*/
 const mongoose = require('mongoose');
 const Models = require('./models.js');
 Movies = Models.Movie;
 Users = Models.User;
 Genres = Models.Genre;
 Directors = Models.Director;

 /* Mongoose local data base connection*/
/*mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true })*/

/* MongoDB Atlas and Heroku data base connection*/
mongoose.connect ('mongodb+srv://myDBadmin:12345@myflixdb-kow93.mongodb.net/myFlixDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });/* URL from MongoDB atlas*/

/* installed CORS */
const cors = require('cors');
app.use(cors({
origin: function(origin, callback){
if(!origin) return callback(null, true);
if(allowedOrigins.indexOf(origin) === -1){ /* If a specific origin is not found on the list of allowed origins*/
     let message = 'The CORS policy for this application does not allow access from origin ' + origin;
     return callback(new Error(message), false);
   }
   return callback(null, true);
 }
}))

/*CORS sites granted acces*/
let allowedOrigins = ['http://localhost:8080', 'https://testsite.com', 'https://rhubarb-crisp-92657.herokuapp.com/'];

/*INCORPORATING AUTHORIZATION INTO THE API ENDPOINTS*/
/***MOVIE REQUESTS(5)***/
/* Gets the list of data about ALL movies (Return a list of ALL movies to the user)*/
app.get('/movies', passport.authenticate('jwt', {session : false}), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/* Gets the data about a single movie, by name (Return data (description, genre,*/
/* director, image URL, whether it’s featured or not) about a single movie by title to the user)*/
app.get('/movies/:Title', passport.authenticate('jwt', {session : false}), (req, res) => {
  Movies.findOne({ Title : req.params.Title })
  .then((movie) => {
    res.json(movie)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/*(Return data about a genre (description) by name (e.g., “Thriller”))*/
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session : false }), (req, res) => {
  Movies.findOne({
    'Genre.Name' : req.params.Name
  })
  .then((movies) => {
    res.json(movies.Genre)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/*Get data about a movie genre, by title*/
app.get('/movies/genres/movies/:Title', passport.authenticate('jwt', {session : false}), (req, res) =>{
    Movies.findOne({Title : req.params.Title})
     .then(function(movies){
    res.status(201).send('Movie with the title : ' + movies.Title + ' is  the ' + movies.Genre.Name + ' ' + 'movie.')
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send('Error' + error);
    });
});

/* Get data about a director (Return data about a director (bio, birth year, death year) by name)*/
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session : false }), (req, res) => {
  Movies.findOne({
    'Director.Name' : req.params.Name
  })
  .then((movies) => {
    res.json(movies.Director)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/***USERS REQUESTS(7)***/
/* Add data for a new user (Allow new users to register)*/
app.post('/users', /* Validation logic here for request we can either use a chain of methods like .not().isEmpty()
  which means 'opposite of isEmpty' in plain english 'is not empty' or use .isLength({min: 5}) which means
  minimum value of 5 characters are only allowed*/
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],(req, res) => { /* check the validation object for errors */
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()
    });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username }) /*Search to see if a user with the requested username already exists*/
   .then(function(user) {
    if (user) { /*If the user is found, send a response that it already exists*/
              return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
          console.error(error);
          res.status(500).send('Error: ' + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/*Update the user's information (Allow users to update their user info (username, password, email, date of birth)*/
app.put('/users/:Username', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set : /*Allows User To Update Their Info*/
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
    { new : true },
  function(error, updatedUser) {
    if(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

/* Add movies to user's list of favorites (Allow users to add a movie to their list of favorites)*/
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findOneAndUpdate(
    { Username : req.params.Username },
    { $push : { FavoriteMovies : req.params.MovieID } },
    { new : true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      } else {
        res.json(updatedUser)
      }
    })
  });

/* Remove movies from user's list of favorites (Allow users to remove a movie from their list of favorites)*/
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.Username },
    { $pull : { FavoriteMovies : req.params.MovieID } },
    { new : true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      } else {
        res.json(updatedUser)
      }
    })
  });

  /* Get all the users*/
  app.get('/users', passport.authenticate('jwt', {session : false}), (req, res) =>{
      Users.find()
       .then(function(users){
          res.status(201).json(users)
      })
       .catch(function(error){
          console.error(error);
          res.status(500).send('Error' + error);
      });
  });

  /*Get user by Name*/
  app.get('/users/:Username', passport.authenticate('jwt', {session : false}), (req, res) =>{
    Users.findOne({ Username : req.params.Username })
    .then(function(user) {
      res.json(user)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

/* Deletes a user from list by ID (Allow existing users to deregister)*/
app.delete('/users/:Username', passport.authenticate('jwt', {session : false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/* error handling*/
app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

/* Listen for requests on port 8080*/
var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
console.log('Listening on Port 3000');
});
