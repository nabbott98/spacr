////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const ApodRouter = require('./controllers/apod')
const UserRouter = require('./controllers/user')
const CommentRouter = require('./controllers/commentControllers')
const User = require("./models/user") // remove or comment out unused imports
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

// const app = express()
app.use(express.json()) // comment this out if I run into liquid issues

middleware(app)
//const reqLogger = require('./utils/requestLogger')


////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/apods', ApodRouter)
app.use('/comments', CommentRouter)
//app.use(reqLogger)

app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})

//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
