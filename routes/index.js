const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render('index', {tweets: tweets} );
});

// route to get all tweets from a single user
router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let tweetsForUser = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweetsForUser } );
});

// route to get a single tweet
router.get('/tweets/:id', function(req, res) {
  let id = Number(req.params.id);
  let tweetByID = tweetBank.find( {id: id} );
  res.render( 'index', { tweets: tweetByID } );
});

module.exports = router;