var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
    Name: String,
    ImageUrl: String,
    Price: Number,
    Ordered: Number
})

ShopSchema.methods.addOrder = function(cb) {
    this.Ordered += 1;
    this.save(cb);
}

mongoose.model('Shop', ShopSchema);