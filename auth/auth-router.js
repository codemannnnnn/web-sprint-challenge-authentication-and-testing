const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const db = require("../database/dbConfig.js");
const constants = require("../config/constants");

router.post("/register", (req, res) => {
  const creds = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(creds.password, rounds);

  creds.password = hash;

  db("users")
    .insert(creds)
    .then((e) => {
      res.status(201).json({ data: e, creds });
    })
    .catch((err) => {
      res.status(500).json({ message: "missing fields" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db("users")
    .select("users.id", "users.username", "users.password")
    .then(([user]) => {
      console.log("user", user);
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token, message: "Welcome to our API" });
      } else {
        res.status(401).json({ message: "invalid input" });
      }
    })
    .catch((err) => console.log(err));
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const secret = constants.jwtSecret;
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
