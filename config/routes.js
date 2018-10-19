const axios = require('axios');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;
const { authenticate } = require('./middlewares');

const dbConfig = require('../database/dbConfig')


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body
  creds.password = bcrypt.hashSync(creds.password, 10) 
  dbConfig('users').insert(creds).then(() => {
    const token = generateToken(creds)
    res.json({welcome: creds.username, token: token})
  }
    
  ).catch(err => {
    res.status(500).json(err)
  })


}

function login(req, res) {
  // implement user login
  const creds = req.body
  dbConfig('users').where({username: creds.username}).first().then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(creds)
      res.json({welcome:creds.username, token: token})
    }else {
      res.status(401).json({ message: "nope" });
    }
  }

  ).catch(err => {
    res.status(500).json(err)
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const jwtPayload = {
    sub: user.username
  };
  const jwtOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}