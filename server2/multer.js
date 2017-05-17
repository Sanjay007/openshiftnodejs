
let multer  = require('multer');
let express = require('express');
let app     = express();

var offer = require('./routes/offer.js');

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    
    callback(null, file.fieldname + '-' + Date.now()+'.jpg');
  }
});


let upload  = multer({ storage: storage });
 
 app.use(express.static('../ngClient'));
 
app.post('/api/v1/single', upload.single('somefile'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send();
});

app.post('/array', upload.array('somefile'), (req, res) => {
  console.log(req.body)
  console.log(req.files);
  res.send();
});

app.listen(8080);