




var menu = {


  getAll: function(req, res) {
    var allMenu = data; // Spoof a DB call
    res.json(allMenu);
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var menu = data[0]; // Spoof a DB call
    res.json(menu);
  },

  create: function(req, res) {

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '326425',
  key: '4abff04f177d0ad386da',
  secret: 'e9287f88597fb7aebac3',
  cluster: 'ap2',
  encrypted: true
});
    var menu = req.body;
    menu.id=data.length+1;
    console.log('***server Menu create'+menu.id);
      // pusher.trigger('menus', 'updated', menu);
var finalMenu=menu;



    data.push(finalMenu); // Spoof a DB call

    res.json(finalMenu);
   pusher.trigger('my-channel', 'my-event',finalMenu);

  },

  update: function(req, res) {
    var menu = req.body;
    var id = req.params.id;
    data[id] = menu // Spoof a DB call
    res.json(menu);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }

};
var data = [{
    id:'1',
    cat:'1',
    subCat:'2',
     name: 'user 1',
     desc: 'this is blah blah blkahh',
    price :'122'
}, {
    id:'2',
    cat:'1',
    subCat:'3',
     name: 'menu2',
     desc: 'this is blah blah blkahh',
    price :'122'
}, {
    id:'3',
    cat:'2',
    subCat:'4',
     name: 'menu2',
     desc: 'this is blah blah blkahh',
    price :'122'
}];

module.exports = menu;