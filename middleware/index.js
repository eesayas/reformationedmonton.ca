/*
@desc This is a middleware for logged in
*/
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next();
      res.redirect('/login');
}

module.exports = { isLoggedIn };