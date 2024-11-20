if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
  }

const mongoose = require('mongoose');
const {albums, artist_first_word, artist_second_word, album_art} = require('./seedHelpers.js');
const Album = require('../models/album');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';



mongoose.connect(dbUrl)
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Album.deleteMany({});
	for (let i = 0; i < 20; i++) {
		const price = Math.floor(Math.random() * 12);
		const album = new Album({
			author: `673bd2e8ce187a0abc9b0ddf`,
			title: `${sample(albums)}`,
			artist_name: `${sample(artist_first_word)} ${sample(artist_second_word)}`,
			album_art: `${sample(album_art)}`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor ornare rhoncus. Cras efficitur.',
			price
		})
		await album.save();
	}
}

seedDB().then(() => {
    mongoose.connection.close();
})