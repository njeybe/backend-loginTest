// hanldes business logics
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// this register logic will be called on routes
exports.registerUser = async (req, res, next) => {
  try {
    // requires email and password from the body
    const { email, password } = req.body;

    // bago magproceed iccheck muna ng system kung availabla yung email
    let user = await User.findOne({ email });

    // if hindi available mag sstatus 400 at message
    if (user) {
      return res.status(400).json({ message: " User already exists" });
    }

    // eto naman yung pag lalagyan ng mga data sa database
    User = new User({
      name,
      email,
      password,
    });

    // saving user after creating
    await user.save();

    // status after saving
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
    // error for backend or server
  } catch (err) {
    console.error("Error during registration", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// iccall din to sa routes
exports.loginUser = async (req, res, next) => {
  try {
    // require email and password sa body // frontend
    const { email, password } = req.body;

    // iccheck nya kung yung email and pass ay tama
    const user = await User.findOne({ email }).select("+password");

    // pag hindi tama ang kanilang credentials bibigyan sila ng status at message
    // at hindi rin ito mag llogin
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // checking kung pareho ba ang password na nilagay mo at hashed password na nakalagay sa db
    const isMatch = await user.matchPassword(password);

    // kung hindi pareho ang password mag error
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // kung tama naman ang lahat ng credentials, etong payload ang gagawan ng token
    const payload = {
      user: {
        id: user.id,
      },
    };
    // eto ang gagawa ng token para maging secure ang payload(id)
    jwt.sign(
      payload,
      process.env.JWT_SECRET,

      // mag eexpire ang tokoen within 24 hours
      {
        expiresIn: "24h",
      },
      (err, token) => {
        // kung may error sa pagawa, mag tthrow agad ng error
        if (err) throw err;

        // kung wala naman ibibigay agad ang token
        res.status(200).json({ success: true, token: token });
      }
    );
  } catch (err) {
    console.error("Error during login", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
