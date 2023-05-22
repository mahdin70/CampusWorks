const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

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


  router.get('/', authenticate, async (req, res) => {
    try{
        const { email } = req.user;
        const jobs = await Job.find({userEmail : email}).sort({datePosted: -1});

        return res.json(jobs);
    }catch (error) {
        return res.status(500).json({ message: 'Error retrieving jobs', error: error});
    }
  });

  module.exports = router;
