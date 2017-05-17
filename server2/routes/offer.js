var jwt = require('jwt-simple');
var q = require('q');
var fs=require('fs');

var util = require("util");
var mime = require("mime");

var connectionManager = require('./connectionManager');
// Load the bcrypt module
var bcrypt = require('bcrypt');
// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync("pass1234", salt);
console.log(hash);

let logger = require("../utils/logger");
var CONST_DAYS = {
    EVERY_DAY: 2,
    EVERY_WEEKEND: 3,
    WEEKDAYS: 4,
};

var offer = {

    create: function(offer) {
        var deferred = q.defer();
        var insertQuery = 'INSERT INTO offers SET ?';
        var offers = new Object();
        offers.headline = offer.headline;
        offers.desc = offer.desc;
        offers.cat = offer.cat;
        offers.subcat = offer.subCat;
        offers.offer_start_date_time = offer.offer_start_date_time;
        offers.offer_end_date_time = offer.offer_end_date_time;

        offers.is_happy_hr = offer.isHappyHr;
        offers.banner = offer.banner;
        if (offer.happyhour != undefined) {

            offers.happy_hr_day_val = offer.happyhour.happy_hr_day_val;
            offers.happy_hr_start_time = offer.happyhour.happy_hr_start_time;
            offers.happy_hr_end_time = offer.happyhour.happy_hr_end_time;
            offers.happy_hr_start_date = offer.happyhour.happy_hr_start_date;
            offers.happy_hr_end_date = offer.happyhour.happy_hr_end_date;

        }

        console.log('******************' + offer.banner);

        connectionManager.getConnection()
            .then(function(connection) {
                var query = connectionManager.prepareQuery(insertQuery, offers);
                //  console.log('Query to execute:' + query);
                connection.query(query, function(error, result) {
                    console.log(result);
                    if (error) {
                        console.error(error);
                        deferred.reject(error);
                    }

                    if (result.length <= 0) {
                        deferred.reject(result);
                    } else {
                        deferred.resolve(result);
                    }

                });
            })
            .fail(function(err) {
                console.error(JSON.stringify(err));
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getAll :function(){
 var deferred = q.defer();

    connectionManager.getConnection()
        .then(function (connection) {
            connection.query('SELECT * FROM offers', function (error, results) {

                if (error) {
                    console.error(error);
                    deferred.reject(error);
                }
                
                deferred.resolve(results);
            });
        })
        .fail(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });

    return deferred.promise;

},

getStore:function(req,res){
var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

 connectionManager.getConnection()
        .then(function (connection) {
            connection.query('SELECT s.name as name,s.addres_line_1 as lane1,s.address_line_2 as lane2,s.city as city,s.pincode as pincode ,s.area as area FROM users u  join stores s on u.id=s.owner_id where u.username= ?' ,[key], function (error, results) {
            
               
                if(typeof results[0].image!=undefined){
                  
                   var data = fs.readFileSync('./uploads/a.png').toString("base64");    
                
                var xyz= util.format("data:%s;base64,%s", mime.lookup('./uploads/a.png'), data);
                  
                   results[0].data=xyz;

                }

                res.status(200);
                res.json(results);
                if (error) {
                    console.error(error);
                }
        });
        })
        .fail(function (err) {
        console.error(JSON.stringify(err));

        });

},


getDashCurrent:function(req,res){
var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
 connectionManager.getConnection()
        .then(function (connection) {
            connection.query('SELECT count(added_on) as count_added_on,added_on,count(is_happy_hr) as count_is_happy_hr,is_happy_hr FROM offers o group by added_on,is_happy_hr', function (error, results) {
                console.log(results);


                res.status(200);
                res.json(results);
                if (error) {
                    console.error(error);
                }
        });
        })
        .fail(function (err) {
        console.error(JSON.stringify(err));

        });

},
getOfferbyId:function(req,res){
var Id = req.body.id;
console.log(Id);
 connectionManager.getConnection()
        .then(function (connection) {
            connection.query('SELECT * from offers where id= ?',[Id], function (error, results) {
//               var obj =arrayToObj(results[0]);
// console.log(obj);

var object=new Object();
object.offers=results[0];

                res.status(200);
                res.json(object);
                if (error) {
                    console.error(error);
                }
        });
        })
        .fail(function (err) {
        console.error(JSON.stringify(err));

        });

},
};

function arrayToObj(array, fn) {
	var obj = {};
	var len = array.length;
	for (var i = 0; i < len; i++) {
		var curVal = array[i];
		var key = fn(curVal, i, array);
		obj[key] = curVal;
	}
	return obj;
}
module.exports = offer;