const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
	title: String,
	description: String,
	collection_image: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	albums: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Album'			
		}
	],
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Tag'
		}
	],
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

module.exports = mongoose.model('Collection', CollectionSchema);