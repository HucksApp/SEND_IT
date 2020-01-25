"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../config/auth/auth.js"));

var _db = require("../db/db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var message; // GET USER ORDERS

router.get('/order', _auth["default"], function (req, res) {
  if (req.session._ctx) {
    console.log('here');
    var email = req.session._ctx.decoded.email;
    var id = email;

    _db.client.query('SELECT * FROM orders WHERE user_email = $1', [id], function (err, result) {
      if (err) {
        console.log(err);
      } else if (result) {
        res.json(result.rows);
      }
    });
  } else {
    message = "NO CREDENTIALS";
    res.status(412).send({
      message: message,
      sucess: false
    });
  }
}); //UPDATE ORDER DESTINATION

router.put('/update_destination', _auth["default"], function (req, res) {
  if (req.session._ctx) {
    var email = req.session._ctx.decoded.email;
    var id = email;
    var _req$body = req.body,
        ordId = _req$body.ordId,
        upDestnAddress = _req$body.upDestnAddress;

    _db.client.query('UPDATE orders SET destination_address= $1 WHERE user_email = $2  AND order_id = $3', [upDestnAddress, id, parseInt(ordId)], function (err, result) {
      if (err) {
        console.log(err);
      } else if (result) {
        message = "UPDATED DESTINATION ORDER  ".concat(id);
        res.send({
          message: message,
          sucess: true
        });
      }
    });
  } else {
    message = "NO CREDENTIALS";
    res.status(412).send({
      message: message,
      sucess: false
    });
  }
}); //GET ORDER LOCATION

router.get('/map', function (req, auth, res) {
  if (req.session._ctx) {
    var email = req.session._ctx.decoded.email;
    var id = email;
    var ord = req.query.ordCk;

    _db.client.query('SELECT pickup_address, c_location FROM orders WHERE user_email=$1 AND order_id = $2', [id, parseInt(ord)], function (err, result) {
      if (err) {
        console.log(err);
      }

      ;
      res.json(result.rows);
    });
  } else {
    message = "NO CREDENTIALS";
    res.status(412).send({
      message: message,
      sucess: false
    });
  }
}); //DELETE ORDER

router["delete"]('/delete_order/:del', _auth["default"], function (req, res) {
  console.log(req.params.del);

  if (req.session._ctx) {
    var del = parseInt(req.params.del);
    var email = req.session._ctx.decoded.email;
    var id = email;

    _db.client.query('DELETE FROM orders WHERE user_email = $1 AND order_id = $2', [id, del], function (err, result) {
      if (err) {
        console.log(err);
      } else if (result) {
        message = "ORDER ".concat(del, " DELETED");
        res.send({
          message: message,
          sucess: true
        });
      } else {}
    });
  } else {
    message = "NO CREDENTIALS";
    res.status(405).send({
      message: message,
      sucess: false
    });
  }
}); // ADD NEW ORDER

router.post('/new_order', _auth["default"], function (req, res) {
  if (req.session._ctx) {
    var _req$body2 = req.body,
        receiverName = _req$body2.receiverName,
        destinationAddress = _req$body2.destinationAddress,
        pickupAddress = _req$body2.pickupAddress,
        receiverPhoneNumber = _req$body2.receiverPhoneNumber;
    var email = req.session._ctx.decoded.email;
    var id = email;

    _db.client.query('SELECT MAX(order_id) FROM orders WHERE user_email=$1', [id], function (err, result) {
      var order_id_Nt;

      if (err) {
        console.log(err);
      } else if (result.rows[0].max != null) {
        var max = result.rows[0].max;
        order_id_Nt = max + 1;
      } else if (result.rows[0].max == null) {
        order_id_Nt = 1;
      } else {
        console.log('ERR CREATING ORDER ID');
      }

      ;

      _db.client.query('INSERT INTO orders(user_email, order_id, receiver_name,destination_address,pickup_address,receiver_phone_no) VALUES($1,$2,$3,$4,$5,$6)', [id, order_id_Nt, receiverName, destinationAddress, pickupAddress, receiverPhoneNumber], function (err, results) {
        if (err) {
          console.log(err);
        }

        ;

        _db.client.query('SELECT order_counts FROM users WHERE email = $1', [id], function (err, result) {
          if (err) {
            console.log(err);
          } else if (result) {
            var new_count = result.rows[0].order_counts + 1;

            _db.client.query('UPDATE users SET order_counts = $2 WHERE email = $1', [id, new_count], function (err, result) {
              if (err) {
                console.log('errrrrr' + err);
              }

              ;
              message = "ORDER ENTRY ADDED";
              res.send({
                message: message,
                sucess: true
              });
            });
          } else {
            console.log('ERR UPDATING ORDERS SUM FOR USER');
          }
        });
      });
    });
  } else {
    res.status(406);
  }
});
var _default = router;
exports["default"] = _default;