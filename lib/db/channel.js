var mysql = require('mysql');
var config = require('../../config.json');
var report = require('../mailer/error_report');

var pool = mysql.createPool(config.mysql_db);

exports.create_channel = function(channel_info, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var create_channel_error = 'create channel connection error : ';
            create_channel_error += err.stack;
            report.send_error(create_channel_error, function(callback) {
                if (callback === false) {
                    console.log('create channel conection error : ');
                    console.log(create_channel_error);
                } else {
                    console.log('success send report');
                }
            });
            callback(false);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    var create_channel_trans_error = 'create channel trans error : ';
                    create_channel_trans_error += err.stack;
                    report.send_error(create_channel_trans_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(create_channel_trans_error);
                        } else {
                            console.log('success send report ');
                        }
                    });
                    conn.release();
                    callback('create_channel_trans_error');
                } else {
                    conn.query('', channel_info, function(err, row) {
                        if (err) {
                            var create_channel_query_error = 'create channel query error : ';
                            create_channel_query_error += err.stack;
                            report.send_error(create_channel_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(create_channel_query_error);
                                } else {
                                    console.log('success send report ');
                                }
                            });
                            conn.rollback();
                            conn.release();
                            callback(false);
                        } else {
                            console.log('create channel : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    var create_channel_commit_error = 'create channel commit error : ';
                                    create_channel_commit_error += err.stack;
                                    report.send_error(create_channel_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(create_channel_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    conn.rollback();
                                    conn.release();
                                    callback(false);
                                } else {
                                    console.log(row);
                                    conn.release();
                                    callback(true);
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
exports.search_channel = function(search_channel_info, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var search_channel_connection_error = 'search channel connection error : ';
            search_channel_connection_error += err.stack;
            report.send_error(search_channel_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(search_channel_connection_error);
                } else {
                    console.log('success send report');
                }
            });
            callback(false);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {

                    var search_channel_trans_error = 'search channel transaction error : ';
                    search_channel_trans_error += err.stack;
                    report.send_error(search_channel_trans_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(search_channel_trans_error);
                        } else {
                            console.log('success send report');
                        }
                    });

                    conn.rollback();
                    conn.release();
                    callback(false);
                } else {
                    conn.query('', search_channel_info, function(err, row) {
                        if (err) {
                            var search_channel_query_error = 'search channel query error : ';
                            search_channel_query_error += err.stack;
                            report.send_error(search_channel_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(search_channel_query_error);
                                } else {
                                    console.log('success send report ');
                                }
                            });
                            conn.rollback();
                            conn.release();
                            callback(false);
                        } else {
                            console.log('success : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    var search_channel_commit_error = 'search channel commit error : ';
                                    search_channel_commit_error += err.stack;
                                    report.send_error(search_channel_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(search_channel_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    conn.rollback();
                                    conn.release();
                                    callback(false);
                                } else {
                                    console.log(row);
                                    conn.release();
                                    callback(true);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.delete_channel = function(delete_channel_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var delete_channel_connection_error = 'delete channel connection error : ';
            delete_channel_connection_error += err.stack;
            report.send_error(delete_channel_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(delete_channel_connection_error);
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
                    var delete_channel_transaction_error = 'delete channel transaction error : ';
                    delete_channel_transaction_error += err.stack;
                    report.send_error(delete_channel_transaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(delete_channel_transaction_error);
                        } else {
                            console.log('success send report');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    conn.query('', delete_channel_info, function(err, row) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var delete_channel_query_error = 'delete channel query error : ';
                            delete_channel_query_error += err.stack;
                            report.send_error(delete_channel_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(delete_channel_query_error);
                                } else {
                                    console.log('success send report');
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
                                    var delete_channel_commit_error = 'delete channel commit error : ';
                                    delete_channel_commit_error += err.stack;
                                    report.send_error(delete_channel_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(delete_channel_commit_error);
                                        } else {
                                            console.log('success send report');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    conn.release();
                                    console.log('success ' + row);
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

exports.modify_channel = function(modify_channel_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var modify_channel_connection_error = 'modify channel connection error : ';
            modify_channel_connection_error += err.stack;
            report.send_error(modify_channel_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(modify_channel_connection_error);
                } else {
                    console.log('success send report');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    conn.rollback();
                    conn.release();
                    var modify_channel_transaction_error = 'modify channel transaction error : ';
                    modify_channel_transaction_error += err.stack;
                    report.send_error(modify_channel_transaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(modify_channel_transaction_error);
                        } else {
                            console.log('success send report');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    conn.query('', modify_channel_info, function(err, row) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var modify_channel_query_error = 'modify channel query error : ';
                            modify_channel_query_error += err.stack;
                            report.send_error(modify_channel_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(modify_channel_query_error);
                                } else {
                                    console.log('success send report');
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
                                    var modify_channel_commit_error = 'modify channel commit error : ';
                                    modify_channel_commit_error += err.stack;
                                    report.send_error(modify_channel_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(modify_channel_commit_error);
                                        } else {
                                            console.log('success send report');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    conn.release();
                                    console.log('success ' + row);
                                    //callback(row);
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