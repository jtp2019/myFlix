const express = require("express");
  bodyParser = require("body-parser");
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();

  // app.use initializations
  app.use(bodyParser.json());
  app.use(morgan("common"));
  app.use(express.static("public"));
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// List of the movies
let Movies = [
  {
    title : 'Gladiator',
    year : '2008',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    genre: 'Action',
    director: 'Ridley Scott',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Schindler\'s List',
    year : '1993',
    description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    genre: 'Drama',
    director: 'Steven Spielberg',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Indiana Jones and the Kingdom of the Crystal Skull',
    year : '2008',
    description: 'A renowned archaeologist and explorer, Indiana Jones, teams up with a young man in order to unearth the mystery behind the legendary crystal skulls.',
    genre: 'Thriller',
    director: 'Steven Spielberg',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Jurassic Park',
    year : '1993',
    description: 'John Hammond, an entrepreneur, opens a wildlife park containing cloned dinosaurs. However, a breakdown of the island/s security system causes the creatures to escape and bring about chaos.',
    genre: 'Fantasy',
    director: 'Steven Spielberg',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Indiana Jones and the Temple of Doom',
    year : '1984',
    description: 'Indiana Jones, a legendary archaeologist, finds himself in India, where a bunch of poor villagers reach out to him to track down an ancient stone that has been stolen by an evil priest.',
    genre: 'Thriller',
    director: 'Steven Spielberg',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Avatar',
    year : '1998',
    description: 'Jake, a paraplegic marine, replaces his brother on the Na\'vi inhabited Pandora for a corporate mission. He is accepted by the natives as one of their own but he must decide where his loyalties lie.',
    genre: 'Fantasy',
    director: 'James Cameron',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Kill Bill',
    year : '2003',
    description: 'A pregnant assassin, code-named The Bride, goes into a coma for four years after her ex-boss Bill brutally attacks her. When she wakes up, she sets out to seek revenge on him and his associates.',
    genre: 'Action',
    director: 'Quentin Tarantino',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Heaven & Earth',
    year : '1993',
    description: 'During the Vietnam War, a Vietnamese woman struggles hustling on the streets, where she comes face to face with those involved in the conflict around her.',
    genre: 'Drama',
    director: 'Oliver Stone',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'The Shape of Water',
    year : '2018',
    description: 'At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.',
    genre: 'Thriller',
    director: 'Guillermo del Toror',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'Slumdog Millionaire',
    year : '2009',
    description: 'A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of Who Wants to be a Millionaire ?',
    genre: 'Drama',
    director: 'Danny Boyle',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'The Tiger: An Old Hunter\'s Tale',
    year : '2015',
    description: 'A tragedy makes Man-duk, a revered hunter, give up hunting. He keeps declining the government\'s requests to hunt down the last remaining tiger in Korea until his own son suffers the beast\'s wrath.',
    genre: 'Action',
    director: 'Park Hoon-jung',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'The Chronicles of Narnia',
    year : '2005',
    description: 'While playing, Lucy and her siblings find a wardrobe that lands them in a mystical place called Narnia. Here they realise that it was fated and they must now unite with Aslan to defeat an evil queen.',
    genre: 'Adventure',
    director: 'Andrew Adamson',
    imageURL: '',
    featured: 'false'
  },
  {
    title : 'The Mummy',
    year : '1999',
    description: 'When an archaeologist couple\'s son finds the Bracelet of Anubis, it locks onto his wrist. A cult resurrects Imhotep, an evil Egyptian high priest, who needs the bracelet to defeat the Scorpion King.',
    genre: 'Adventure',
    director: 'Stephen Sommers',
    imageURL: '',
    featured: 'false'
  }
];

// List of genres
let Genres = [
  {
        name : 'Action',
        description : 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero.'
    },
  {
        name : 'Adventure',
        description : 'Adventure Films are exciting stories, with new experiences or exotic locales. Adventure films are very similar to the action film genre, in that they are designed to provide an action-filled, energetic experience for the film viewer.'
    },
  {
        name : 'Drama',
        description : 'In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. All forms of cinema or television that involve fictional stories are forms of drama in the broader sense if their storytelling is achieved by means of actors who represent (mimesis) characters.'
    },
  {
        name: 'Fantasy',
        description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.'
    },
  {
        name : 'Thriller',
        description : 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.'
    }
];

// List of the directors

let Directors = [
  {name: 'Ridley Scott', bio: '', birthyear: 'November 30, 1937', deathyear: ''},
  {name: 'Steven Spielberg', bio: '', birthyear: 'December 18, 1946', deathyear: ''},
  {name: 'James Cameron', bio: '', birthyear: 'August 16, 1954', deathyear: ''},
  {name: 'Quentin Tarantino', bio: '', birthyear: 'March 27, 1963', deathyear: ''},
  {name: 'Danny Boyle', bio: '', birthyear: 'October 20, 1956', deathyear: ''},
  {name: 'Guillermo del Toro', bio: '', birthyear: 'October 9, 1964', deathyear: ''},
  {name: 'Oliver Stone', bio: '', birthyear: 'September 15, 1946', deathyear: ''},
  {name: 'Park Hoon-jung', bio: '', birthyear: '', deathyear: ''},
  {name: 'Andrew Adamson', bio: '', birthyear: 'December 1, 1966', deathyear: ''},
  {name: 'Stephen Sommers', bio: '', birthyear: 'March 20, 1962', deathyear: ''}
];


// User information
let Users = [
    {
        id : '1',
        username : 'jonedoe123',
        password : 'password123',
        email : 'example@gmail.com',
        date_of_birth : "January 1, 1966",
        Favorites : {

        }
    }
]

// List of the Favorites movies of the users
let Favorites = [
    {
      id: '8',
      title : 'The Shape of Water',
      year : '2018',
      description: 'At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.',
      genre: 'Thriller',
      director: 'Guillermo del Toror',
      imageURL: '',
      featured: 'false'
    }
]

// Gets the list of data about ALL movies (Return a list of ALL movies to the user)
app.get("/movies", function(req, res) {
    res.json(Movies)
});

// Gets the data about a single movie, by name (Return data (description, genre,
// director, image URL, whether it’s featured or not) about a single movie by title to the user)

app.get("/movies/:title", (req, res) => {
    res.json(Movies.find((movie) => {
        return movie.title === req.params.title
    }));
});

// Get data about a movie genre, by name
// (Return data about a genre (description) by name/title (e.g., “Thriller”))
app.get("/genres/:name", (req, res) => {
    res.json(Genres.find((genre) => {
        return genre.name === req.params.name
    }));
});

// Get data about a director (Return data about a director (bio, birth year, death year) by name)
app.get("/directors/:name", (req, res) => {
    res.json(Directors.find((director) => {
        return director.name === req.params.name
    }));
});

// Add data for a new user (Allow new users to register)
app.post("/users", (req, res) => {
    let newUser = req.body;

    if (!newUser.username || !newUser.password) {
        const message = "Missing username or password in request body";
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        Users.push(newUser);
        res.status(201).send(newUser);
    }
});

// Update the user's information (Allow users to update their user info (username, password, email, date of birth)
app.put("/users/:username", (req, res) => {
    res.send("Successful User information updated");
})

// Add movies to user's list of favorites (Allow users to add a movie to their list of favorites)
app.post("/users/:username/favorites", (req, res) => {
    let newFavorite = req.body;

    if (!newFavorite.title) {
        const message = "Missing movie title in request body";
        res.status(400).send(message);
    } else {
        newFavorite.id = uuid.v4();
        Favorites.push(newFavorite);
        res.status(201).send(newFavorite);
    }
});

// Remove movies from user's list of favorites (Allow users to remove a movie from their list of favorites)
app.delete("/users/:username/favorites/:title", (req, res) => {
    let favorite = Favorites.find((favorite) => {
        return favorite.title === req.params.title
    });
    if (favorite) {
        Favorites.filter(function(obj) {
            return obj.title !== req.params.title
        });
        res.status(201).send(req.params.title + " was removed from favorites.");
    }
});

// Deletes a user from list by ID (Allow existing users to deregister)
app.delete("/users/:username", (req, res) => {
    let user = Users.find((user) => {
        return user.username === req.params.username
    });
    if (user) {
        Users.filter(function(obj) {
            return obj.username !== req.params.username
        });
        res.status(201).send(req.params.username + " has been removed from registry .");
    }
});

// Listen for requests on port 8080
app.listen(8080);
