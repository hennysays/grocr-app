var mongoose = require ("mongoose");
var csv = require('csv');
var async = require('async');
var GroceryStore = require('./models/groceryStore');

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


var data = 'csv_files/store_listings.csv';

async.series(
    [
        function(callback) {
            GroceryStore.remove(function(err) {
                if(err) console.log("Error on Deleting stores");
                callback(null,'one');
            });
        },
       function(callback) {
            test(callback);
        }
    ],
    function(err,results){
        if(err) console.log("Error on adding stores");
        process.exit();
    }
);


function test(globalcallback){ 
    csv().from(data,{columns: true}).to.array(function(data,count) {
                var savingStore = function(storedata, callback) {
                    var jsonString = JSON.stringify(storedata);
                    var store = JSON.parse(jsonString);
                    var newStore = new GroceryStore({
                            name: store.name,
                            street: store.street,
                            city: store.city,
                            province: store.province,
                            country: store.country,
                            lat: store.lat,
                            lng: store.lng,
                            geo: [store.lng,store.lat],
                            _id: store.id
                        })
                    .save(function(err) {
                                if (err) console.log ('Error on save!');
                                callback(null);
                    });
                };
                async.each(data,savingStore,function(err){
                    if(err) console.log("FAILURE");
                    else {
                      console.log("Finish");
                      console.log(data.length + ' stores were saved');
                      globalcallback(null,"two");
                    }
                });
    });
};