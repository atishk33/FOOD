const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async (req, res) => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Database connected successfully');
});

module.exports = {
  connectDB,
};
