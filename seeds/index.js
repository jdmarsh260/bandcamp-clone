const mongoose = require('mongoose');
const {albums, artist_first_word, artist_second_word, album_art} = require('./seedHelpers.js');
const Album = require('../models/album');

// mongodb path for local seeding: mongodb://127.0.0.1:27017/bandcamp_clone_2

mongoose.connect(process.env.DB_URL)
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