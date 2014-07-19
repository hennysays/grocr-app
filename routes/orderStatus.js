
exports.get = function(req, res) {
	res.send(200,req.user.orderReady);
}

exports.put = function(req, res) {
	req.user.orderReady = req.body;
	req.user.save(function(err,user){
		if(err) res.send(500,{message: "fail on orderReady set"});
		else res.send(200,{message: "successfully set orderReady"});
	});
	
}