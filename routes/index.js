var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

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

router.post('/deleteGame/:id', function(req,res,next){
	console.log(req.params)
	data = {_id: new ObjectId(req.params.id)};
	MongoClient.connect('mongodb://localhost:27017/gamesCollection', function (err, db) {
	  if (err) throw err

	  db.collection('gamesCollection').remove(data, function (err, result) {
	    if (err) throw err
	    	res.json('{status: done, message: Deleted Succesfully}');
	  })
	})
})

router.post('/updateGame/:id', function(req, res, next) {
	var id = new ObjectId(req.params.id);
	var data = req.body;
	// console.log(data)

  	MongoClient.connect('mongodb://localhost:27017/gamesCollection', function (err, db) {
	  if (err) throw err

	  db.collection('gamesCollection').update({"_id": id}, {$set:data}, function (err, result) {
	    if (err) throw err
	    	res.send(result)
	  })
	})
});

module.exports = router;
