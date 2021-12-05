// importing libraries  Use the Morgan middleware library to log all requests 
const express = require('express'),
bodyParser = require('body-parser'),
  uuid = require('uuid');
const app = express(),
      morgan = require('morgan');
      app.use(morgan('common'));
      app.use(bodyParser.json());

// list of top ten movies 
let movies = [
  {
    id: 1,
    name: 'Braveheart',
    staring: 'Mel Gibson',
    dirctor: 'Mel Gibson'
  },
  {
    id: 2,
    name: 'Titanic',
    staring: 'Leonardo DiCaprio',
    dirctor: 'James Cameron'
  },
  {
    id: 3,
    name: 'The Italian Job',
    staring: 'Mark Wahlberg',
    dirctor: 'F. Gary Gray'
  },
  {
    id: 4,
    name: 'Al-Zeer Salem',
    staring: 'Salloum Haddad',
    dirctor: 'Hatem Ali'
  },
  {
    id: 5,
    name: 'Money Heist',
    staring: 'Álvaro Morte',
    dirctor: 'Álex Pina'
  },
  {
    id: 6,
    name: ' Death Note',
    staring: 'Takeshi Obata',
    dirctor: 'Tsugumi Ohba'
  },
  {
    id: 7,
    name: 'Friends',
    staring: 'David Crane',
    dirctor: 'David Crane'
  },
  {
    id: 8,
    name: 'The Fresh Prince of Bel-Air',
    staring: 'Will Smith',
    dirctor: 'Andy Borowitz'
  },
  {
    id: 9,
    name: 'Bad Boys II',
    staring: 'Will Smith',
    dirctor: 'Michael Bay'
  },
  {
    id: 10,
    name: 'Spider-Man 2',
    staring: 'Tobey Maguire',
    dirctor: 'Sam Raimi'
  },
];

// GET requests 
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});
// Get a list of all movies 
app.get('/movies', (req, res) => {
  res.json(movies);
});
// Get the data about a single movie, by name 
app.get('/movies/:name', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.name === req.params.name }));
});

// Adds data for a new movie to the  list of movies.
app.post('/movies', (req,res)=> {
  let newMovie = req.body;
  if(!newMovie.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4(); 
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
}); 
// Deletes a  movie from our list by ID
app.delete('/movies/:id', (req, res) => {
  let movie = movies.find((movie) => { return movie.id === req.params.id });

  if (movie) {
    movies = movies.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Movie ' + req.params.id + ' was deleted.');
  }
});

// create myLogger  
let myLogger = (req, res, next)=> {
  console.log(req.url);
  next();
};


app.use(myLogger);

app.get('/secreturl', (req,res)=> {
  res.send('this is super top content');
});

app.use(express.static('public'));

//Create an error-handling middleware function 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke'); 
})
// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});