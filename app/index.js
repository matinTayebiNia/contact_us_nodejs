const express = require('express')
const app = express();
const http = require("http")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("express-flash")
const path = require("path");
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts')
const rememberLogin = require("app/http/middleware/rememberLogin");
const Helpers = require("app/Helpers")
const passport = require('passport');
const methodOverride = require('method-override')

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection()
        this.configResources();
        this.configSessions()

        this.passportConfig()
        this.setRoutes();
    }

    setupExpress() {
        const server = http.createServer(app)
        server.listen(3000, () => {
            console.log("server is running on port 3000")

        })
        const io = require("socket.io")(server)
        this.configSocketIo(io)
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/contactUS", {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

    }

    configResources() {
        app.use(express.static("public"))
        app.set('view engine', "ejs")
        app.set("views", path.resolve("./resources/views"))
        app.use(expressLayout);
        app.set('layout', 'home/master')
        app.set("layout extractScripts", true)
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        // Add headers before the routes are defined
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000/');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
    }

    configSessions() {
        app.use(session({
            name: "session_contact_us_nodejs",
            secret: "hdiahdwakpnJK484d6wa78mamjakFHGVBHknadk",
            resave: true,
            saveUninitialized: true,
            cookie: {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            },
            store: MongoStore.create({
                mongoUrl: "mongodb://localhost:27017/contactUS",

            })
        }));
        //use cookieParser and set secretKey for cookie
        app.use(cookieParser("hdiahdwakpnJK484d6wa78mamjakFHGVBHknadk"));
        //use connect-flash
        app.use(flash());
        app.use(methodOverride('_method'))

    }

    passportConfig() {
        require("app/passport/passport-local")
        app.use(passport.initialize({}));
        app.use(passport.session({}));
        app.use(rememberLogin.handel);
        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getUser();
            next();
        })
    }

    setRoutes() {
        app.use(require("../routes/web"))
    }

    configSocketIo(io) {
        io.on("connection", function (socket) {
            socket.on("messageSent", function (message) {
                socket.broadcast.emit("messageSent", message);
            });
        });
    }
}
