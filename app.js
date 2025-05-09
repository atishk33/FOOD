const express =require("express");
const userRouters = require("./routes/user.routes"); 
const router = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

//! middleware section
app.use(express.json());

app.use(cookieParser());

app.use("/user/v1", userRouters);


//!error middleware

app.use (Error)
module.exports = app;