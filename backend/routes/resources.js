const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const Resource = require("../models/resource");
const { date } = require("joi");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

router.post("/", authenticate, async (req, res) => {
  try {
    const { email, name } = req.user;

    const newResource = new Resource({
      userEmail: email,
      userName: name,
      resourceName: req.body.resourceName,
      resourceDomain: req.body.resourceDomain,
      resourceDescription: req.body.resourceDescription,
    });

    await newResource.save();

    res.status(200).send({ message: "Resource Posted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const resources = await Resource.find().sort({ datePosted: -1 });
    return res.json(resources);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving Resources", error: error });
  }
});
module.exports = router;
