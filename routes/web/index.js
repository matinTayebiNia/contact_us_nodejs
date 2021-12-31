const express = require('express');
const routes = express.Router();

//middleware
const redirectIfAuthenticated = require("app/http/middleware/redirectIfAuthenticated")
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin')

const homeRoutes = require("./home")
routes.use("/", homeRoutes)


const AdminRoutes = require("./admin")
routes.use("/admin", redirectIfNotAdmin.handel, AdminRoutes)


const AuthRoutes = require("./auth")
routes.use("/auth", redirectIfAuthenticated.handel, AuthRoutes)

module.exports = routes;