var connectionManager = require('./connectionManager');
let logger = require("../utils/logger");
var CONST_DAYS = {
	EVERY_DAY: 2
	, EVERY_WEEKEND: 3
	, WEEKDAYS: 4
, };
var question = {
	create: function (req, res)
	{
		var insertQuery = 'INSERT INTO question SET ?';
		var inques = new Object();
		inques.question = req.body.question;
		inques.correct = req.body.correct;
		inques.optionA = req.body.answers[0].text;
		inques.optionB = req.body.answers[1].text;
		inques.optionC = req.body.answers[2].text;
		inques.optionD = req.body.answers[3].text;
		inques.subject_code = req.body.category.name;
		var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
			req.headers['x-key'];
		console.log(key);
		inques.user = key;
		connectionManager.getConnection()
			.then(function (connection)
			{
				var query = connectionManager.prepareQuery(insertQuery, inques);
				//  console.log('Query to execute:' + query);
				connection.query(query, function (error, result)
				{
					logger.info(result);
					connection.release();
					if (error)
					{
						logger.debug(error);
						res.json(
						{
							"status": 400
							, "message": "Failed Adding retry !"
						});
					}
					if (result.affectedRows > 0)
					{
						res.status(200);
						res.json(
						{
							"status": 200
							, "message": "Added Succesfully  !"
						});
					}
					else
					{}
				});
			})
			.fail(function (err)
			{
				logger.debug(JSON.stringify(err));
			});
	},
	 getbyUser: function (req, res)
	{
		var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
			req.headers['x-key'];
		console.log(key);
		connectionManager.getConnection()
			.then(function (connection)
			{
				connection.query(
					'SELECT qid,question,optionA,optionB,optionC,optionD,subject_code,correct from question where user= ?'
					, [key]
					, function (error, results)
					{
						var ques = [];
						let count = 0;
						for (var i = 0; i < results.length; i++)
						{
							var question = new Object();
							question.correct = results[i].correct;
							question.category = results[i].subject_code;
							var answer = [];
							count = count + 1;
							question.countid = count;
							var A_optio = new Object();
							var B_optio = new Object();
							var C_optio = new Object();
							var D_optio = new Object();
							A_optio.id = "A";
							A_optio.text = results[i].optionA;
							B_optio.id = "B";
							B_optio.text = results[i].optionB;
							C_optio.id = "C";
							C_optio.text = results[i].optionC;
							D_optio.id = "D";
							D_optio.text = results[i].optionD;
							answer.push(A_optio);
							answer.push(B_optio);
							answer.push(C_optio);
							answer.push(D_optio);
							question.answers = answer;
							question.question = results[i].question;
							question.qid = results[i].qid;
							ques.push(question);
						}
						res.status(200);
						res.json(ques);
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
	, getQuesbySubject: function (req, res)
	{
		var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) ||
			req.headers['x-key'];
		var subject = req.body.subject;
		console.log(key);
		connectionManager.getConnection()
			.then(function (connection)
			{
				connection.query(
					'SELECT qid,question,optionA,optionB,optionC,optionD,subject_code,correct from question where user= ? and subject_code= ?'
					, [key, subject]
					, function (error, results)
					{
						var ques = [];
						let count = 0;
						for (var i = 0; i < results.length; i++)
						{
							var question = new Object();
							question.correct = results[i].correct;
							question.category = results[i].subject_code;
							var answer = [];
							count = count + 1;
							question.countid = count;
							var A_optio = new Object();
							var B_optio = new Object();
							var C_optio = new Object();
							var D_optio = new Object();
							A_optio.id = "A";
							A_optio.text = results[i].optionA;
							B_optio.id = "B";
							B_optio.text = results[i].optionB;
							C_optio.id = "C";
							C_optio.text = results[i].optionC;
							D_optio.id = "D";
							D_optio.text = results[i].optionD;
							answer.push(A_optio);
							answer.push(B_optio);
							answer.push(C_optio);
							answer.push(D_optio);
							question.answers = answer;
							question.question = results[i].question;
							question.qid = results[i].qid;
							ques.push(question);
						}
						res.status(200);
						res.json(ques);
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
, };

function arrayToObj(array, fn)
{
	var obj = {};
	var len = array.length;
	for (var i = 0; i < len; i++)
	{
		var curVal = array[i];
		var key = fn(curVal, i, array);
		obj[key] = curVal;
	}
	return obj;
}
module.exports = question;