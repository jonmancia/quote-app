const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const QuoteSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  quoteTotal: { type: String, required: true },
  pickup_city: { type: String, required: true },
  delivery_city: { type: String, required: true },
  pickup_state: { type: String, required: true },
  delivery_state: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = Mongoose.model('Quote', QuoteSchema);
