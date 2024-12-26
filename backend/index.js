const express = require("express");
const dotenv = require('dotenv').config();
const authMiddleware = require('./helpers/authMiddleware');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import cors
const app = express();

const debtCreditRoutes = require("./routes/debtcredRoutes");

// CORS configuration: Allow requests from the frontend (localhost:3000)
app.use(cors({
  origin: ['http://localhost:3000', 'http://frontend:3000'], // Allow both localhost and Docker service name
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
}));

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authRoutes'));
app.use('/cat', authMiddleware, require('./routes/catRoutes'));
app.use('/exp', authMiddleware, require('./routes/expRoutes'));
app.use("/api", authMiddleware, require('./routes/debtcredRoutes'));
app.use("/rep", authMiddleware, require('./routes/repRoutes'));

const port = 8000;
app.listen(port, () => console.log('Server is running on port ' + port));
