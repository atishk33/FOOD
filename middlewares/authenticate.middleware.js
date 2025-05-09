const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const userCollection = require("../models/user.model");


const authenticate = asyncHandler(async (req, res, next) => {
    console.log(req.cookies);
    let token = (req.Cookies?.myCookie);

    if (!token) throw new errorHandler("please login first", 401);

    let decoded = jwt.verify(token,"secret-key");
    let user=await userCollection.findById(decodedToken.id);
    if (!user) throw new errorHandler("user not found", 404);

    if (user.tokenVersion !== decodedToken.tokenVersion)
         throw new errorHandler("invalid token", 401);
       // console.log(decodedToken);

       //! adding a new key-value pair in req object
       req.myUser = user;
       next();

});

module.exports = {authenticate};




//! 
