var mongoose = require ("mongoose");
var async = require('async');
var groceryStoreModel = require('./models/groceryStore');
var GroceryStore = groceryStoreModel.get();

var uristring = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/mydb';

mongoose.connect(uristring, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('\nMongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

GroceryStore.remove(function(err) {
    if(err) console.log("ERROR ON DELETING STORE");
    process.exit();
});