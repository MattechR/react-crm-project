const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // validate user's input
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // validate system
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send("Invalid Password");
  }

  // process
  const token = user.generateAuthToken();
  // create JWT

  // response
  res.send({ token });
});

function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = router;
