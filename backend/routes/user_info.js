const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      const user = await User.findOne({ _id: decoded._id});
        
      console.log(user);

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
  try {
    const { name, email, department, batch} = req.user;
    return res.json({ name : name, email :email , department : department , batch :batch });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/find',  async (req, res) => {
  try {
    const { email} = req.query;
    const user = await User.findOne({email: email});
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
