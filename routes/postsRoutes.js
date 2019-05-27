//  routes for /api/posts || routes dealing with profiles of users
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// bring in validation files
const postValidation = require('../validation/postValidation.js');

const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');

// GET api/posts/test || tests if posts route working || access: PUBLIC
router.get('/test', (req, res) => {
  res.json({ msg: 'posts route working'});
});

// GET api/posts || gets all posts || access: PUBLIC
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => {
      if (Object.keys(post).length < 1) {
        res.json({ msg: 'no posts found'});
      }
      res.json(post);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET api/posts/id/:id || gets a particular post by id || access: PUBLIC
router.get('/id/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => {
      if (Object.keys(posts).length < 1) {
        res.json({ msg: `no posts found for id ${req.params.id}`})
      }
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// GET api/posts/:user || gets all posts by user || access: PUBLIC
router.get('/username/:username', (req, res) => {
  Post.find({ username: req.params.username })
    .then(posts => {
      if (Object.keys(posts).length < 1) {
        res.json({ msg: `no posts found for id ${req.params.id}`})
      }
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// POST api/posts/create-post || create a new post || access: PRIVATE
router.post('/create-post', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, valid } = postValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }
  const newPost = {
    fullName: req.user.fullName,
    username: req.user.username,
    proPic: req.user.proPic,
    userId: req.user.id,
    title: req.body.title,
    text: req.body.text
  };
  if (typeof req.body.biblePassage !== 'undefined') {
    newPost.biblePassage = req.body.biblePassage.split(',');
  }
  if (typeof req.body.webLinks !== 'undefined') {
    newPost.webLinks = req.body.webLinks.split(',');
  }
  new Post(newPost)
    .save()
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE api/posts/delete-post/:id || deletes a post (user only) || access: PRIVATE
router.delete('/delete-post/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ authorization: 'not authorized to do this' });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'no post found' }));
    });
});

// POST api/posts/comments/:id || add comment to post || access: PRIVATE
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, valid } = postValidation(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        title: req.body.title,
        text: req.body.text,
        fullName: req.user.fullName,
        username: req.user.username,
        proPic: req.user.proPic,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'no post found'}));
});

// DELETE api/posts/comments/:id/:comment_id || deletes comment from post || access: PRIVATE
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotfound: 'comment not found'});
      }
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ commentnotfound: 'comment not found'}));
});


module.exports = router;
