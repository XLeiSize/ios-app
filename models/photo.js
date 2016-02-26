// app/models/photo.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoSchema   = new Schema({
    id: Number,
    url: String
});

module.exports = mongoose.model('Photo',PhotoSchema);
