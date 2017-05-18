var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var dbURI = 'mongodb://localhost/eduClassDB';
var dbURI = 'mongodb://meenalk44:May2017!@ds143211.mlab.com:43211/educlass';
mongoose.connect(dbURI);


