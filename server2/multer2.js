let multer = require('multer');
let express = require('express');
let app = express();

let logger = require("./utils/logger");
let offer = require('./routes/offer.js');


var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '100mb'
}));


  var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });


let upload = multer({
    storage: storage
});

app.all('/api/*', function(req, res, next) {
    logger.debug('CSRF' + JSON.stringify(req.headers));
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

app.use(express.static('../ngClient'));

app.get('/offers', function (req, res) {
offer.getAll().then(function(data){
    res.status(200);
res.json(data);
}).fail(function(err){
res.json();
});

})

app.post('/api/v1/single', upload.single('somefile'), (req, res) => {

                let myOffer=req.body.offer;
                myOffer.banner='';
                let bannerfilename='';

                    var fs = require('fs');

                    if (req.body.offer.file != undefined) {
                        let base64String = req.body.offer.file;
                        let base64Image = base64String.split(';base64,').pop();
                        var datetimestamp = Date.now();
                        bannerfilename='offer_'+datetimestamp;

                        myOffer.banner=bannerfilename+'.png';

                        // logger.info(JSON.stringify(myOffer));

                                fs.writeFile('./uploads/'+bannerfilename+'.png', base64Image, {
                                    encoding: 'base64'
                                }, function(err) {
                                    console.log('File created');
                                });

                            }
                        logger.info(JSON.stringify(myOffer));
                        offer.create(myOffer).then(function(data){

                                    res.status(200);
                                    res.json({
                                        "status": 200,
                                        "message": "SuccessFully Added"
                                    });
                                }).
                                fail(function(err){
                                res.status(202);
                                    res.json({
                                        "status": 202,
                                        "message": "Error hapened"
                                    });
                            });

});

function getUserIdFromReq(req){


var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
return key;


}

app.post('/array', upload.array('somefile'), (req, res) => {
    console.log(req.body)
    console.log(req.files);
    res.send();
});

app.listen(3000);
console.log('server started');