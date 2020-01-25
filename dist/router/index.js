"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoute = _interopRequireDefault(require("./userRoute.js"));

var _orderRoute = _interopRequireDefault(require("./orderRoute.js"));

var _adminRoute = _interopRequireDefault(require("./adminRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // END SESSION -route common to all users i.e Admin and User

app.get('/logout', function (req, res) {
  req.session = null;
  res.json({
    message: "SESSION ENDED"
  });
}); // MOUNT THE SUB ROUTERS

app.use('/', _userRoute["default"]);
app.use('/', _orderRoute["default"]);
app.use('/', _adminRoute["default"]);
var _default = app;
exports["default"] = _default;