const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const UserProfile = require('../models/user_model');
let path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    } else {
      // Use the previous picture's filename
      const previousFilename = req.file ? req.file.filename : ''; // Assuming the previous photo filename is stored in req.file.filename
      cb(null, previousFilename);
    }
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype) || !file) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
}

let upload = multer({ storage, fileFilter });


const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

router.post('/', authenticate, upload.single('photo'), async (req, res) => {
  try {
    const { email } = req.user;
    const { Bio, Result, Strength, Experience, Education, Achievements } = req.body;

    const userProfile = {
      useremail: email,
      Bio,
      Result,
      Strength,
      Experience,
      Education,
      Achievements,
      photo: req.file ? req.file.filename : ''
    };

    const filter = { useremail: email };
    const options = { new: true, upsert: true };
    const updatedProfile = await UserProfile.findOneAndUpdate(filter, userProfile, options);

    if (updatedProfile) {
      res.status(200).json({ email: email, message: 'User Profile Updated successfully' });
    } else {
      res.status(500).json({ message: 'Failed to update user profile' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const { email } = req.user;
    const userProfiles = await UserProfile.findOne({ useremail: email });

    if (userProfiles) {
      res.json(userProfiles);
    } else {
      res.status(404).json({ message: 'User profile not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving user profiles' });
  }
});
router.get('/find',  async (req, res) => {
  try {
      const { email } = req.query;
      const userProfiles = await UserProfile.findOne({ useremail: email });
    
    return res.json(userProfiles);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user profiles', error: error });
  }
});

module.exports = router;