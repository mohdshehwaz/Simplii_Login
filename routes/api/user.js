const express = require('express');
const router = express.Router();
const userMethod = require('../../controllers/user_controller');

router.post('/create-otp',userMethod.create_otp);
router.post('/verify-otp',userMethod.verify_otp);
module.exports = router;