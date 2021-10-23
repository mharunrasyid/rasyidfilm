var jwt = require("jsonwebtoken");

module.exports = {
  isLoggedIn: function (req, res, next) {
    console.log(req.headers.authorization);
      let token = req.headers.authorization.replace("Bearer ", "");
      jwt.verify(token, "shhhhh", function (err, decoded) {
        if (err) return res.status(401).json(err);
        req.body.userToken = decoded;
        next();
      });
  },
};
