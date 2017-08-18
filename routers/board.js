var express = require('express');

var router = express.Router();

router.get('/create_board', function(req, res, next) {

    console.log('middle ware');

    next();

});

router.get('/create_board', function(req, res) {

});

router.post('/process/create_board', function(req, res, next) {

    console.log('middle ware');

    next();

});

router.post('/process/create_board', function(req, res) {

});

router.get('/delete_board', function(req, res, next) {

    next();

});

router.get('/delete_board', function(req, res) {

});

router.post('/process/delete_board', function(req, res, next) {

    next();

});

router.post('/process/delete_board', function(req, res) {

});

router.get('/modify_board', function(req, res, next) {

    next();

});
router.get('/modify_board', function(req, res) {

});


module.exports = router;