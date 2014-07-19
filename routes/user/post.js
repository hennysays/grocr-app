var mongoose = require ("mongoose");
var User = mongoose.model('User');

exports.post = function(req, res, next) {
    req.user.userInfo = req.body.userInfo;

    req.user.save(function(err,user) {
        if(err) {
            res.send(500, {message:"failure'"})
        }
        else {
            res.send(200,{message: "success"});
        }
    });
}