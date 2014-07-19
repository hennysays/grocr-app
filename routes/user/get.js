var mongoose = require ("mongoose");
var User = mongoose.model('User');

exports.get = function(req, res) {
	    User.find({},'local.email isAdmin sessions local.dateCreated').exec(function(err,users) {
	        if (err) {
	            res.send(500,{message: "FAILURE"});
	        }
	        else {
	            res.send(200,users);    
	        }
	    });
}