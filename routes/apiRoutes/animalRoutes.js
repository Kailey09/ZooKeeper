const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

app.get('/animals/', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  app.get('/animals/:id', (req, res) => {
      const result = findById(req.params.id, animals);
      if (result) {
          res.json(result);
      } else {
          res.send(404);
      }
  });

  app.post('/animals', (req, res) => {
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
