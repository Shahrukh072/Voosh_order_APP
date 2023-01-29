const express = require("express")
const router = express.Router()
const controller = require("../controller/orderController")
const { validateJwt } = require('../middleware/jwt');

router.post( "/checkout",  validateJwt, controller.checkout);

router.get( "/order", validateJwt, controller.order);


module.exports = router

