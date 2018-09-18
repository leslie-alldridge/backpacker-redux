const express = require("express");
const verifyJwt = require("express-jwt");

const crypto = require("../lib/crypto");
const users = require("../lib/users");
const auth = require("../lib/auth");
const bags = require("../lib/bags");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/signin", sayHello, signIn, auth.issueJwt);

function sayHello(req, res, next) {
  console.log("Hello");
  next();
}

router.post("/register", register, auth.issueJwt);

function signIn(req, res, next) {
  console.log("signIn");
  users
    .getByName(req.body.username)
    .then(user => {
      return user || invalidCredentials(res);
    })
    .then(user => {
      return user && crypto.verifyUser(user.hash, req.body.password);
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res);
    })
    .catch(() => {
      res.status(400).send({
        errorType: "DATABASE_ERROR"
      });
    });
}

function register(req, res, next) {
  users
    .exists(req.body.username)
    .then(exists => {
      if (exists) {
        return res.status(400).send({ message: "User exists" });
      }
      users.create(req.body.username, req.body.password).then(() => next());
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
}

function invalidCredentials(res) {
  res.status(400).send({
    errorType: "INVALID_CREDENTIALS"
  });
}

// express-jwt middleware lets us use a function as the secret,
// so we can grab from wherever...
function getSecret(req, payload, done) {
  done(null, process.env.JWT_SECRET);
}

// This route will set the req.user object if it exists, but is still public
router.get(
  "/quote",
  verifyJwt({
    credentialsRequired: false,
    secret: getSecret
  }),
  (req, res) => {
    const response = { message: "This is a PUBLIC quote." };
    if (req.user) {
      response.user = `Your user ID is: ${req.user.id}`;
    }
    res.json(response);
  }
);

// Protect all routes beneath this point
router.use(
  verifyJwt({
    secret: getSecret
  }),
  auth.handleError
);

// These routes are protected
router.get("/bags", (req, res) => {
  console.log("req route");
  console.log(req.user.username);

  bags.getBags(req.user.username).then(data => {
    console.log("i found the bag below from a DB function");
    console.log(data);
    res.json({
      message: "This is your bag.",
      bag: data
    });
  });
});

router.post("/bags", (req, res) => {
  console.log("hit the post bags route");
  console.log(req.user.username);
  console.log(req);
  bags
    .addBags(req.user.username, req.body.description, req.body.destination)
    .then(data => {
      console.log(data);
      console.log("bags should be in db");
    });
});

module.exports = router;
