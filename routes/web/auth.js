const express = require('express');
const routes = express.Router();

const registerController=require("app/http/controller/auth/RegisterController")
const loginController=require("app/http/controller/auth/LoginController")
//requests
const registerRequest=require("app/http/Request/registerRequest")
const loginRegister=require("app/http/Request/loginRegister")

routes.get('/login', loginController.showLoginForm);
routes.post('/login', loginRegister.handel(), loginController.loginProccess);
//register
routes.get('/register', registerController.showRegisterForm);
routes.post('/register', registerRequest.handel(), registerController.RegisterProccess);

module.exports = routes;