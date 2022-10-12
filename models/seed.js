///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Apod = require('./apodModel')
const axios = require('axios')
const express = require('express')
const app = require("liquid-express-views")(express())
// const app = express()
app.use(express.json()) // comment this out if I run into liquid issues

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection
let startApods = []

db.on('open', () => {
    // delete all the existing APODS
    Apod.deleteMany({})
        .then(deletedApods => {
            console.log('this is what .remove returns', deletedApods)

            axios.get('https://api.nasa.gov/planetary/apod?api_key=NKq9cgpepLxEaEBsOSr9zXghCayrcpqkIdOjBVK3&count=10')
                .then(function (response) {
                    // handle success
                    console.log(response.data[1])
                    startApods = response
                .catch(error => {
                    console.log(error)
                })
            })
            Apod.create(startApods)
            .then(data => {
                console.log('here are the newly pulled Apods', data)
                // always close connection to the db
                db.close()
            })
            .catch(error => {
                console.log(error)
                // always close connection to the db
                db.close()
            })

        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})
