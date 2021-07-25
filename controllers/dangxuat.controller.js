module.exports.logout = function(req, res) {
    res.clearCookie('userId');
    res.redirect('/');
  };