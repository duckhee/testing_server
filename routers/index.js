var express = require('express');
var dbvalue = require('../lib/db/value');
var router = express.Router();



router.get('/', function(req, res, next) {

    console.log('middle ware');

    next();

});

router.get('/', function(req, res) {

    res.render('./pages/index');
});

router.get('/test', function(req, res, next) {

    console.log('develop');
    next();
});
router.get('/test', function(req, res) {
    res.render('./pages/testing_index');
});


router.get('/testing/data', function(req, res, next) {
    console.log('testing page');


    next();
});

router.get('/testing/data', function(req, res) {



});

router.post('/testing/insert/data/:channel/:value', function(req, res, next) {
    console.log('post insert pages');
    next();
});

router.post('/testing/insert/data/:channel/:value', function(req, res) {

    var insert_info = [];

    var channel = req.params.channel || req.body.channel;
    var values = req.params.value || req.body.value;
    console.log(channel);
    console.log(values);
    console.log(typeof(values));
    insert_info.push(channel);
    insert_info.push(values);
    dbvalue.insert_data(insert_info, function(err, row) {
        if (err) {
            console.log(err);
            console.log(err.stack);
            res.json('failed');
        } else if (row) {
            console.log('success');
            res.json(row);
        } else {
            res.json('testing');
        }
    });
});

router.get('/testing/get/data/:channel', function(req, res, next) {

    console.log('testing get data');
    next();
});


router.get('/testing/get/data/:channel', function(req, res) {
    var channel_info = [];
    var channel = req.params.channel || req.body.channel;
    channel_info.push(channel);
    var get_data;
    dbvalue.show_data(channel_info, function(err, row) {
        if (err) {
            console.log(err.stack);
            res.json('failed');
        } else if (row) {
            console.log(row);
            //res.json(row);
            get_data = row;
            console.log('value ');
            console.log(get_data);
            console.log('type');
            console.log(typeof(get_data));
            console.log('length');
            console.log(get_data.length);
            console.log('json parse');
            var parse_data;
            parse_data = get_data[1];
            console.log(parse_data);
            console.log('value idx : ');
            console.log(parse_data.value1);
            res.render('./pages/testing_index', {
                data: get_data
            });
            //data: JSON.stringify(get_data)
        } else {
            console.log('testing');
            res.json('testing');
        }
    });

});

module.exports = router;