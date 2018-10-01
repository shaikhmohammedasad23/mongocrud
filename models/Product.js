var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
  id:{type: Schema.Types.ObjectId, ref: 'Book'},
  productname: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema)