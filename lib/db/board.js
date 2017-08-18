var mysql = require('mysql');
var config = require('../../config.json');
var report = require('../mailer/error_report');

var pool = mysql.createPool(config.iof_db);

exports.create_board = function(create_board_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var create_board_connection_error = 'insert board connection error : ';
            create_board_connection_error += err.stack;
            report.send_error(create_board_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(create_board_connection_error);
                } else {
                    console.log('success send report');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    conn.release();
                    var create_board_trasaction_error = 'create board transaction error : ';
                    create_board_trasaction_error += err.stack;
                    report.send_error(create_board_trasaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(create_board_trasaction_error);
                        } else {
                            console.log('success send report');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    conn.query('', create_board_info, function(err, results) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var create_board_query_error = 'create board query error : ';
                            create_board_query_error += err.stack;
                            report.send_error(create_board_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(create_board_query_error);
                                } else {
                                    console.log('success send report');
                                }
                            });
                            //callback(false);
                            callback(err, null);
                        } else {
                            console.log(results);
                            conn.commit(function(err) {
                                if (err) {
                                    conn.rollback();
                                    conn.release();
                                    var create_board_commit_error = 'create board commit error : ';
                                    create_board_commit_error += err.stack;
                                    report.send_error(create_board_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(create_board_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    conn.release();
                                    console.log(results);
                                    //callback(true);
                                    callback(results);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.delete_board = function(delete_board_info, callback) {

};

exports.modify_board = function(modify_board_info, callback) {

};

exports.show_board = function(show_board_info, callback) {

};