const express = require('express');
const { signup, signin, testApi } = require('../controller/userController');
const { validateJwt } = require('../middleware/jwt');
const router = express.Router();

router.post("/signup" ,signup)
router.post("/signin" ,signin)
router.post("/test" , validateJwt, testApi)

module.exports = router;