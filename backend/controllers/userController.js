const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing && String(existing._id) !== String(user._id)) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    const sanitized = await User.findById(user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: sanitized,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

