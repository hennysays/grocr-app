var mongoose = require ("mongoose");
var GroceryUser = mongoose.model('User');

exports.put = function(req, res) {
    req.setEncoding('utf8');
    var user= req.body;

    GroceryUser.findById(user.id,function(err,olduser) {
        if(olduser!=null) {
            res.send('User already exists'); 
            console.log("user already exists");
        }
        else {
            // If User is new
            var newUser = new GroceryUser ({
                name: user.name,
                gender: user.gender,
                appUseCount: 0,
                _id: user.id
            }).save(function (err) {
                if (err) {console.log("FAIL"); res.send('Add User FAIL');}
                else {console.log("Added new user"); res.send('Added New User'); }
            });
        }
    });

}