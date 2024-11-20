const Collection = require('../models/collection');
const Album = require('../models/album');
let onEditPage;

module.exports.index = async (req, res) => {
    const collections = await Collection.find({});
    res.render('collections/index', { collections });
}


module.exports.renderFirstNewForm = (req, res) => {
    res.render('collections/new_1');
}


module.exports.renderSecondNewForm = async (req, res) => {
    const collection = await Collection.findById(req.params.id).populate('albums');
    onEditPage = false; // if you go to another page without submitting form
    // this will still be true but it doesn't affect anything
    res.render('collections/new_2', { collection });
}


module.exports.initializeCollection = async (req, res) => {
    const collection = new Collection(req.body.collection);
    collection.author = req.user._id;
    await collection.save();
    res.redirect(`/collections/${collection._id}/add_albums`)
}


module.exports.addAlbumToCollection = async (req, res) => {
    const collection = await Collection.findById(req.params.id);
    const album = await Album.findById(req.body.album_id);
    collection.albums.push(album);
   	await collection.save();
    res.redirect(`/collections/${collection._id}/add_albums`)
}


module.exports.publishCollection = async (req, res) => {
    req.flash('success', 'Successfully made a new collection.');
    res.redirect(`/collections/`)
}


module.exports.showCollection = async (req, res) => {
    const collection = await Collection.findById(req.params.id).
    populate('albums').populate('author');
    if (!collection) {
        req.flash('error', 'Cannot find that collection.');
        return res.redirect('/collections');
    }
    res.render('collections/show', { collection });
}


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const collection = await Collection.findById(id).populate('albums');
    onEditPage = true; // if you go to another page without submitting form
    // this will still be true but it doesn't affect anything
    if (!collection) {
        req.flash('error', 'Cannot find that collection.');
        return res.redirect('/collections');
    }
    res.render('collections/edit', { collection });
}


module.exports.updateCollection = async (req, res) => {
    const { id } = req.params;
    const collection = await Collection.findByIdAndUpdate(id, {...req.body.collection});
    req.flash('success', 'Successfully updated collection.');
    res.redirect(`/collections/${collection._id}`)
}


module.exports.deleteCollection = async (req, res) => {
    const { id } = req.params;
    await Collection.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted collection.');
    res.redirect('/collections');
}


module.exports.deleteAlbumFromCollection = async (req, res) => {
    const { id, albumId } = req.params;
    const collection = await Collection.findById(req.params.id);
    await Collection.findByIdAndUpdate(id, { $pull: { albums: albumId } });
    if (onEditPage == true) {
        res.redirect(`/collections/${collection._id}/edit`)
    } else {
       res.redirect(`/collections/${collection._id}/add_albums`)
    }
}