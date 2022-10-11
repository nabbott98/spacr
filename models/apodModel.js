// import dependencies
const mongoose = require('./connection')

// here we'll import our commentSchema
const commentSchema = require('./comment')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const apodSchema = new Schema(
	{
		copyright: String,
		date: String,
		explanation: String,
		hdurl: String,
		media_type: String,
		title: String,
		url: String,
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Apod = model('APOD', apodSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Apod
