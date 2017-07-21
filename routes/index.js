var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/gameData', function(req, res, next) {
  	MongoClient.connect('mongodb://localhost:27017/gamesCollection', function (err, db) {
	  if (err) throw err

	  db.collection('gamesCollection').find().toArray(function (err, result) {
	    if (err) throw err
	    	res.send(result)
	  })
	})
});

router.post('/addGame', function(req, res, next) {
	var data = req.body;
	// console.log(data);
	
  	MongoClient.connect('mongodb://localhost:27017/gamesCollection', function (err, db) {
	  if (err) throw err

	  db.collection('gamesCollection').insertOne(data, function (err, result) {
	    if (err) throw err
	    	res.send(result)
	  })
	})
});

module.exports = router;
