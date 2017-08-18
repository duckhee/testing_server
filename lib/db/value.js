var mysql = require('mysql');
var config = require('../../config.json');
var report = require('../mailer/error_report');

var pool = mysql.createPool(config.mysql_db);


exports.insert_data = function(insert_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();

            }
            var insert_connection_error = 'insert data connection error : ';
            insert_connection_error += err.stack;
            report.send_error(insert_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(insert_connection_error);
                } else {
                    console.log('success send report ');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    conn.rollback();
                    conn.release();
                    var insert_transaction_error = 'insert data transaction error : ';
                    insert_transaction_error += err.stack;
                    //callback(false;)
                    callback(err, null);
                } else {
                    conn.query('insert into testingdb (channel, value1) values(?, ?) ', insert_info, function(err, row) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var insert_data_query_error = 'insert data query error : ';
                            insert_data_query_error += err.stack;
                            report.send_error(insert_data_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(insert_data_query_error);
                                } else {
                                    console.log('success send report ');
                                }
                            });
                            //callback(false);
                            callback(err, null);
                        } else {
                            console.log('success : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    conn.rollback();
                                    conn.release();
                                    var insert_commit_error = 'insert data commit error : ';
                                    insert_commit_error += err.stack;
                                    report.send_error(insert_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(insert_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    conn.release();
                                    console.log(row);
                                    callback(null, row);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};


//delete transaction
exports.show_data = function(search_data_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var show_data_connction_error = 'show data connection error : ';
            show_data_connction_error += err.stack;
            report.send_error(show_data_connction_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(show_data_connction_error);
                } else {
                    console.log('success send report ');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    conn.rollback();
                    conn.release();
                    var show_data_transaction_error = 'show data transaction error : ';
                    show_data_transaction_error += err.stack;
                    report.send_error(show_data_transaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report');
                            console.log(show_data_transaction_error);
                        } else {
                            console.log('success send report ');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    conn.query('select * from testingdb where channel = ?', search_data_info, function(err, rows) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var show_data_query_error = 'show data query error :  ';
                            show_data_query_error += err.stack;
                            report.send_error(show_data_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(show_data_query_error);
                                } else {
                                    console.log('success send report');
                                }
                            });
                            //callback(false);
                            callback(err, null);
                        } else {
                            console.log('success ' + rows);
                            conn.commit(function(err) {
                                if (err) {
                                    conn.rollback();
                                    conn.release();
                                    var show_data_commit_error = 'show data commit error : ';
                                    show_data_commit_error += err.stack;
                                    report.send_error(show_data_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(show_data_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    console.log(rows);
                                    conn.release();
                                    //callback(rows);
                                    callback(null, rows);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};