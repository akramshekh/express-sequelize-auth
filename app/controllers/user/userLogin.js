const { validationResult } = require("express-validator");
const User = require("../../../sequelize/models/user");
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    try {

        const { email } = req.body;

        const userData = await User.findOne({
            where: {
                email
            },
            attributes: {
                exclude: ['password']
            },
            raw: true
        })

        const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).send({
            success: true,
            message: "createLogin",
            token
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while trying to login"
        })
    }
}

module.exports = userLogin