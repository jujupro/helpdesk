const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //console.log('bearer token:', req.headers.authorization);
    try {
      //get the token from request header
      token = req.headers.authorization.split(' ')[1];
      //decode the user from the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get the user from the token and save it in res.locals
      res.locals.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return next({
        log: 'Not authorized',
        status: 401,
        message: { err: error },
      });
    }
  }
  if (!token) {
    return next({
      log: 'Not authorized',
      status: 401,
      message: { err: 'Not authorized' },
    });
  }
};

module.exports = { protect };
