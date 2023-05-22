const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/userID', async (req, res) => {
  try {
    const { userId } = req.query;

    let user;
    if (userId) {
      user = await User.findById(userId);
    } 
     else {
      return res.status(400).json({ message: 'User ID or useremail is required' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, department, batch } = user;
    return res.json({ name, email, department, batch });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/email', async (req, res) => {
  try {
    const { user_email } = req.query;

    let user;
    if (user_email) {
      user = await User.findOne({ email: user_email }).select('_id');
    } else {
      return res.status(400).json({ message: 'User email is required' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id;
    return res.json({ userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
