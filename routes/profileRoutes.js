//  routes for /api/profile || routes dealing with profiles of users
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// bring in validation files
const profileValidation = require('../validation/profileValidation.js');
const ministryExperienceValidation = require('../validation/ministryExperienceValidation.js');
const prayerRequestValidation = require('../validation/prayerRequestValidation.js');

const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

// GET api/profile/test || tests profile route || access: PUBLIC
router.get('/test', (req, res) => {
  console.log("Profile test route works!");
  res.json({
    msg: "Profile test route works!"
  });
});

// GET api/profile || gets current user profile || access: PRIVATE
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['fullName', 'proPic'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this current user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET api/profile/all-profiles || gets all profiles in DB || access: Public
router.get('/all-profiles', (req, res) => {
  const errors = {};
  Profile.find({})
    .populate('user', ['fullName', 'proPic'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'There are no profiles!'
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET api/profile/username/:username || gets profile by username || access: PUBLIC
router.get('/username/:username', (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
    .populate('user', ['fullName', 'proPic'])
    .then(profile => {
      if(!profile) {
        errors.noProfile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET api/profile/userId/:userId || gets profile by user ID || access: PUBLIC
router.get('/userId/:userId', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.userId })
    .populate('user', ['fullName', 'proPic'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// POST api/profile/update-profile || create or edit user profile || access: PRIVATE
router.post('/update-profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, valid } = profileValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  };

  const profileInputs = {};
  profileInputs.user = req.user.id;
  profileInputs.fullName = req.user.fullName;
  profileInputs.username = req.user.username;
  if (req.body.church) profileInputs.church = req.body.church;
  if (req.body.location) profileInputs.location = req.body.location;
  if (req.body.occupation) profileInputs.occupation = req.body.occupation;
  if (req.body.briefTestimony) profileInputs.briefTestimony = req.body.briefTestimony;
  if (req.body.date) profileInputs.date = req.body.date;
  if (typeof req.body.hobbies != "undefined") {
    profileInputs.hobbies = req.body.hobbies.split(',');
  }

  profileInputs.socialLinks = {};
  if (req.body.youtube) profileInputs.socialLinks.youtube = req.body.youtube;
  if (req.body.twitter) profileInputs.socialLinks.twitter = req.body.twitter;
  if (req.body.facebook) profileInputs.socialLinks.facebook = req.body.facebook;
  if (req.body.linkedin) profileInputs.socialLinks.linkedin = req.body.linkedin;
  if (req.body.instagram) profileInputs.socialLinks.instagram = req.body.instagram;
  if (req.body.personalWebsite) profileInputs.socialLinks.personalWebsite = req.body.personalWebsite;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileInputs }, { new: true })
          .then(profile => {
            res.json(profile);
          })
      } else {
          new Profile(profileInputs)
            .save()
            .then(profile => {
              res.json(profile)
            })
            .catch(err => {
              res.json(err)
            });
      }
    });
});

// POST api/profile/add-experience || adds ministry experience to profile || access: PRIVATE
router.post('/add-experience', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, valid } = ministryExperienceValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  };

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExperience = {
        role: req.body.role,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
      };
      profile.ministryExperience.unshift(newExperience) ;
      profile
        .save()
        .then(profile => {
          res.json(profile)
        });
    });
});

// DELETE api/profile/delete-experience/:exp_id || deletes an experience from profile || access: PRIVATE
router.delete('/delete-experience/:exp_id', passport.authenticate('jwt', { session : false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.ministryExperience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      profile.ministryExperience.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => {
      res.status(404).json(err)
    });
});

// POST api/profile/add-prayer-request || adds prayer request to profile || access: PRIVATE
router.post('/add-prayer-request', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, valid } = prayerRequestValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  };

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newPrayerRequest = {
        subject: req.body.subject,
        description: req.body.description
      };
      profile.prayerRequests.unshift(newPrayerRequest);
      profile
        .save()
        .then(profile => {
          res.json(profile)
        })
        .catch(err => {
          res.status(404).json(err)
        });
    })
    .catch(err => {
      res.status(404).json(err)
    });
});

// DELETE api/profile/delete-prayer-request/:req_id || deletes a prayer request from profile || access: PRIVATE
router.delete('/delete-prayer-request/:req_id', passport.authenticate('jwt', { session : false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.prayerRequests
        .map(item => item.id)
        .indexOf(req.params.req_id);
      profile.prayerRequests.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => {
      res.status(404).json(err)
    });
});

// DELETE api/profile || deletes user account and profile || access: PRIVATE
router.delete('/', passport.authenticate('jwt', { session : false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id})
        .then(() => res.json( { success: true }))
    });
});

module.exports = router;
