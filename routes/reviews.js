const express = require('express');
const router = express.Router( { mergeParams: true} );
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');


// Renders form to create new review
router.get('/new',
    reviews.renderNewForm
)


// Creates new review
router.post('/',
    isLoggedIn,
    validateReview,
    catchAsync(reviews.createReview)
);


// Shows a review
// Updates a review
// Deletes a review
router.route('/:reviewId')
    .get(
        catchAsync(reviews.showReview))
    .put(
        isLoggedIn,
        validateReview,   
        isReviewAuthor,
        catchAsync(reviews.updateReview))
    .delete(
        isLoggedIn,
        isReviewAuthor,
        catchAsync(reviews.deleteReview)
);


// Renders edit form for review
router.get('/:reviewId/edit',
    isLoggedIn,
    isReviewAuthor,
    catchAsync(reviews.renderEditForm)
);






module.exports = router;