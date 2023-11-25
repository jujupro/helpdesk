const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const connectDB = require('./db');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');
// const { protect } = require('./controllers/auth');

app.use(express.json()); //to receive req.body
app.use(express.urlencoded({ extended: false }));

//routes
// app.use('/new-ticket', protect, (req, res) => {
//   console.log('i passed protect new-ticket route');
// });
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);

//connect to DB
connectDB();

//!!!Only for production mode, because this server is listening to port 3000 and development mode starts at port 8080
if (process.env.NODE_ENV === 'production') {
  // Statically serve all files in the build folder (bundle.js & index.html)
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // !!!Start point of entire app. Browser hits route '/' -> serve index.html
  app.get('/', (req, res) => {
    //inside index.html, there is src="build/bundle.js" hence it will fire line 27
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

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
