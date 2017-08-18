var express = require('express');
var router = express.Router();


router.get('/registe', function(req, res, next) {

    if (req.session.userid) {
        res.redirect('/');
    } else {
        next();
    }

    console.log('middle ware');


});

router.get('/registe', function(req, res) {

    res.render('./page/member/registe');

});

router.post('/process/registe', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.post('/process/registe', function(req, res) {


});

router.get('/login', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.get('/login', function(req, res) {

    res.render('./page/member/login');
});

router.post('/process/login', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.post('/process/login', function(req, res) {

    res.render('./page/member/login');

});

router.get('/logout', function(req, res, next) {
    if (req.session.userid) {
        delete req.session.userid;
        next();
    } else if (!req.session.userid) {
        res.redirect('/member/login');
    } else {
        console.log('middle ware');
        console.log(req.session.userid);
        next();
    }

});

router.get('/logout', function(req, res) {
    res.redirect('/');
});

router.post('/logout', function(req, res, next) {

    console.log('middle ware');

    next();

});

router.post('/logout', function(req, res) {

});

router.get('/info', function(req, res, next) {

    console.log('middle ware');

    next();
});

router.get('/info', function(req, res) {

    res.render();

});

module.exports = router;