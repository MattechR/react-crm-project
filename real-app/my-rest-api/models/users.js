const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign(
    {
      _id: this._id,
      biz: this.biz,
    },
    config.get("jwtKey")
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateCards(cards) {
  const schema = Joi.object({
    cards: Joi.array()
      .items(Joi.number().min(100).max(9_999_999_999))
      .unique()
      .min(1)
      .required(),
  });

  return schema.validate(cards);
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
  validateCards,
};
