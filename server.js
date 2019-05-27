const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

const mongoose = require('mongoose');

// require api routes
const users = require('./routes/userRoutes.js');
const profile = require('./routes/profileRoutes.js');
const posts = require('./routes/postsRoutes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("Successfully connected to MongoDB")
  })
  .catch(err => {
    console.log(err);
  });

app.use(passport.initialize());
require('./config/passport.js')(passport);
app.use(cors());

// use api roues
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
