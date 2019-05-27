// model for post that users can create
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String
  },
  userId: {
    type: String
  },
  fullName: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  biblePassage: {
    type: [String]
  },
  webLinks: {
    type: [String]
  },
  proPic: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      fullName: {
        type: String
      },
      username: {
        type: String
      },
      proPic: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Post = mongoose.model('post', PostSchema);
