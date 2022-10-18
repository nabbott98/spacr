///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const mongoose = require('./connection')

// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({ // Schema/ Class declarations need to be capitalized for best practices
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//////////////////////////////////////////////////
// Export our schema
//////////////////////////////////////////////////
module.exports = commentSchema