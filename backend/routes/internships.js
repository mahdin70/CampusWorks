const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const Internship = require("../models/internship");

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

    const newInternship = new Internship({
      userEmail: email,
      userName: name,
      positionName: req.body.positionName,
      companyName: req.body.companyName,
      internshipDomain: req.body.internshipDomain,
      applyMedium: req.body.applyMedium,
      lastDateToApply: new Date(req.body.lastDateToApply),
      description: req.body.description,
    });

    await newInternship.save();

    res.status(200).send({ message: "Internship Posted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const currentDate = new Date();
    const internships = await Internship.find({ lastDateToApply: { $gt: currentDate } })
      .sort({ lastDateToApply: 1 }) // Sort in ascending order of days remaining
      .exec();

    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving internships", error: error });
  }
});

module.exports = router;
