"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Authentication;
exports.generateToken = generateToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Authentication(req, res, next) {
  var userStr = req.headers["authorization"];

  if (typeof userStr !== "undefined") {
    var userVar = userStr.split(" ");
    var token = userVar[0];
    console.log(token);

    _jsonwebtoken["default"].verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(403).send({
          message: "YOU DO NOT HAVE CLARIFICATION TO VIEW THIS DATA",
          err: err,
          valid: false
        });
      } else if (decoded) {
        req.decoded = decoded;
        next();
      } else {
        res.status(403).send({
          message: "AUTHORIZATION FAILED",
          valid: false
        });
      }
    });
  } else {
    res.status(403).send({
      message: "YOU DO NOT HAVE CLARIFICATION TO VIEW THIS DATA",
      valid: false
    });
  }
}

;

function generateToken(req, superuser, func) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  _jsonwebtoken["default"].sign({
    email: email,
    password: password,
    superuser: superuser
  }, process.env.SECRET, {
    expiresIn: 60 * 60
  }, function (err, token) {
    func(err, token);
  });
}

;