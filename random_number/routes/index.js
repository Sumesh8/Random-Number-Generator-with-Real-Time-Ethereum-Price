const router = require("express").Router();
// Import body parser
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.json());
router.use(
  bodyParser.text({
    limit: "50mb",
    type: "*/xml",
  })
);


router.use(
  "/random", 
  require("../../src/random/random.router")
);


module.exports = router;