const express = require("express");
const schema = require("./random.schema");
const controller = require("./random.controller");
const validator = require("../../validators/validator");

const router = express.Router();
const { permissions } = require("./random.permission");
router
  .route(permissions.getRandomNumbers.path)
  .get(
    validator.validateBody(schema.getRandomNumbers),
    controller.getRandomNumbers
  );


module.exports = router;






