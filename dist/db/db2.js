"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pool = _pg["default"].Pool;
var pool = new Pool({
  user: "Ahrabprince",
  host: "localhost",
  database: "hucks",
  password: "pussypie",
  port: 5432
});
var client = pool;
exports.client = client;