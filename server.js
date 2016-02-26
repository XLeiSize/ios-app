// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Photo      = require('./models/photo');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

mongoose.connect('mongodb://leixing:adrien@apollo.modulusmongo.net:27017/Apy9tihu'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /photo
// ----------------------------------------------------
router.route('/photo')

    // create a photo (accessed at POST http://localhost:8080/api/photo)
    .post(function(req, res) {
        console.log('POSTING');
        var photo = new Photo();      // create a new instance of the Bear model
        photo.id = new Date().getTime();
        photo.url = req.body.url;  // set the bears url (comes from the request)

        // save the bear and check for errors
        photo.save(function(err) {
            if (err) {
              res.send(err);
            }
            console.log(photo);
            res.json({ message: 'Photo created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Photo.find(function(err, photos) {
            if (err)
                res.send(err);
            console.log(photos);
            res.json(photos);
        });
    });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
