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
var superuser = false; //GET USER

router.get('/account', _auth["default"], function (req, res) {
  if (req.session) {
    var email = req.session._ctx.decoded.email;
    var id = email;
    console.log(req.session._ctx.decoded);

    _db.client.query('SELECT * FROM users WHERE email= $1', [id], function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json(result.rows);
        console.log('here 4');
      }
    });
  } else {
    console.log('here 5');
    res.sendStatus(412);
  }
}); //UPDATE USER INFORMATION

router.put('/update_profile', _auth["default"], function (req, res) {
  if (req.session) {
    var _req$body = req.body,
        keyToValue = _req$body.keyToValue,
        newVal = _req$body.newVal;
    console.log(req.body, req.session);
    var email = req.session._ctx.decoded.email;
    var id = email;
    console.log(email);

    if (keyToValue == 'user-name') {
      _db.client.query('UPDATE users SET username = $1 WHERE email = $2 ', [newVal, id], function (err, result) {
        if (err) {
          console.log(err);
        } else if (result) {
          res.send('MODIFIED');
        } else {
          res.send('COMMAND UNKNOWN');
        }
      });
    } else if (keyToValue == 'house-address') {
      _db.client.query('UPDATE users SET address = $1 WHERE email = $2 ', [newVal, id], function (err, result) {
        if (err) {
          console.log(err);
        } else if (result) {
          res.send('MODIFIED');
        } else {
          res.send('COMMAND UNKNOWN');
        }
      });
    } else if (keyToValue == 'phone-number') {
      console.log('here phone');

      _db.client.query('UPDATE users SET phone_number = $1 WHERE email = $2 ', [newVal, id], function (err, result) {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log('here devivered');
          res.send('MODIFIED');
        } else {
          res.send('COMMAND UNKNOWN');
        }
      });
    } else if (keyToValue == 'password') {
      _db.client.query('UPDATE users SET user_password = $1 WHERE email = $2 ', [newVal, id], function (err, result) {
        if (err) {
          console.log(err);
        } else if (result) {
          res.send('MODIFIED');
        } else {
          res.send('COMMAND UNKNOWN');
        }
      });
    }
  } else {
    res.sendStatus(406);
  }
}); //VERIFY USER AND GRANT TOKEN

router.post('/old_user', function (req, res) {
  console.log('JUST HERE');

  if (req.body) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    _db.client.query('SELECT * FROM users WHERE email = $1 AND user_password = $2', [email, password], function (err, result) {
      if (err) {
        console.log(err);
      }

      ;
      var rows = result.rows;

      if (rows.length != 0) {
        console.log('JUST HERE 1');
        (0, _auth.generateToken)(req, superuser, function (err, token) {
          console.log('JUST HERE 2');

          if (err) {
            message = 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
            res.status(302).json({
              message: message,
              error: err.detail,
              valid: false
            });
          } else if (token) {
            console.log('JUST HERE 3');
            req.session = {
              id: email
            };
            message = "LOGGED IN SUCCESFULLY AND SESSION CREATED";
            res.status(200).json({
              message: message,
              token: token,
              expire: "1 HOUR",
              valid: true
            });
          } else {
            console.log('JUST HERE 4');
            message = "COULD NOT GENERATE A TOKEN FOR THE SESSION";
            res.status(302).json({
              message: message,
              error: err.detail,
              valid: false
            });
          }
        });
      } else if (rows.length == 0) {
        console.log('JUST HERE 5');
        message = "INVALID CREDENTIALS !!!";
        res.status(404).json({
          message: message,
          valid: false
        });
      }
    });
  } else {
    return;
  }
}); // CREATE USER AND GRANT TOKEN

router.post('/new_user', function (req, res) {
  var _req$body3 = req.body,
      username = _req$body3.username,
      phoneNumber = _req$body3.phoneNumber,
      houseAddress = _req$body3.houseAddress,
      password = _req$body3.password,
      email = _req$body3.email;
  console.log(req.body);

  _db.client.query('SELECT * FROM users WHERE email=$1', [email], function (err, result) {
    if (err) {
      console.log(err);
    }

    ;
    var rows = result.rows;

    if (rows.length != 0) {
      message = "YOU HAVE AN ACCOUNT ALREADY!!!";
      res.status(302).json({
        message: message,
        valid: false
      });
    } else if (rows.length == 0) {
      _db.client.query('SELECT * FROM users WHERE phone_number=$1', [phoneNumber], function (err, result) {
        if (err) {
          console.log(err);
        }

        ;
        var rows = result.rows;

        if (rows.length != 0) {
          message = 'YOUR PHONE NUMBER IS  REGISTERED TO ANOTHER PROFILE!!!';
          res.status(302).json({
            message: message,
            valid: false
          });
        }

        if (rows.length == 0) {
          _db.client.query('INSERT INTO users(email,phone_number,username,user_password,address) VALUES($1,$2,$3,$4,$5)', [email, phoneNumber, username, password, houseAddress], function (err, result) {
            if (err) {
              console.log(err);
            } else {
              (0, _auth.generateToken)(req, superuser, function (err, token) {
                if (err) {
                  message = 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
                  res.status(302).json({
                    message: message,
                    error: err.detail,
                    valid: false
                  });
                } else if (token) {
                  message = " NEW USER ADDED AND SESSION CREATED";
                  req.session = {
                    id: email
                  };
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
          });
        }
      });
    }
  });
});
var _default = router;
exports["default"] = _default;