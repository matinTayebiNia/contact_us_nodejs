const express = require('express');
const routes = express.Router();


const indexController = require("app/http/controller/fronEnd/indexController")
const {logout} = require("app/http/controller/auth/LoginController")

routes.get("/", indexController.index)

routes.get('/logout', logout)

routes.post("/contact_us", indexController.contact_us)

module.exports = routes;