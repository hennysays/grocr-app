var mongoose = require ("mongoose");
var Orders = mongoose.model('Order');

exports.get = function(req, res) {

Orders.find().populate('user').lean().exec(function (err, items) {
    if (err) {
        res.send(500,{message: "FAILURE"});
    }
    else {
    	console.log(items);
        res.send(200,items);
    }
});

}