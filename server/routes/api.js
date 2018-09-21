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
        return res.status(400).send({ message: "User already exists" });
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

function getSecret(req, payload, done) {
  done(null, process.env.JWT_SECRET);
}

router.use(
  verifyJwt({
    secret: getSecret
  }),
  auth.handleError
);

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

router.post("/itemadd", (req, res) => {
  bags.addBagItem(req.user.username, req.body.id, req.body.input).then(data => {
    res.json({
      message: "These are your bag items.",
      bagItems: data
    });
  });
});

router.get("/itemshow", (req, res) => {
  bags.getBagItem(req.user.username, req.query.bagid).then(data => {
    res.json({
      message: "These are your bag items.",
      bagItems: data
    });
  });
});

router.post("/itemarchive", (req, res) => {
  bags
    .archiveBagItem(req.user.username, req.body.id, req.body.item)
    .then(data => {
      res.json({
        message: "These are your updated bag items.",
        bagItems: data
      });
    });
});

router.post("/itemdel", (req, res) => {
  bags
    .deleteBagItem(req.user.username, req.body.bagid, req.body.item)
    .then(data => {
      res.json({
        message: "These are your new bag items.",
        bagItems: data
      });
    });
});

module.exports = router;
