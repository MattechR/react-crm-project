const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Card, validateCard, generateBizNumber } = require("../models/cards");

router.get("/my-cards", auth, async (req, res) => {
  if (!req.user.biz) return res.status(401).send("Access denied.");
  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);
});

router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndDelete({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }
  res.send("deleted", card);
});

router.put("/:id", auth, async (req, res) => {
  // validate user's input
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let card = await Card.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    req.body
  );
  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }

  card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  console.log(card);
});

router.get("/:id", auth, async (req, res) => {
  // validate user's input
  // process
  const card = await Card.find({ _id: req.params.id, user_id: req.user._id });

  // validate system
  if (!card) {
    res.status(404).send("The card with the given ID was not found");
    return;
  }

  // response
  res.send(card);
});

router.post("/", auth, async (req, res) => {
  //validate user's input
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //validate system

  //process
  let card = await new Card({
    bizImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    ...req.body,
    bizNumber: await generateBizNumber(),
    user_id: req.user._id,
  }).save();

  res.send(card);
});

module.exports = router;
