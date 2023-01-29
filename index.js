const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require('./config/mongoose')
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/user', userRoutes);
app.use('/order', orderRoutes)

app.set('secretKey', "voosh");

//validate jwt
function validateJwt(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}

app.get('/', function (req, res) {
    res.json({
        "body": "Order APP"
    });
});



app.listen(port, () => {
    console.log("Server is running on port" + port)
});