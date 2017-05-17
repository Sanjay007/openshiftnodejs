var express = require('express');
var router = express.Router();



var auth = require('./auth.js');

var offer = require('./offer.js');

var question= require('./question.js');
var exam=require('./exam.js');


/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);


router.post('/api/v1/ques',question.create);
router.get('/api/v1/ques',question.getbyUser);
router.post('/api/v1/ques/getbySubject',question.getQuesbySubject);

router.post('/api/v1/exam',exam.create);
router.get('/api/v1/exam',exam.getExambyUser);

router.get('/api/v1/getstore',offer.getStore);

router.get('/api/v1/dsb',offer.getDashCurrent);

router.post('/api/v1/offerbyId',offer.getOfferbyId);

module.exports = router;
