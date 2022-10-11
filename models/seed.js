///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Apod = require('./apod')

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // delete all the existing APODS
    Apod.deleteMany({})
        .then(deletedApods => {
            console.log('this is what .remove returns', deletedApods)

            // create a bunch of new fruits from startFruits
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