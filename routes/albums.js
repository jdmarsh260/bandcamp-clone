const express = require('express');
const router = express.Router( { mergeParams: true} );
const albums = require('../controllers/albums');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAlbumAuthor, validateAlbum } = require('../middleware');


// Index route which shows all albums
// Creates new album
router.route('/')
    .get(
        catchAsync(albums.index))
    .post(
        isLoggedIn,
        validateAlbum,
        catchAsync(albums.createAlbum)
);


// Renders form to create new album
router.get('/new',
    isLoggedIn,
    albums.renderNewForm
);


// Shows an album
// Updates an album
// Deletes an album
router.route('/:id')
    .get(
        catchAsync(albums.showAlbum))
    .put(
        isLoggedIn,
        isAlbumAuthor,
        validateAlbum,
        catchAsync(albums.updateAlbum))
    .delete(
        isLoggedIn,
        isAlbumAuthor,
            catchAsync(albums.deleteAlbum)
);


// Renders edit form for album
router.get('/:id/edit',
    isLoggedIn,
    isAlbumAuthor,
    catchAsync(albums.renderEditForm)
);


module.exports = router;