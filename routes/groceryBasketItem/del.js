
var _ = require("underscore");
var async = require("async");

exports.del = function(req, res) {
	
	var itemId = req.params.id;
	async.waterfall([
		function(callback) {
			console.log("Before delete: " + req.user.basket.length);
			var updatedBasket = _.reject(req.user.basket,function(item) {
									return itemId == item._id.valueOf();
								});
			callback(null,updatedBasket);
		},
		function(arg,callback) {
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
				console.log("after delete: " + result.basket.length);
				res.send(200,result);
			}

	});	
}

