const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true},
		likedMovies: Array,
    savedMovies: Array,
	},
	{ timestamps: true }
)
module.exports = mongoose.model("User", UserSchema);