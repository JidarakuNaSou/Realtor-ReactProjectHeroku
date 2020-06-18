const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generatetokens = require("../generateTokens/generatetokens");
const { secret } = require("../config/config").jwt;
const authmiddleware = require("../middleware/authmiddleware");

const User = require("../models/User");
const Token = require("../models/token");
users.use(cors());

const updateTokens = userId => {
  const accessToken = generatetokens.generateAccessToken(userId);
  const refreshToken = generatetokens.generateRefreshToken();
  return generatetokens
    .replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.tokens
    }));
};

users.get("/finduser", authmiddleware, (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.replace("Bearer ", "");
  const payload = jwt.verify(token, secret);
  User.findOne({ _id: payload.userId }).then(user => {
    if (user) {
      return res.json(user);
    } else return console.log("there is no such user ");
  });
});

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "Пользователь с таким Email уже существует!" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  console.log(req.body)
  
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          updateTokens(user._id).then(tokens =>
            res.json({ tokens, error: null })
          );
        } else {
          res.json({ error: "Логин или пароль неверен" });
        }
      } else {
        res.json({ error: "Логин или пароль неверен" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== "refresh") {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Token expired!" });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then(token => {
      if (token === null) {
        throw new Error("Invalid token!");
      }
      return updateTokens(token.userId);
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({ message: err.message }));
};

module.exports = {
  users,
  refreshToken
};
