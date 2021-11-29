// importing libraries  Use the Morgan middleware library to log all requests 
const express = require('express');
const app = express(),
      morgan = require('morgan');
      app.use(morgan('common'));

// list of top ten movies 
let topMovies = [
  {
    title: 'Braveheart',
    staring: 'Mel Gibson',
    dirctor: 'Mel Gibson'
  },
  {
    title: 'Titanic',
    staring: 'Leonardo DiCaprio',
    dirctor: 'James Cameron'
  },
  {
    title: 'The Italian Job',
    staring: 'Mark Wahlberg',
    dirctor: 'F. Gary Gray'
  },
  {
    title: 'Al-Zeer Salem',
    staring: 'Salloum Haddad',
    dirctor: 'Hatem Ali'
  },
  {
    title: 'Money Heist',
    staring: 'Álvaro Morte',
    dirctor: 'Álex Pina'
  },
  {
    title: ' Death Note',
    staring: 'Takeshi Obata',
    dirctor: 'Tsugumi Ohba'
  },
  {
    title: 'Friends',
    staring: 'David Crane',
    dirctor: 'David Crane'
  },
  {
    title: 'The Fresh Prince of Bel-Air',
    staring: 'Will Smith',
    dirctor: 'Andy Borowitz'
  },
  {
    title: 'Bad Boys II',
    staring: 'Will Smith',
    dirctor: 'Michael Bay'
  },
  {
    title: 'Spider-Man 2',
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

app.get('/movies', (req, res) => {
  res.json(topMovies);
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