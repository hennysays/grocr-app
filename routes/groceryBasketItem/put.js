var _ = require("underscore");
var async = require("async");

exports.put = function(req, res) {
	var itemId = req.params.id;
	async.waterfall([

		function(callback) {
			var updatedBasket = _.map(req.user.basket, function(item){
									if(itemId == item._id.valueOf()){
										item.quantity = req.body.quantity;
									}
										return item;
								});
			callback(null,updatedBasket);
		},
		function(arg,callback) {
			req.user.test = 2;
			req.user.basket = arg;
			req.user.save(function(err,user) {
				if(err) {
					callback(err,{message: "failure"});
				}
				else {
					callback(null,user);
				}
			});
		}
	], function(err,result){
			if(err) {
				res.send(500,result);
			}
			else {
				res.send(200,result);
			}

	});
}