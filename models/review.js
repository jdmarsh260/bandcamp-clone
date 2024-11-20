const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title: String,
	rating: Number,
	body: String,
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	date_created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Review', ReviewSchema);