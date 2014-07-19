var mongoose = require ("mongoose");
var User = mongoose.model('User');

exports.getUserInfo = function(req, res) {
	res.send(200, req.user);
}