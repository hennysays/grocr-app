var mongoose = require ("mongoose");
var async = require("async");
var Order = mongoose.model('Order');

exports.post = function(req, res) {
    
    var order = req.body;
    async.series([
        function(callback) {
            var newOrder = new Order({
                user: req.user._id,
                date: order.date,
                orderProcessed: order.orderProcessed,
                memo: order.memo,
                basket: order.basket
            }).save(function(err) {
                    if (err) callback(err);
                    else callback(null);
            });
        },
        function(callback) {
            req.user.basket = [];
            req.user.save(function(err){
                if(err) callback(err);
                else callback(null);
            });

    }],function(err,result){
        if(err) res.send(500,{message: "FAILED TO SAVE ORDER"});
        else {console.log("TEST PASSED");res.send(200,{message:"SUCCESS ON ORDER SAVE"})};
    });
}