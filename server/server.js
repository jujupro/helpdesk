const express = require('express');
const app = express();
const path = require('path');

// if (process.env.NODE_ENV === 'production') {
// serve the frontend React code
app.use('/build', express.static(path.join(__dirname, '../build')));

// Start point of entire app. Browser hits route '/' -> serve index.html
app.get('/', (req, res) => {
  //inside index.html, there is src="build/bundle.js" hence it will fire line 20
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
// }
app.listen(3000); //listens on port 3000 -> http://localhost:3000/
