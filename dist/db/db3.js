"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;

var _pg = require("pg");

var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
exports.client = client;
client.connect();