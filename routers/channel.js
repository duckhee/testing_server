var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.get('/', function(req, res) {

});

router.get('/create', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.get('/create', function(req, res) {

    res.render('./page/channel/create_channel');
});

router.post('/process/create', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.post('/process/create', function(req, res) {

});

router.get('/show_list', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.get('/show_list', function(req, res) {

    res.render('./page/channel/list_channel');
});

router.post('/process/show_list', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.post('/process/show_list', function(req, res) {

});

router.get('/detail', function(req, res, next) {
    next();
});

router.get('/detail', function(req, res) {
    res.render('./page/channel/detail_channel');
});

router.get('/delete', function(req, res, next) {

    next();

});

router.get('/delete', function(req, res) {

    res.render('./page/channel/delete_channel');
});

router.post('/process/delete', function(req, res, next) {

    next();

});

router.post('/process/delete', function(req, res) {

});

router.get('/insert', function(req, res, next) {

    next();
});

router.get('/insert', function(req, res) {

    res.redirect('/');
});

router.post('/process/insert_data/:channel/:data', function(req, res, next) {

    next();
});

router.post('/process/insert_data/:channel/:data', function(req, res) {

});




module.exports = router;