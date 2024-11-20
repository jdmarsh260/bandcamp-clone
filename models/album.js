const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const AlbumSchema = new Schema({
	title: String,
	artist_name: String,
	album_art: String,
	description: String,
	personnel: [
		{
			personnel_name: String,
			role: String
		}
	],
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Tag'
		}
	],
	price: Number,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	date_created: {
		type: Date,
		default: Date.now
	}
});

// deletes all reviews associated with an album when you delete an album
AlbumSchema.post('findOneAndDelete', async function(doc) {
	if(doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews
			}
		})
	}
})

module.exports = mongoose.model('Album', AlbumSchema);