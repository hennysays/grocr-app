var mongoose = require ("mongoose");
var async = require('async');
var GroceryItem = require('./models/groceryItem');
// var groceryStoreModel = require('./models/groceryStore');

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


// var GroceryItem  = groceryItemModel.get();
// var GroceryStore = groceryStoreModel.get();

var csv = require('csv');
var data = 'csv_files/grocr_items.csv';
// var data = 'csv_files/Grocer Test Input.csv';

// GroceryStore.findById('2', function(err,store) { // METRO
// // GroceryStore.findById('1', function(err,store) { // PROVIGO
// // var store = new GroceryStore();
// // store.save(function(err) {
//     if(err) console.log("Is Fail");
    
    // else {
        csv().from(data,{columns: true}).to.array(function(data,count){
            var savingItem = function(itemdata, callback) {
                var jsonString = JSON.stringify(itemdata);
                var item = JSON.parse(jsonString);
                
                // if(isNaN(item.price)) {
                // 	item.price = null;
                // }
                
                // if(isNaN(item.quantity)) {
                // 	item.quantity = null;
                // }
                
                var priceString = "$ " + parseFloat(item.unitPrice).toFixed(2);
                priceString = (item.units == '') ? priceString + " ea." : priceString + "/" + item.units;
                console.log(priceString);
                var newItem = new GroceryItem ({
                    name: item.name,
                    description: item.description,
                    price: priceString,
                    unitPrice: item.unitPrice,
                    // quantity: item.quantity,
                    // units: item.units,
                    imageURL: 'https://s3.amazonaws.com/grocr/items/' + item.id + '.jpg',
                    // store: store._id
                });
                newItem.save(function(err) {
                    if (err) console.log ('Error on save!');
                    callback(null);
                });
            };

            async.each(data,savingItem,function(err){
                if(err) console.log("FAILURE");
                else console.log("Finish");
            });
        });
// }

// });