const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const cars = await db('cars');
    res.status(200).json(cars);
  }
  catch(err) {
    res.status(500).json({ message: 'Error retriving cars from db' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const car = await db('cars').where('id', '=', id);
    if( car.length === 0 ) {
      res.status(404).json({ message: `Car with id of ${id} does not exist` });
    } else {
      res.status(201).json(car);
    }
  }
  catch(err) {
    res.status(500).json({ message: 'Error retrieveing car from db' });
  }
})

router.post('/', carInfoCheck, async (req, res) => {
  try {
    const [id] = await db('cars').insert(req.body.carInfo);
    const newCarEntry = await db('cars').where({id});
    res.status(201).json(newCarEntry);
  }
  catch (err) {
    res.status(500).json({ message: 'Error adding car to db' });
  }
});

router.put('/:id', carInfoCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await db('cars').where('id', '=', id).update(req.body.carInfo);
    if(count > 0) {
      const car = await db('cars').where('id','=', id);
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: `The car with id ${id} does not exist` });
    }
  }
  catch(err) {
    res.status(500).json({ message: 'Error updating car info to db' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await db('cars').where('id', '=', id).del();
    if(deletedCount > 0) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: `The card with id ${id} does not exist` });
    }
  }
  catch(err) {
    res.status(500).json({ message: 'There was an error trying to remove card entry from the db' });
  }
})

// middleware

function carInfoCheck(req, res, next) {
  let notValid = [];
  let toBeChecked = [];
  let str = 'The following is required: '
  let values = {};
    values.vin = req.body.vin;
    values.make = req.body.make;
    values.model = req.body.model;
    values.mileage = req.body.mileage;
  let keyValues = Object.keys(values);

  // check if values are missing
  for(let i = 0; i< keyValues.length; i++) {
    if(values[keyValues[i]] === undefined) {
      notValid.push(keyValues[i])
    } else {
      toBeChecked.push(keyValues[i]);
    }
  }

  // check if non-missing values are only spaces
  for(let i = 0; i < toBeChecked.length; i++) {
    if(toString(values[toBeChecked[i]]).trim() === "") {
      notValid.push(toBeChecked[i]);
    }
  }

  // if noValid array is empty continue to post else move on
  if(notValid.length > 0) {
    // create error string
    for(let i = 0; i < notValid.length; i++) {
      if(i === (notValid.length - 1)) {
        str = str + notValid[i];
      } else {
        str = str + notValid[i] + ", ";
      }
    }

    res.status(400).json({ message: str });
  } else {
    values.transmission = req.body.transmission;
    values.title_status = req.body.title_status;
    req.body.carInfo = values;
    next();
  }
  
}

module.exports = router;