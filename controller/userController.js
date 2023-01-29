const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }


    const newUser = await User.create(req.body);

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist/ Signup first" });
    }
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { _id, phoneNumber, firstname } = user;
    const JWTtoken = jwt.sign({ _id, phoneNumber, firstname }, req.app.get('secretKey'), {
      expiresIn : '2h'
    });
    return res
      .status(200)
      .json({ token: JWTtoken, message: "Sign in successfull" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};


exports.testApi =  (req, res) => {
  console.log('test api');
  return res.json({message: "You are verified"});
} 