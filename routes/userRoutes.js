// routes for /api/users || deals with user
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const passport = require('passport');

// bring in validation files
const signUpValidation = require('../validation/signUpValidation.js');
const loginValidation = require('../validation/loginValidation.js');

// bring in User model
const User = require('../models/User.js');

// GET api/users/test || tests users route || access: PUBLIC
router.get('/test', (req, res) => {
  console.log("User test route works!");
  res.json({
    msg: "User test route works!"
  });
});

// POST api/users/signup || registers a user || access: PUBLIC
router.post('/signup', (req,res) => {
  const { errors, valid } = signUpValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Account with this email already exists";
        return res.status(400).json(errors);
      } else {
        User.findOne({ username: req.body.username })
          .then(user => {
            if (user) {
              errors.username = "This username is already taken";
              return res.status(400).json(errors);
            } else {
              const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fullName: req.body.firstName + ' ' + req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                proPic: req.body.proPic,
                password: req.body.password
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
              })
            }
          })
      }
    });
});

// POST api/users/login || login a user || access: PUBLIC
router.post('/login', (req, res) => {
  const { errors, valid } = loginValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'Email address does not match any existing user';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              fullName: user.fullName,
              proPic: user.proPic
            };
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                fullName: user.fullName,
                id: user.id,
                token: 'Bearer ' + token
              });
            });
          } else {
            errors.password = 'Password is incorrect'
            return res.status(400).json(errors);
          }
        })
    });
});

// GET api/users/currentuser || test to get current logged in user info || access: PRIVATE
router.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    fullName: req.user.fullName,
    email: req.user.email,
    username: req.user.username,
    proPic: req.user.proPic
  })
});

module.exports = router;
