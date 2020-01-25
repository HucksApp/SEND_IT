"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireWildcard(require("../config/auth/auth.js"));

var _db = require("../db/db.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var message;
var superuser = true; //UPDATE STATUS *****ADMIN

router.put('/update_status', _auth["default"], function (req, res) {
  var _req$body = req.body,
      toUpdateId = _req$body.toUpdateId,
      userUpdateId = _req$body.userUpdateId,
      toUpdateStatus = _req$body.toUpdateStatus;

  if (req.session._ctx && req.session._ctx.decoded.superuser == true) {
    _db.client.query('UPDATE orders SET status = $1 WHERE user_email =$2 AND order_id = $3', [toUpdateStatus, userUpdateId, toUpdateId], function (err, result) {
      if (err) {
        console.log(err);
      }

      ;
      res.send('updated order status');
    });
  } else {
    res.sendStatus(405);
  }
}); //UPDATE LOCATION**** ADMIN

router.put('/update_location', _auth["default"], function (req, res) {
  if (req.session._ctx && req.session._ctx.decoded.superuser == true) {
    var _req$body2 = req.body,
        userUpdateId = _req$body2.userUpdateId,
        toUpdateLotn = _req$body2.toUpdateLotn,
        toUpdateId = _req$body2.toUpdateId;

    _db.client.query('UPDATE orders SET c_location = $1 WHERE user_email =$2 AND order_id= $3', [toUpdateLotn, userUpdateId, parseInt(toUpdateId)], function (err, result) {
      if (err) {
        console.log(err);
      }

      res.send('updated location');
    });
  } else {
    res.sendStatus(412);
  }
}); //GET ALL ORDERS ***** ADMIN

router.get('/admin_orders', _auth["default"], function (req, res) {
  if (req.session._ctx && req.session._ctx.decoded.superuser == true) {
    _db.client.query('SELECT * FROM orders', function (err, result) {
      if (err) {
        console.log(err);
      }

      res.json(result.rows);
    });
  } else {
    res.status(403).json({
      message: "RESTRICTED",
      valid: false
    });
  }
}); // VERIFY ADMIN ***** ADMIN

router.post('/admin', function (req, res) {
  var _req$body3 = req.body,
      password = _req$body3.password,
      email = _req$body3.email;

  _db.client.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [email, password], function (err, result) {
    if (err) {
      console.log(err);
    } else if (result) {
      if (result.rows.length == 0) {
        res.status(302).json({
          message: 'ADMIN CREDENIALS IS INVALID',
          valid: false
        });
      } else if (result.rows.length != 0) {
        (0, _auth.generateToken)(req, superuser, function (err, token) {
          if (err) {
            message = 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
            res.status(302).json({
              message: message,
              error: err.detail,
              valid: false
            });
          } else if (token) {
            message = " ADMIN SESSION VALID'";
            res.status(200).json({
              message: message,
              token: token,
              expire: "1 HOUR",
              valid: true
            });
          } else {
            message = "COULD NOT GENERATE A TOKEN FOR THE SESSION";
            res.status(302).json({
              message: message,
              error: err.detail,
              valid: false
            });
          }
        });
      }
    } else {
      res.send({
        message: 'AN ERROR OCCURED WHILE CHECKING YOUR CREDENTIALS',
        valid: false
      });
    }
  });
});
var _default = router;
exports["default"] = _default;