const express = require('express');
const routes = express.Router();

//controller
const adminController = require("app/http/controller/Admin/adminController")
const ContactController = require("app/http/controller/Admin/ContactController")


routes.use((req, res, next) => {
    res.locals.layout = 'admin/master'
    next()
})


routes.get('/', adminController.index);
//contact_us
routes.get('/contact_us', ContactController.index)
routes.delete('/contact_us/delete/:id', ContactController.destroy)


module.exports = routes;