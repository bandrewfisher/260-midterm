var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shop = mongoose.model('Shop');

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.sendFile('admin.html', {root: 'public'});
});

router.get('/shop', function(req, res, next){
    res.sendFile('shop.html', {root: 'public'});
})

router.post('/newProduct', function(req, res, next) {
    console.log("Adding new product");
    var item = new Shop(req.body);
    item.save(function(err, newItem) {
        if(err) console.error(err);
        else res.json(newItem);
    });
});

router.get('/products', function(req, res, next) {
   Shop.find(function(err, items) {
      if(err) console.error(err) 
      else res.json(items)
   });
});

router.param('item', function(req, res, next, id) {
    var query = Shop.findById(id);
    query.exec(function(err, item) {
        if(err) return next(err);
        if(!item) return next(new Error("Can't find item"));
        else {
            req.item = item;
            return next();
        }
    })
})

router.delete('/products/:item', function(req, res, next) {
    req.item.remove();
    res.sendStatus(200);
})

router.put('/products/:item', function(req, res, next) {
   req.item.addOrder(function(err, item) {
       if(err) console.error(err);
       else res.json(item);
   }) 
});

module.exports = router;
