const express = require('express');
const router = express.Router( { mergeParams: true} );
const collections = require('../controllers/collections');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isCollectionAuthor, validateCollection } = require('../middleware');


// Index route which shows all collections
// Creates first part of new collection (basic details)
router.route('/')
    .get(
        catchAsync(collections.index))
    .post(
        isLoggedIn,
        validateCollection,
        catchAsync(collections.initializeCollection)
);


// Renders first part of form for creating new collection (basic details)
router.get('/new',
    isLoggedIn,
    collections.renderFirstNewForm
);


// Renders second part of form for creating new collection (add albums)
// Adds albums to new collection
router.route('/:id/add_albums')
    .get(
        isLoggedIn,
        catchAsync(collections.renderSecondNewForm))
    .post(
        isLoggedIn,
        catchAsync(collections.addAlbumToCollection)
);


// Shows a collection
// Updates a collection
// Deletes a collection
router.route('/:id')
    .get(
        catchAsync(collections.showCollection))
    .put(
        isLoggedIn,
        validateCollection,
        isCollectionAuthor,
        catchAsync(collections.updateCollection))
    .delete(
        isLoggedIn,
        isCollectionAuthor,
        catchAsync(collections.deleteCollection)
);


// Creates collection (from two-part form)
router.post('/submit',
    isLoggedIn,
    catchAsync(collections.publishCollection)
);


// Renders edit form for collection
router.get('/:id/edit',
    isLoggedIn,
    isCollectionAuthor,
    catchAsync(collections.renderEditForm)
);


// Removes an album from second part of creation form
router.delete('/:id/add_albums/:albumId',
    isLoggedIn,
    catchAsync(collections.deleteAlbumFromCollection)
);

module.exports = router;
