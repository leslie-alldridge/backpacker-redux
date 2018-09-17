const jwt = require('jsonwebtoken')
const bags = require('../lib/bags')
const users = require('./users')

function createToken (user, secret) {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, secret, {
    expiresIn: 60 * 60 * 24 // or '1d'
  })
}

function handleError (err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Access to this resource was denied.',
      error: err.message
    })
  }
  next()
}

function issueJwt (req, res, next) {
  console.log('issueJwt')
  users.getByName(req.body.username)
    .then(user => {
      console.log(user);
      
      const token = createToken(user, process.env.JWT_SECRET)
      res.json({
        message: 'Authentication successful.',
        token
      })
      let username = user.username;
      console.log('can i func here' + username);
      bags.getBags(username)
      .then(data => {
        console.log(data);
        
      })
      
    })
    .catch(err => {
      return res.status(403).json({
        message: 'Authentication failed.',
        info: err.message
      })
    })
}

module.exports = {
  handleError,
  issueJwt
}