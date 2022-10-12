////////////////////////////////////////
//  Import Dependencies
////////////////////////////////////////

const express = require('express')
const router = express.Router()
const axios = require('axios')

////////////////////////////////////////
//  Import Models
////////////////////////////////////////
const Apod = require('../models/apodModel.js')

// ////////////////////////////////////////
// //  Router Middleware
// ////////////////////////////////////////
// // Router Middleware
// // Authorization middleware
// // If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })


////////////////////////////////////////
//  Routes
////////////////////////////////////////
// Get request from NASA API
router.get('/nasa', (req, res) => {
    axios('https://api.nasa.gov/planetary/apod?api_key=NKq9cgpepLxEaEBsOSr9zXghCayrcpqkIdOjBVK3&count=10')
    .then(apodJson => {
        console.log(apodJson.data)
        res.send(apodJson.data)
    })
    // .then(() => res.send('done'))
    .catch(() => {
        res.status(500).send('Something went wrong :(')
    })

})

// GET request
// index route -> shows all instances of a document in the db
router.get("/", (req, res) => {
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Apod.find({})
        .then(apods => {
            // this is fine for initial testing
            // res.send(apods)
            // this the preferred method for APIs
            res.json({ apods: apods })
        })
        .catch(err => console.log(err))
})

// POST request
// create route -> gives the ability to create new apods
router.post("/", (req, res) => {
    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // we'll use the mongoose model method `create` to make a new APOD document
    console.log('req.body', req.body)

    let requestData = req.body
    Apod.create(req.body)
        .then(apod => {
            // send the user a '201 created' response, along with the new apod
            res.status(201).json({ apod: apod.toObject() })
        })
        .catch(error => console.log(error))
})

// PUT request
// update route -> updates a specific apod
router.put("/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    
    // for now, we'll use a simple mongoose model method, eventually we'll update this(and all) routes and we'll use a different method
    // we're using findByIdAndUpdate, which needs three arguments
    // it needs an id, it needs the req.body, and whether the info is new
    Apod.findByIdAndUpdate(id, req.body, { new: true })
        .then(apod => {
            console.log('the apod from update', apod)
            // update success is called '204 - no content'
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
// destroy route -> finds and deletes a single resource(apod)
router.delete("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    // find and delete the apod
    Apod.findByIdAndRemove(id)
        // send a 204 if successful
        .then(() => {
            res.sendStatus(204)
        })
        // send the error if not
        .catch(err => res.json(err))
})

// SHOW request
// read route -> finds and displays a single resource
router.get("/:id", (req, res) => {
    const id = req.params.id

    Apod.findById(id)
        .then(apod => {
            res.json({ apod: apod })
        })
        .catch(err => console.log(err))
})

// // index that shows only the user's apods
// router.get('/mine', (req, res) => {
//     // destructure user info from req.session
//     const { username, userId, loggedIn } = req.session
// 	Apod.find({ owner: userId })
// 		.then(apods => {
// 			res.render('apods/index', { apods, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router






//////////////////////////////////////////
// Example routes
//////////////////////////////////////////

// // index ALL
// router.get('/', (req, res) => {
// 	Apod.find({})
// 		.then(apods => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
			
// 			res.render('apods/index', { apods, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // index that shows only the user's apods
// router.get('/mine', (req, res) => {
//     // destructure user info from req.session
//     const { username, userId, loggedIn } = req.session
// 	Apod.find({ owner: userId })
// 		.then(apods => {
// 			res.render('apods/index', { apods, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // new route -> GET route that renders our page with the form
// router.get('/new', (req, res) => {
// 	const { username, userId, loggedIn } = req.session
// 	res.render('apods/new', { username, loggedIn })
// })

// // create -> POST route that actually calls the db and makes a new document
// router.post('/', (req, res) => {
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	req.body.owner = req.session.userId
// 	Apod.create(req.body)
// 		.then(apod => {
// 			console.log('this was returned from create', apod)
// 			res.redirect('/apods')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
// 	// we need to get the id
// 	const apodId = req.params.id
// 	Apod.findById(apodId)
// 		.then(apod => {
// 			res.render('apods/edit', { apod })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // update route
// router.put('/:id', (req, res) => {
// 	const apodId = req.params.id
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	Apod.findByIdAndUpdate(apodId, req.body, { new: true })
// 		.then(apod => {
// 			res.redirect(`/apods/${apod.id}`)
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // show route
// router.get('/:id', (req, res) => {
// 	const apodId = req.params.id
// 	Apod.findById(apodId)
// 		.then(apod => {
//             const {username, loggedIn, userId} = req.session
// 			res.render('apods/show', { apod, username, loggedIn, userId })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // delete route
// router.delete('/:id', (req, res) => {
// 	const apodId = req.params.id
// 	Apod.findByIdAndRemove(apodId)
// 		.then(apod => {
// 			res.redirect('/apods')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// // Export the Router
// module.exports = router
