// const jwt = require('jsonwebtoken');
// const User = require('../Module/UserRoute');
// const Admin = require('../Module/AdminRoute');

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, "aditya");

//       req.user = await User.findById(decoded.id).select('-password');
      
//       if (!req.user) {
//         req.user = await Admin.findById(decoded.id).select('-password');
//       }

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// };

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized as an admin');
//   }
// };




// module.exports = { protect, admin };





const jwt = require('jsonwebtoken');
const User = require('../Module/UserRoute');     // ✅ actual Mongoose models
const Admin = require('../Module/AdminRoute');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      // Try finding user
      req.user = await User.findById(decoded.id).select('-password');

      // If not found in User, try Admin
      if (!req.user) {
        req.user = await Admin.findById(decoded.id).select('-password');
      }

      // Still not found
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
