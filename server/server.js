const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const userRouter = require('./routes/userRoutes');
const connectDB = require('./db');
const dotenv = require('dotenv').config();

//to receive req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to DB
connectDB();

if (process.env.NODE_ENV === 'production') {
  // serve the frontend React code
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // Start point of entire app. Browser hits route '/' -> serve index.html
  app.get('/', (req, res) => {
    //inside index.html, there is src="build/bundle.js" hence it will fire line 20
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

//routes
app.use('/api/users', userRouter);

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(
    `Server listening on port: ${PORT} in ${process.env.NODE_ENV} mode...`
  );
});
