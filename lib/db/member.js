var mysql = require('mysql');
var config = requrie('../../config.json');
var report = require('../mailer/error_report');


var pool = mysql.createPool(config.iof_db);

module.exports.add_user = function(registe_info, callback) {

    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();

            }
            var connection_error = 'add user connection error : ';
            connection_error += err.stack;
            report.send_error(connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(connection_error);
                } else {
                    console.log('success send report ! ');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    var add_user_trans_error = 'add user transaction error : ';
                    add_user_trans_error += err.stack;
                    report.send_error(add_user_trans_error, function(callback) {
                        if (err) {
                            console.log('failed send report : ');
                            console.log(add_user_trans_error);
                        } else {
                            console.log('success send report');
                        }
                    });
                    conn.rollback();
                    conn.release();
                    //callback('add_user_trans_error');
                    callback(err, null);
                } else {
                    conn.query('insert into iof_user(user_id, user_password, user_email, user_name, user_regdate) values(?,?,?,?,?)', registe_info, function(err, row) {
                        if (err) {
                            var add_user_query_error = 'add user query error : ';
                            add_user_query_error += err.stack;
                            report.send_error(add_user_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(add_user_query_error);
                                } else {
                                    console.log('success send report');
                                }
                            });
                            conn.rollback();
                            conn.release();
                            //callback(false);
                            callback(err, null);

                        } else {
                            console.log('success ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    var add_user_commit_error = 'add user commit error : ';
                                    add_user_commit_error += err.stack;
                                    report.send_error(add_user_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(add_user_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    conn.rollback();
                                    conn.release();
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    console.log(row);
                                    conn.release();
                                    //callback(true);
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
module.exports.login_user = function(login_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var login_connection_error = 'login connection error : ';
            login_connection_error += err.stack;

            report.send_error(login_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(login_connection_error);
                } else {
                    console.log('success report ');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    var login_trans_error = 'login transaction error : ';
                    login_trans_error += err.stack;
                    report.send_error(login_trans_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send error : ');
                            console.log(login_trans_error);
                        } else {
                            console.log('success send report ');
                        }
                    });
                    conn.rollback();
                    conn.release();
                    //callback('login_trans_error');
                    callback(err, null);
                } else {
                    conn.query('', function(err, row) {
                        if (err) {
                            var login_querry_error = 'login querry error : ';
                            login_querry_error += err.stack;
                            report.send_error(login_querry_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(login_querry_error);
                                } else {
                                    console.log('success send report ');
                                }
                            });
                            conn.rollback();
                            conn.release();
                            //callback(false);
                            callback(err, null);
                        } else {
                            console.log('login row : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    var login_commit_error = 'login commit error : ';
                                    login_commit_error += err.stack;
                                    report.send_error(login_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(login_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    conn.release();
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    console.log(row);
                                    conn.release();
                                    //callback(true);
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
module.exports.check_id = function(check_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var check_id_connection_error = 'check id connection error : ';
            check_id_connection_error += err.stack;
            report.send_error(check_id_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(check_id_connection_error);
                } else {
                    console.log('success send report ');
                }
            });
            //callback(false);
            callback(err, null);
        } else {
            conn.query('select count(*) cnt from iof_member', check_info, function(err, row) {
                if (err) {
                    conn.release();
                    var check_id_query_error = 'check id qeury error : ';
                    check_id_query_error += err.stack;
                    report.send_error(check_id_query_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(check_id_query_error);
                        } else {
                            console.log('success send report');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    if (row[0].cnt === 1) {
                        conn.releasxe();
                        //callback(true);
                        callback(null, row);
                    } else {
                        conn.release();
                        // callback(false);
                        callback(null, false);
                    }
                }
            });
        }
    });

};

module.exports.delete_user = function(delete_user_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var delete_user_connection_error = 'delete user connection error : ';
            delete_user_connection_error += err.stack;
            report.send_error(delete_user_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(delete_user_connection_error);
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
                    var delete_user_transaction_error = 'delete user transaction error : ';
                    delete_user_transaction_error += err.stack;
                    report.send_error(delete_user_transaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(delete_user_transaction_error);
                        } else {
                            console.log('success send report ');
                        }
                    });
                    //callback(false);
                    callback(err, null);
                } else {
                    conn.query('', delete_user_info, function(err, row) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var delete_user_query_error = 'delete user query error : ';
                            delete_user_query_error += err.stack;
                            report.send_error(delete_user_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(delete_user_query_error);
                                } else {
                                    console.log('success send report');
                                }
                            });
                            callback(err, null);
                        } else {
                            console.log('success : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    conn.rollback();
                                    conn.release();
                                    var delete_user_commit_error = 'delete user commit error : ';
                                    delete_user_commit_error += err.stack;
                                    report.send_error(delete_user_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(delete_user_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    //callback(false);
                                    callback(err, null);
                                } else {
                                    console.log('success  ' + row);
                                    conn.release();
                                    //callback(true);
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

module.exports.modify_user = function(modify_user_info, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            var modify_user_connection_error = 'modify user connection error : ';
            modify_user_connection_error += err.stack;
            report.send_error(modify_user_connection_error, function(callback) {
                if (callback === false) {
                    console.log('failed send report : ');
                    console.log(modify_user_connection_error);
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
                    var modify_user_transaction_error = 'modify user transaction error : ';
                    modify_user_transaction_error += err.stack;
                    report.send_error(modify_user_transaction_error, function(callback) {
                        if (callback === false) {
                            console.log('failed send report : ');
                            console.log(modify_user_transaction_error);
                        } else {
                            console.log('success send report ');
                        }
                    });
                    callback(err, null);
                } else {
                    conn.query('', modify_user_info, function(err, row) {
                        if (err) {
                            conn.rollback();
                            conn.release();
                            var modify_user_query_error = 'modift user query error : ';
                            modify_user_query_error += err.stack;
                            report.send_error(modify_user_query_error, function(callback) {
                                if (callback === false) {
                                    console.log('failed send report : ');
                                    console.log(modify_user_query_error);
                                } else {
                                    console.log('success send report');
                                }
                            });
                            callback(err, null);
                        } else {
                            console.log('success : ' + row);
                            conn.commit(function(err) {
                                if (err) {
                                    conn.release();
                                    var modify_user_commit_error = 'modify user commit error : ';
                                    modify_user_commit_error += err.stack;
                                    report.send_error(modify_user_commit_error, function(callback) {
                                        if (callback === false) {
                                            console.log('failed send report : ');
                                            console.log(modify_user_commit_error);
                                        } else {
                                            console.log('success send report ');
                                        }
                                    });
                                    callback(err, null);
                                } else {
                                    console.log(row);
                                    conn.release();
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