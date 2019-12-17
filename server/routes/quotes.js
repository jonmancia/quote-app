const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

router.get('/', (req, res) => {
  Quote.find()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const quote = new Quote({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    quoteTotal: req.body.quoteTotal,
    pickup_city: req.body.pickup_city,
    delivery_city: req.body.delivery_city,
    pickup_state: req.body.pickup_state,
    delivery_state: req.body.delivery_state,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    type: req.body.type,
  });

  quote
    .save()
    .then(() => {
      res.json('Success');
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete('/:id', (req, res) => {
  Quote.findOneAndDelete();
});

module.exports = router;
