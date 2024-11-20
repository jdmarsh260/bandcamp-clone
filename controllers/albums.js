const Album = require('../models/album');

module.exports.index = async (req, res) => {
    const albums = await Album.find({});
    res.render('albums/index', { albums });
}


module.exports.renderNewForm = (req, res) => {
    res.render('albums/new');
}


module.exports.createAlbum = async (req, res, next) => {
    const album = new Album(req.body.album);
    album.author = req.user._id;
    await album.save();
    req.flash('success', 'Successfully made a new album.');
    res.redirect(`/albums/${album._id}`)
}


module.exports.showAlbum = async (req, res) => {
    const album = await Album.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!album) {
        req.flash('error', 'Cannot find that album.');
        return res.redirect('/albums');
    }
    res.render('albums/show', { album });
}


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
        req.flash('error', 'Cannot find that album.');
        return res.redirect('/albums');
    }
    res.render('albums/edit', { album });
}


module.exports.updateAlbum = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findByIdAndUpdate(id, {...req.body.album});
    req.flash('success', 'Successfully updated album.');
    res.redirect(`/albums/${album._id}`)
}


module.exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted album.');
    res.redirect('/albums');
}