// setting up the node-postgres driver
const pg = require('pg');
const postgresUrl = 'postgres://localhost/twitterdb';
const client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect(function (err) {
    if (err) throw err;
});

// make the client available as a Node module
module.exports = client;