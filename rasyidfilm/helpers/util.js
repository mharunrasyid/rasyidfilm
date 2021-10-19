var jwt = require("jsonwebtoken");

module.exports = {
  isLoggedIn: function (req, res, next) {
    let token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (err) next(err);
      req.body.userToken = decoded;
      next();
    });
  },
};
