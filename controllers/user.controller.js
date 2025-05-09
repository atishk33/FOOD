const userCollection = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const { generateToken } = require('../utils/jwt.utils');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

let existingUser = await userCollection.findOne({ email });
if (existingUser) throw new ErrorHandler ("email already exists",400);

    let newUser = await userCollection.create({
        name,
        email,
        password,
    });
    res.status(201).json({
        success: true,
        message: 'User registered Successfully',
        data: newUser,
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists in DB
    const existingUser = await userCollection.findOne({ email });
    if (!existingUser) throw new ErrorHandler("Please register first", 400);

    // Match the password
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) throw new ErrorHandler("Invalid credentials", 400);

    // Generate token
    const token = await generateToken(existingUser._id, existingUser.tokenVersion);
    // console.log(token);

    // Set cookie
    res.cookie("myCookie", token, {
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
        secure: true,
        httpOnly: true,
        sameSite: 'strict', // (optional but good for security)
    });

    // Send response
    res.status(200).json({
        success: true,
        message: "Login successful",
        token,
    });
});


const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("myCookie", {
        secure: true,
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Logout successfully',
    });
});

const updateUserProfile = asyncHandler(async (req, res) => {});

const updateuserPasword = asyncHandler(async (req, res) => {});

const deleteUserProfile = asyncHandler(async (req, res) => {
    const {_id}=req.myUser;
});

const getLoggedInUserProfile = asyncHandler(async (req, res) => {});


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};