// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv/config');
const bodyParser = require('body-parser');
const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const postRoute = require('./routes/post')

// const contactRoute = require('./routes/contact');
// const adminRoute = require('./routes/admin');






// INITIALIZATIONS
const app = express();

// app.get('/', (req, res) => {
//     res.send("homepagee")
// })

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())
app.use('/', homeRoute)
app.use('/about', aboutRoute)
app.use('/post', postRoute);
// app.use('/contact', contactRoute)
// app.use('/admin', adminRoute)





// CONNECT TO DATABASE
const db = process.env.DB;
mongoose.connect(db, () => { console.log("DB connected successfully")});


// PORT TO  LISTEN
const port = process.env.PORT;
app.listen(8081, () => { console.log("Server awake")});