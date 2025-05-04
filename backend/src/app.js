const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;