var connectionManager = require('./connectionManager');
let logger = require("../utils/logger");
var cc = require('coupon-code');

var CONST_DAYS = {
    EVERY_DAY: 2,
    EVERY_WEEKEND: 3,
    WEEKDAYS: 4,
};
var exam = {
    create: function(req, res) {
        var exam= new Object();

       exam.name= req.body.exam.name;
       exam.duration= req.body.exam.duration;
       exam.totalques=req.body.exam.totalques;
       exam.negativemark=req.body.exam.negativevalue;
       exam.questionPick=req.body.exam.pickupval;
       exam.subject=req.body.exam.subjectType;
       exam.coupon=cc.generate({ partLen : 4 });
      
       if( exam.questionPick==2){
        
        exam.selctedqueslist=req.body.exam.selectedQues.toString();

       }
     
 var insertQuery = 'INSERT INTO exams SET ?';
      
        var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
            req.headers['x-key'];
        console.log(key);
        exam.user = key;
        connectionManager.getConnection()
            .then(function(connection) {
                var query = connectionManager.prepareQuery(insertQuery, exam);
                //  console.log('Query to execute:' + query);
                connection.query(query, function(error, result) {
                    logger.info(result);
                    connection.end();
                 
                    if (error) {
                        logger.debug(error);
                        res.json({
                            "status": 400,
                            "message": "Failed Adding retry !"
                        });
                    }
                    if (result.affectedRows > 0) {
                        res.status(200);
                        res.json({
                            "status": 200,
                            "message": "Added Succesfully  !"
                        });
                    } else {


                    }
                });
            })
            .fail(function(err) {
                logger.debug(JSON.stringify(err));
            });


    },

getExambyUser:function(req,res){

var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
			req.headers['x-key'];
		console.log(key);
		connectionManager.getConnection()
			.then(function (connection)
			{
				connection.query(
					'SELECT * from exams where user= ?'
					, [key]
					, function (error, results)
					{
						var exams = [];
					
						for (var i = 0; i < results.length; i++)
						{
							var exam = new Object();
                            exam.name=results[i].name;
                            exam.totalques=results[i].totalques;
                             exam.duration=results[i].duration;
                             exam.coupon=results[i].coupon;
                            

							exams.push(exam);
						}
						res.status(200);
						res.json(exams);
						if (error)
						{
							console.error(error);
						}
					});
			})
			.fail(function (err)
			{
				console.error(JSON.stringify(err));
			});

}

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
module.exports = exam;