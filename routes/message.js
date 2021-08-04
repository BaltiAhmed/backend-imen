const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const messageControllers = require("../controllers/message");

route.post("/ajout", messageControllers.sendMessage);
route.get('/',messageControllers.getMessage)
route.get('/jardin/:id',messageControllers.getMessageByJardinId)

module.exports = route;
