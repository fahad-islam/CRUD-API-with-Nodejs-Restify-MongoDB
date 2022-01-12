const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const customerScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

customerScheme.plugin(timestamp);

const Customer = mongoose.model('Customer', customerScheme);

module.exports = Customer;