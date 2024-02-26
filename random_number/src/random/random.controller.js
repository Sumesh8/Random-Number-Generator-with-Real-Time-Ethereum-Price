const service = require("./random.service2");

module.exports.getRandomNumbers = async (req, res) => {
    try {
      const data = await service.getRandomNumbers(req.body);
      return res.json({
        status: true,
        data,
        })
    } catch (error) {
      console.log(error);
      return res.status(422).json({
        status: false,
        msg: error.message,
    })
    }
  };