const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log('uri:', process.env.MONGO_URI)
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

module.exports = connectDB;
