import express  from "express";
import HelloController from "./controllers/hello-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import UserController from "./users/users-controller.js";
import AuthController from "./users/auth-controller.js";
import session from "express-session";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://daisylrx:Daisy19950507@cluster0.fiumri4.mongodb.net/?retryWrites=true&w=majority")
const app = express()
app.use(session({
    secret:"any string",
    resave:false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", "https://harmonious-zuccutto-ce2c32.netlify.app"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json())
TuitsController(app)
HelloController(app)
UserController(app)
AuthController(app)
app.listen(process.env.PORT || 4000);