const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sales = await db('sales');
    if(sales.length > 0) {
      res.status(200).json(sales);
    } else {
      res.status(404).json({ message: 'There are no sales records available' });
    }
  }
  catch(err) {
    res.status(500).json({ message: 'Something went wrong trying to get sales form the db' });
  }
})

module.exports = router;