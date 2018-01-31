var mongoose = require('mongoose');
var mapSchema = require('../schemas/map.js');

module.exports = mongoose.model('Map', mapSchema);