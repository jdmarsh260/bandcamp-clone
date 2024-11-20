const Album = require('../models/album');
const Review = require('../models/review');


module.exports.renderNewForm = async (req, res) => {
    const album = await Album.findById(req.params.id);
    res.render('reviews/new', { album });
}


module.exports.createReview = async(req, res, next) => {
    const album = await Album.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    album.reviews.push(review);
    await review.save();
    await album.save();
    req.flash('success', 'Successfully created new review.');
    res.redirect(`/albums/${album._id}`)
}


module.exports.showReview = async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
        req.flash('error', 'Cannot find that review');
        return res.redirect(`/albums/${album._id}`);
    }
    res.render('reviews/show', { review });
}


module.exports.renderEditForm = async (req, res) => {
    const album = await Album.findById(req.params.id);
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
        req.flash('error', 'Cannot find that review');
        return res.redirect(`/albums/${album._id}`);
    }
    res.render('reviews/edit', { review, album });
}


module.exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const album = await Album.findById(req.params.id);
    const review = await Review.findByIdAndUpdate(reviewId, {...req.body.review});
    req.flash('success', 'Successfully updated review.');
    res.redirect(`/albums/${album._id}`)
}


module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Album.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review.');
    res.redirect(`/albums/${id}`);
}