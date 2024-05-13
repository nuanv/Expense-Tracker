const express = require("express");
const dotenv = require('dotenv').config();
const authMiddleware = require('./helpers/authMiddleware');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const debtCreditRoutes = require("./routes/debtcredRoutes");

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))

app.use('/', require('./routes/authRoutes'))
app.use('/cat',authMiddleware, require('./routes/catRoutes'));
app.use('/exp',authMiddleware, require('./routes/expRoutes'));
app.use("/api",authMiddleware, require('./routes/debtcredRoutes'));
app.use("/rep",authMiddleware, require('./routes/repRoutes'));

const port = 8000;
app.listen(port, () => console.log('server is running on port ' + port));