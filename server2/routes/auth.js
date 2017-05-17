var jwt = require('jwt-simple');
var q = require('q');

var connectionManager = require('./connectionManager');


let logger = require("../utils/logger");


var auth = {
    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            logger.debug('AUTH.LOGIN- Inavlid or null Credentials');
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid

        auth.validate(username, password).then(function(data) {
                logger.debug('AUTH.LOGIN- Validate Success' + JSON.stringify(data));
                res.json(genToken(data));
            })
            .fail(function(err) {
                logger.debug('AUTH.LOGIN- Validate Failed' + err);
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
            });


    },

    validate: function(username, password) {

        var deferred = q.defer();
        var currencyInsert = 'select * from users where username= ? and password= ? ';

        connectionManager.getConnection()
            .then(function(connection) {
                var query = connectionManager.prepareQuery(currencyInsert, [username, password]);
                //  console.log('Query to execute:' + query);
                connection.query(query, function(error, result) {

                    if (result[0] == undefined) {
                        deferred.reject("Wrong userid/{ass");
                    }

                    var data = new Object();
                    data.username = result[0].username;
                    data.role = result[0].role;
                    if (error) {
                        console.error(error);
                        deferred.reject(error);
                    }

                    if (result.length <= 0) {
                        deferred.reject(data);
                    } else {
                        deferred.resolve(data);
                    }

                });
            })
            .fail(function(err) {
                console.error(JSON.stringify(err));
                deferred.reject(err);
            });

        return deferred.promise;


    },

    validateUser: function(username) {
        // spoofing the DB response for simplicity
        var dbUserObj = { // spoofing a userobject from the DB. 
            name: 'arvind',
            role: 'admin',
            username: 'arvind@myapp.com'
        };

        return dbUserObj;
    },

}

// private method
function genToken(user) {
    logger.debug('user tok' + user);
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;