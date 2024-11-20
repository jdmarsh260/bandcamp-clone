const Joi = require('joi');
const { number } = require('joi');

module.exports.albumSchema = Joi.object({
    album: Joi.object({
        title: Joi.string().required(),
        artist_name: Joi.string().required(),
        album_art: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required()
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        title: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});


module.exports.collectionSchema = Joi.object({
    collection: Joi.object({
        title: Joi.string().required(),
        collection_image: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});