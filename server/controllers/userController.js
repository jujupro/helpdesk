const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userController = {};

//@desc create a new user
//@route /api/users
//@access public
userController.registerUser = async (req, res, next) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  //check if all fields are filled out
  if (!name || !email || !password) {
    return next({
      log: 'All fields are required',
      status: 400,
      message: { err: 'All fields are required' },
    });
  }

  //check if user already exist
  userExists = await User.findOne({ email });
  if (userExists) {
    return next({
      log: 'User already exists with this email',
      status: 400,
      message: { err: 'User already exists with this email' },
    });
  }

  //valid request now hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create new user in DB
  const user = await User.create({ name, email, password: hashedPassword });
  //send the newly created user data to the frontend
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      //isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    return next({
      log: 'Failed to create new user in DB',
      status: 400,
      message: { err: 'Invalid user data' },
    });
  }
};

//@desc login a user
//@route /api/users/login
//@access public
userController.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check user exist and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      //isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    return next({
      log: 'Invalid credentials',
      status: 401,
      message: { err: 'Invalid credentials' },
    });
  }
};

//@desc get current user
//@route /api/users/me
//@access public

userController.getMe = async (req, res, next) => {
  if (!res.locals.user) {
    return next({
      log: 'Not authorized',
      status: 401,
      message: { err: 'Not authorized' },
    });
  }
  const userInfo = {
    id: res.locals.user._id, //change to id instead of _id
    email: res.locals.user.email,
    name: res.locals.user.name,
    isAdmin: res.locals.user.isAdmin,
  };

  res.status(200).json(userInfo);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });
};

module.exports = userController;
