const express = require("express");
  bodyParser = require("body-parser");
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();

 /*Integrating Mongoose with a REST API*/
 const mongoose = require('mongoose');
 const Models = require('./models.js');
 const Movies = Models.Movie;
 const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useUnifiedTopology: true, useNewUrlParser: true});

   /* app.use initializations*/
  app.use(bodyParser.json());
  app.use(morgan("common"));
  app.use(express.static("public"));
   /*app.use(function(err, req, res, next) {
   /*console.error(err.stack);
  /*  res.status(500).send('Something broke!');
  /*});


/***MOVIE REQUESTS(5)***/
/* Gets the list of data about ALL movies (Return a list of ALL movies to the user)*/
app.get('/movies',function(req , res){
    Movies.find()
     .then(function(movies){
        res.status(201).json(movies)
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

/* Gets the data about a single movie, by name (Return data (description, genre,*/
/* director, image URL, whether it’s featured or not) about a single movie by title to the user)*/
app.get('/movies/:Title',function(req , res){
    Movies.findOne({Title : req.params.Title})
     .then(function(movies){
        res.status(201).json(movies)
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

/*(Return data about a genre (description) by name (e.g., “Thriller”))*/
app.get('/movies/genres/:Name',function(req , res){
    Movies.findOne({'Genre.Name' : req.params.Name})
     .then(function(movies){
        res.status(201).json(movies.Genre)
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

/*Get data about a movie genre, by title*/
app.get('/movies/genres/movies/:Title', function(req , res){
    Movies.findOne({Title : req.params.Title})
     .then(function(movies){
    res.status(201).send("Movie with the title : " + movies.Title + " is  the " + movies.Genre.Name + " " + "movie.")
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + error);
    });
});

/* Get data about a director (Return data about a director (bio, birth year, death year) by name)*/
app.get('/movies/director/:Name',function(req , res){
    Movies.findOne({"Director.Name" : req.params.Name})
     .then(function(movies){
        res.status(201).json(movies.Director)
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

/***USERS REQUESTS(7)***/
/* Get all the users*/
app.get('/users',function(req , res){
    Users.find()
     .then(function(users){
        res.status(201).json(users)
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + error);
    });
});

/*Get user by Name*/
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

/* Add data for a new user (Allow new users to register)*/
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

/*Update the user's information (Allow users to update their user info (username, password, email, date of birth)*/
app.put('/users/:Username', function(req, res) {
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
      res.status(500).send("Error: " + error);
    } else {
      res.json(updatedUser)
    }
  })
});

/* Add movies to user's list of favorites (Allow users to add a movie to their list of favorites)*/
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username }, {
      $push : { FavoriteMovies : req.params.MovieID }
    },
    { new : true }, /*This line makes sure that the updated document is returned*/
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
  });

/* Remove movies from user's list of favorites (Allow users to remove a movie from their list of favorites)*/
app.delete('/users/:Username/Movies/:MovieID', function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username }, {
        $pull : { FavoriteMovies : req.params.MovieID }
      },
      { new : true }, /*This line makes sure that the updated document is returned*/
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser)
        }
      })
    });

/* Deletes a user from list by ID (Allow existing users to deregister)*/
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + "User Account Not Found");  /*Allows User To Delete-Derigester Their Account*/
    } else {
      res.status(200).send(req.params.Username + "  User Account Has Been Deleted.");
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

/* Listen for requests on port 8080*/
app.listen(8080, () => {
  console.log('My app is listening on port 8080');
});
