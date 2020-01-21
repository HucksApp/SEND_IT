"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSQL;

function createSQL(db) {
  db.query("CREATE TABLE IF NOT EXISTS users(\n        email VARCHAR(50) NOT NULL UNIQUE,\n        phone_number BIGINT NOT NULL,\n        username VARCHAR(30) NOT NULL,\n        user_password VARCHAR(30) NOT NULL,\n        address VARCHAR(50),\n        order_counts INT DEFAULT 0,\n        PRIMARY KEY(email, phone_number)\n    );\n    \n    ", function (err, result) {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log("SQL FOR USER IS VALID !!!");
    }
  });
  db.query("\n\n            CREATE TABLE IF NOT EXISTS orders(\n                user_email VARCHAR(30) NOT NULL,\n                order_id INT NOT NULL,\n                receiver_name VARCHAR(30) NOT NULL,\n                destination_address VARCHAR(80) NOT NULL,\n                pickup_address VARCHAR(80) NOT NULL,\n                receiver_phone_no BIGINT NOT NULL,\n                order_date TIMESTAMP DEFAULT now(),\n                c_location VARCHAR(80) DEFAULT 'Storage',\n                status VARCHAR(20) DEFAULT 'In transit',\n                PRIMARY KEY(user_email, order_id),\n                FOREIGN KEY(user_email) REFERENCES users(email) ON DELETE CASCADE\n            );\n\n            ", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("SQL FOR ORDERS IS VALID !!!");
    }
  });
}