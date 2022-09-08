const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validateUser, User } = require("../models/users");
const auth = require("../middleware/auth");
const { validateCards } = require("../models/users");
const { Card } = require("../models/cards");

router.get("/my-cards", auth, async (req, res) => {
  if (!req.user.biz) return res.status(401).send("Access denied.");
  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);
});

router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const count = await Card.countDocuments({
    bizNumber: { $in: req.body.cards },
  });

  if (count !== req.body.cards.length) {
    res.status(400).send("the numbers must be existing bizNumbers");
    return;
  }
  const user = await User.findById(req.user._id);
  user.cards = _.uniq([...user.cards, ...req.body.cards]);
  await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  // validate user's input
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  error;
  // validate system
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  // process
  user = await new User(req.body);

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // response
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
