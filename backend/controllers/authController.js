const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitizeUser = (userDoc) => ({
  _id: userDoc._id,
  name: userDoc.name,
  email: userDoc.email,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});


// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user: sanitizeUser(user),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// LOGIN
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: sanitizeUser(user),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};