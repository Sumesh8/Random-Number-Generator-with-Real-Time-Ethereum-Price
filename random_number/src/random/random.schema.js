const joi = require("joi");

module.exports.getRandomNumbers = joi.object().keys({
    min: joi.number().required(),
    max: joi.number().required(),
    quantity: joi.number().required(),
    is_repeat: joi.boolean().required(),
  });