**Overview**

This is a very ugly barebones "clone" of Bandcamp.

You can:

- Create and log in as different **user** accounts.

- Create, view, and delete **albums** and **reviews** based on your permissions.

- Create, view, and delete **collections** of albums.


I have also had limited success with adding **multer** (for uploading audio tracks and local images), as well as using **Angular** (in order to create a layout more similar to the actual Bandcamp website). However, I am still running into issues with integrating those technologies. As such, right now the pushed code above is the **most functional iteration** of the project.

___

**Heroku**: https://guarded-atoll-93229-12245eb5da2b.herokuapp.com/

1. **First Steps**

    Register as user and/or login, then navigate to Albums.

    Several dummy albums have already been seeded into the database.


2. **How to Use**

    You can view albums without being logged in, but you have to register and/or login as a user in order to create albums.

    Then, you can only edit and delete albums you have created as a user.

    The same is true of leaving reviews on albums or creating collections.

    When creating albums, you need to enter a URL for the album art, as image upload functionality has yet to be implemented.

    Likewise, when creating collections you have to enter the album ID of each album you wish to add to the collection. The album ID's are available on the All Albums page and the show page of each individual album.

    The fastest way to add albums by ID is to keep one tab open for all albums and another on the add-albums-to-collection page. Then, copy and paste each ID as desired.
