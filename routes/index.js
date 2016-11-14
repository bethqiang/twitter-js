const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
// const tweetBank = require('../tweetBank');
const client = require('../db');

module.exports = function(io) {

  router.get('/', function (req, res, next) {
    client.query('SELECT tweets.id, user_id, content, name, picture_url FROM tweets INNER JOIN users ON (tweets.user_id = users.id)', function(err, result) {
      if (err) return next(err);
      let tweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: true
      })
    })
  })

  // route to get all tweets from a single user
  router.get('/users/:username', function(req, res) {
    client.query('SELECT tweets.id, user_id, content, name, picture_url FROM tweets INNER JOIN users ON (tweets.user_id = users.id) WHERE name = $1', [req.params.username], function(err, result) {
      if (err) return next(err);
      let tweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: false,
        username: req.params.username
      })
    })
  })

  // route to get a single tweet
  router.get('/tweets/:id', function(req, res) {
    client.query('SELECT tweets.id, user_id, content, name, picture_url FROM tweets INNER JOIN users ON (tweets.user_id = users.id) WHERE tweets.id = $1', [req.params.id], function(err, result) {
      if (err) return next(err);
      let tweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: false
      })
    })
  })

  // route to post a tweet
  router.post('/tweets', function(req, res, next){
    let userName;
    let name = req.body.name;
    let text = req.body.text;
    console.log(text);

    client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
      if (err) return next(err);
      if (result.rows.length === 0) {
      // client.query('INSERT INTO users (name) values ($1) RETURNING *', [req.body.name], function(err, result) {})
      client.query('INSERT INTO users (name) VALUES ($1)', [name], function(err, result) {
        if (err) return next(err);
        client.query('SELECT id FROM users WHERE name = $1', [name], function(err, result) {
          if (err) return next(err);
          insertIntoTable(result.rows[0].id, text);
        })
      })

    } else {
      insertIntoTable(result.rows[0].id, text);
    }
    
    function insertIntoTable(userName, text) {
      client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)', [userName, text], function(err, result) {
        if (err) return next(err);
        console.log(result.rows);
        client.query('SELECT id FROM tweets WHERE user_id = $1 AND content = $2', [userName, text], function(err, result) {
          if (err) return next(err);
          console.log(result.rows);
          let newTweet = {
            name: name,
            content: text,
            id: result.rows[0].id
          };
          io.sockets.emit('new_tweet', newTweet);
          res.redirect('/');
          })
        })
      }
    })
  })

  return router;

}

// module.exports = router;