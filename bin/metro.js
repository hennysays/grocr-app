var mongoose = require ("mongoose");
var _ = require("underscore");
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var GroceryItem = require('../models/groceryItem');
var GroceryStore = require('../models/groceryStore');
var categories = require('./categories');


exports.run = function(globalcallback) {
    var url = 'http://www.metro.ca/flyer/index.en.html?id=80';
    var storeID = 2;
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('Script').each(function(indx) {
            var text = $(this).html();
            if( text.indexOf('// bootstrapping models') != -1) {

// «»¢®†
                var jsonMatch = text.match(/\[\{"promotionId[\w\u00C0-\u017F!@#\$%\^&\*\(\)_\+-=\[\]\{};':"\\\|,\.<>\/\?\s]*}]}]/g); // includes accents \u00C0-\u017F
                var jsonString = jsonMatch[0];

                
                jsonString = jsonString.replace(/FREE/g,'FREE ');
                jsonString = jsonString.replace(/(^\[)|(\]$)/g,'');
                // Look back if alphanumeric characters present  + double quote + look forward if comma,colon,closing brackets present
                // jsonString = jsonString.replace(/(\w)?"(?!,|:|}|])/g,function($0,$1){
                //     return $1 ?  $1  + ' inches':$0;
                // });

                
                
                var jsonArray = jsonString.split(/,(?=\{"promotionId)/);
                var items = [];

                for(i=0;i<jsonArray.length;i++) {                    
                    items.push(JSON.parse(jsonArray[i]));
                }

                GroceryStore.findById(storeID, function(err,store) {
                    if(store.publicationId == items[0].publicationId) {
                        console.log("Current flyer already scraped");

                        globalcallback(null,'METRO');
                    }
                    else {

                        GroceryItem.remove({store: storeID}).exec(function (err) {
                            if(err) console.log('Error removing item');
                        });

                        store.publicationId = parseInt(items[0].publicationId);
                        store.save(function(err) {
                            if(err) console.log("FAILURE TO SAVE STORE");
                        });


                        var savingItem = function(item, callback) {
                            var metroItem = formatMetroItem(item);
                            var newItem = new GroceryItem({
                                name: metroItem.name,
                                description: metroItem.description,
                                savings: metroItem.savings,
                                price: metroItem.price,
                                unitPrice: metroItem.unitPrice,
                                units: metroItem.units,
                                date: metroItem.date,
                                category: metroItem.category,
                                store: store._id
                            }).save(function(err) {
                                    if (err) console.log ('Error on save!');
                                    callback(null);
                                });

                        };
                        async.each(items,savingItem,function(err){
                            if(err) console.log("FAILURE");
                            else  {
                                console.log("Finish");
                                console.log(items.length + ' items were saved');
                                globalcallback(null,'METRO');
                            }
                        });
                    }
                });
            }
        });
    });

}

function formatMetroItem(rawItem) {
    var metroItem = new Object();

    metroItem.name = decodeHtml(rawItem.shortDescription);
    metroItem.name = metroItem.name.replace(/[\w\u00C0-\u017F!@#\$%\^&\*\(\)_\+-=\[\]\{};':"\\\|,\.<>\/\?\s«»¢]+\|\s/g,'').toLowerCase().toProperCase();

    metroItem.description = decodeHtml(rawItem.longDescription);
    
    savings = decodeHtml(rawItem.priceSavings);
    if(savings == 'n/a') {
        savings = '';
    }
    metroItem.savings = savings;

    price = decodeHtml(rawItem.price);
    if(price == null) {
        if(rawItem.bonusValue != null) {
            price = rawItem.bonusValue + " bonus Metro points";
        }
        else {
            price = 'No Price Listed';
        }
    }
    metroItem.price = price;
    metroItem.unitPrice = getUnitPrice(price);

    units = decodeHtml(rawItem.priceUnit);
    if(units == null ||  units == 'après réduction' || units == 'CH.' || units == 'ch.') {
        units = '';
    }
    else if(units == 'le 100 g') {
        units = '/100 g';
    }
    metroItem.units = units;

    metroItem.date = decodeHtml(rawItem.promotionEndDate);
    metroItem.category = categories.categorize(metroItem.name,metroItem.description);
    return metroItem;
};

String.prototype.toProperCase = function () {
    return this.replace(/(\w|\u00C0-\u017F)\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function decodeHtml(val) {
    if(val !==null) {
        // Convert html code back to text
        return $('body').html(val).text().replace(/[\r\n]+/g,' ').replace(/\\/g,'|');
    }
    return val;
}

function getUnitPrice(price) {
    var unitPrice;
    if(price.indexOf('bonus Metro points')!=-1 || price.indexOf('No Price Listed')!=-1) {
        unitPrice = 1000000;
    }
    else {
        unitPriceString = price.match(/[0-9,\/]+(?=(\s)?\$)/);
        denominator = unitPriceString[0].match(/[0-9]+(?=\/)/);
        if(denominator!=null) {
            numerator = unitPriceString[0].replace(/[0-9]+\//,'');
            denominator = parseFloat(denominator);
            numerator = parseFloat(numerator.replace(',','.'));
            unitPrice = numerator/denominator;

        }
        else {
            unitPrice = parseFloat(unitPriceString[0].replace(',','.'));
        }
    }
    unitPrice = unitPrice.toFixed(2);
    return unitPrice;
};


