const express = require('express');
const router = express.Router();
const { createUser, userLogin } = require('../controllers/user');
const { userSignUpValidation, userLoginValidation } = require('../../services/validations/userValidations');
const verifyJwtToken = require('../middlewares/authMiddleware');
const bodyErrorSender = require('../middlewares/bodyErrorSender');

router.post('/sign-up', userSignUpValidation, bodyErrorSender, createUser);
router.post('/login', userLoginValidation, bodyErrorSender, userLogin);

router.get('/test-jwt', verifyJwtToken, (req, res) => {
    return res.status(200).send({
        success: true,
        message: "Test Success"
    })
});

module.exports = router;
