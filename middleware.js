const { albumSchema, collectionSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Album = require('./models/album');
const Collection = require('./models/collection');
const Review = require('./models/review');

// FOR HANDLING SESSIONS
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first.');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


// FOR HANDLING JOI SCHEMA VALIDATIONS
module.exports.validateAlbum = (req, res, next) => {
    const { error } = albumSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateCollection = (req, res, next) => {
    const { error } = collectionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


// FOR HANDLING AUTHORIZATION PERMISSIONS
module.exports.isAlbumAuthor = async (req, res, next) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/albums/${id}`);
    }
    next();
}

module.exports.isCollectionAuthor = async (req, res, next) => {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/collections/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/albums/${id}`);
    }
    next();
}