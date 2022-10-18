// import dependencies
const mongoose = require('./connection')

// here we'll import our commentSchema
const commentSchema = require('./comment')

// remove unused imports 
const User = require('./user')// import user model for populate


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose
const apodSchema = new Schema( // Classes and by extension Schemas, are capitalized as a best practice in JS
	{
		copyright: String,
		date: String,
		explanation: String,
		hdurl: String,
		media_type: String,
		title: String,
		url: String,
		favorite: Boolean,
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema],
	},
	{ timestamps: true }
)

const Apod = model('APOD', apodSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Apod
