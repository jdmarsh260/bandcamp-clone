if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require("connect-mongo")(session);
const User = require('./models/user');

const app = express();
const userRoutes = require('./routes/users');
const albumRoutes = require('./routes/albums');
const reviewRoutes = require('./routes/reviews');
const collectionRoutes = require('./routes/collections');


// _____________________________________________ //

// ***** SET UP EXPRESS PREFERENCES ***** //

// sets up EJS, lets us use ejsMate for boilerplate.js,
// and makes path name easier for views
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// allows us to parse the request body
app.use(express.urlencoded({ extended: true }));


// allows us to use PUT and DELETE requests
app.use(methodOverride('_method'));

    // sets up simplified routers using express.router

    // NOTE: router has some quirks you should know, especially with req.params;
    // you have to use mergeParams


// allows us to serve static assets from public directory (e.g. scripts, styles, etc.)
app.use(express.static(path.join(__dirname, 'public')))


// sets up preferences for user sessions, MongoAtlas, and flash messages/errors
// NOTE: The development mongodb URL is for your Windows homelab
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bandcamp_clone_2'

const secret = process.env.SECRET || 'thisshouldbebettersecret';

const store = new MongoDBStore({
    url: dbURL,
    secret,
    touchAfter: 20 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});


const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 *60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};


app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//route paths
app.use('/', userRoutes);
app.use('/albums', albumRoutes);
app.use('/albums/:id/reviews', reviewRoutes);
app.use('/collections', collectionRoutes);

app.get('/', (req, res) => {
    res.render('home')
});


// custom error messages
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


// _____________________________________________ //

// ***** CONNECT TO DATABASE ***** //
mongoose.connect(dbURL)
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR")
        console.log(err)
    })
// 



// _____________________________________________ //

// ***** START SERVER ***** //
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Serving on PORT ${port}`)
});