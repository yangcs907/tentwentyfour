// model for user profile (profiles collection on MongoDB)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fullName: {
    type: String
  },
  username: {
    type: String
  },
  church: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  briefTestimony: {
    type: String,
    required: true
  },
  hobbies: {
    type: [String]
  },
  socialLinks: {
    personalWebsite: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  prayerRequests: [
    {
      subject: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  ministryExperience: [
    {
      role: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false
      },
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
