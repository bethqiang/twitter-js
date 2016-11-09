const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

module.exports = function(io) {

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets, showForm: true} );
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

  // route to post a tweet
  router.post('/tweets', function(req, res) {
    let name = req.body.name;
    let text = req.body.text;
    let newTweet = tweetBank.add(name, text);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  return router;

}

// module.exports = router;