const fs = require('fs');
const path = require('path');
const { animals } = require('./data/animals.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));




app.get('/api/animals/', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  app.get('/api/animals/:id', (req, res) => {
      const result = findById(req.params.id, animals);
      if (result) {
          res.json(result);
      } else {
          res.send(404);
      }
  });

  app.post('/api/animals', (req, res) => {
      // set if based on what next index of the array will be
      req.body.id = animals.length.toString();

      // if any data in req.body is incorrect send 400 err back
      if (!validateAnimal(req.body)) {
          res.status(400).send('The animal is not properly formatteed.');
      } else {
          const animal = createNewAnimal(req.body, animals);
          res.json(animal);
      }
  });

  app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/animals', (req, res) => {
      res.sendFile(path.join(__dirname, './public/animals.html'));
  });

  app.get('/zookeepers', (req, res) => {
      res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './public/index.html'));
  });


  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });