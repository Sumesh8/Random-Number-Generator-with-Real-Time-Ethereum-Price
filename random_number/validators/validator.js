module.exports.validateBody =
    (schema) =>
    // eslint-disable-next-line consistent-return
    (req, res, next) => {
        try {
            const result = schema.validate(req.body)

            if (result.error) {
                return res.status(422).json({
                    status: false,
                    msg: result.error.details[0].message,
                })
            }
        } catch (error) {
            return res.status(422).json({
                status: false,
                msg: `Internal Server Error ${error.message}`,
            })
        }
        next()
    }