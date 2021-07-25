const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.requireAuth = async function(req, res, next) {
  console.log(req.signedCookies.userId);
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }

  var user = await User.findOne({
    _id: req.signedCookies.userId
  }).exec();
  console.log(user);
  if (!user) {
    console.log(1);
    res.redirect('/login');
    return;
  }
  console.log(2);
  res.locals.user = user;
  console.log(res.locals.user);
  next();
};
