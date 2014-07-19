
var mongoose = require ("mongoose");
var GroceryItem  = mongoose.model('GroceryItem');

exports.post = function(req, res) {
	var item = req.body.item;	
	req.user.basket.push(item);
	req.user.save(function(err,user) {
		if(err) {
			res.send(500, {message:"failure'"})
		}
		else {
			res.send(200,{message: "success"});
		}
	});	
}

