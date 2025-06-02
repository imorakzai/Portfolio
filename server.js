const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require(path)

// require("dotenv").config(); // at the top
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Full path
// console.log("FORCE LOADED .env:", {
//     EMAIL: process.env.EMAIL,
//     PASS: process.env.EMAIL_PASSWORD ? "***HIDDEN***" : "NOT FOUND"
// });

// const fs = require('fs');
// console.log("Raw .env content:", fs.readFileSync('.env', 'utf8'));


//dotenv configuration
dotenv.config()
// console.log("Loaded .env variables:", {
//     EMAIL: process.env.EMAIL,
//     EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "***HIDDEN***" : "NOT FOUND"
// });

//rest object
const app = express()

//midlewares
app.use(cors())
app.use(express.json())

//static file access
app.use(express.static(path.join(__dirname, '/client/build')))

//routes
app.use('/api/v1/portfolio', require('./Routes/portfolioRoute'))
// app.use("/api/v1/portfolio", portfolioRouter);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
});
