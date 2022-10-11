// command center for our app
const express = require('express')
const app = express()
const PORT = 3000

const playerRouter = require('./controllers/apod')


// .get - is going to be only for GET requests
// `/` - is the path for this GET request
// req - is the request coming in
// res - is the response we need to construct to send out
app.get('/', (req, res) => {
    res.send('hello world')
})

// localhost:3000/players
app.use('/apod', playerRouter)
// error handlings app.use

// ALWAYS WANT TO HAVE OUR LISTENER AS THE LAST THING
// setting up the listener - this will listen for any request coming in to localhost:3000
// callback function so see that it is running
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


// ////////////////////
// //  Dependencies  //
// ////////////////////
// require("dotenv").config() // make env variables available
// const express = require("express")
// const middleware = require('./utils/middleware')
// const ApodRouter = require('./controllers/apod')
// const UserRouter = require('./controllers/user')
// const User = require("./models/user")
// // SEE MORE DEPENDENCIES IN ./utils/middleware.js
// // user and resource routes linked in ./utils/middleware.js

// //////////////////////////////
// // Middleware + App Object  //
// //////////////////////////////
// const app = require("liquid-express-views")(express())

// middleware(app)

// ////////////////////
// //    Routes      //
// ////////////////////

// app.use('/auth', UserRouter)
// app.use('/apods', ApodRouter)

// app.get('/', (req, res) => {
//     const { username, userId, loggedIn } = req.session
// 	res.render('index.liquid', { loggedIn, username, userId })
// })

// app.get('/error', (req, res) => {
// 	const error = req.query.error || 'This Page Does Not Exist'
//     const { username, loggedIn, userId } = req.session
// 	res.render('error.liquid', { error, username, loggedIn, userId })
// })

// // if page is not found, send to error page
// app.all('*', (req, res) => {
// 	res.redirect('/error')
// })



// //////////////////////////////
// //      App Listener        //
// //////////////////////////////
// app.listen(process.env.PORT, () => {
//     console.log(`listening on port ${process.env.PORT}`)
// })