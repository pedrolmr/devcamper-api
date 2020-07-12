const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
//Load env variables
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mout routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1)); //the 1 exits with failure
});
