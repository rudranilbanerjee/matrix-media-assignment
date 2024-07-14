const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ isError:true, message: 'Username already exists' });
    }

    // If the username does not exist, create a new user
    const user = new User({ username, password });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token will expire after 1 hour
    });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ isSuccess:true, isRegister:true, userId:user._id, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ isError:true, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ isError:true, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });

    res.json({ isSuccess:true, isLogged:true, userId:user._id, message: 'User logged in successfully' });
  } catch (error) {
    res.status(400).json({ isError:true,message: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ isSuccess:true, message: 'User logged out successfully' });
};
