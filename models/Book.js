var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
  id:Number,
  categotyname: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema)