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
  next();
}

router.post("/register", register, auth.issueJwt);

function signIn(req, res, next) {
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
  bags.getBags(req.user.username).then(data => {
    res.json({
      message: "This is your bag.",
      bag: data
    });
  });
});

router.post("/bags", (req, res) => {
  bags
    .addBags(req.user.username, req.body.description, req.body.destination)
    .then(data => {
      bags.getBags(req.user.username).then(userBag => {
        res.json({
          message: "This is your bag.",
          bag: userBag
        });
      });
    });
});

router.post("/bagsdel", (req, res) => {
  const { id } = req.body;
  bags.deleteBag(id, req.user.username).then(delBag => {
    res.json({
      message: "deleted bag",
      bag: delBag
    });
  });
});

router.post("/bagsupdate", (req, res) => {
  console.log("hit the update route");
  console.log(req.body);
  bags
    .updateBag(
      req.body.id,
      req.body.destination,
      req.body.description,
      req.user.username
    )
    .then(updBag => {
      res.json({
        message: "updated bag",
        bag: updBag
      });
    });
});

module.exports = router;
