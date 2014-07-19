

exports.get = function(req, res) {
	res.send(200,req.user.basket);
}

