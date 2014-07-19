var mongoose = require ("mongoose");
var request = require('request');
// var cheerio = require('cheerio');
var async = require('async');
var GroceryItem = require('../models/groceryItem');
var GroceryStore = require('../models/groceryStore');
var categories = require('./categories');


exports.run = function(globalcallback) {
    var publication = '1f291800-d0aa-48fd-bc4c-a1b0304c0e7c';
    var url = 'http://local.flyerservices.com/SDM/PHX/en/' + publication + '/Product/ListAllProducts'
    var storeID = 4;
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        jsonObject = JSON.parse(body);
        var items = jsonObject.Products;

        GroceryStore.findById(storeID, function(err,store) {
            if(store.publicationId == items[0].PublicationId) {
                console.log("Current flyer already scraped");

                globalcallback(null,'METRO');
            }
            else {

                GroceryItem.remove({store: storeID}).exec(function (err) {
                    if(err) console.log('Error removing item');
                });
                store.publicationId = items[0].PublicationId;
                
                store.save(function(err) {
                    if(err) console.log("FAILURE TO SAVE STORE");
                });

                var savingItem = function(item, callback) {
                    var pharmaprixItem = formatPharmaprixItem(item);
                    var newItem = new GroceryItem({
                        name: pharmaprixItem.name,
                        description: pharmaprixItem.description,
                        savings: pharmaprixItem.savings,
                        price: pharmaprixItem.price,
                        unitPrice: pharmaprixItem.unitPrice,
                        units: pharmaprixItem.units,
                        date: pharmaprixItem.date,
                        category: pharmaprixItem.category,
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
                        globalcallback(null,'PHARMAPRIX');
                    }
                });  
            } 
        });
});
}

function formatPharmaprixItem(rawItem) {
    var pharmaprixItem = new Object();
    pharmaprixItem.name = rawItem.ProductTitle.replace(/œ/gi,'oe').toLowerCase().toProperCase();
    pharmaprixItem.description = rawItem.Description.replace(/<[\w\/=#:;"\s]+>/g,'').replace(/\r\n\r\n/g,' \r\n').replace(/\r\n/g,', ').replace(/œ/gi,'oe');
    savings = rawItem.PriceSavings;
    if(savings == 'n/a') {
        savings = '';
    }
    pharmaprixItem.savings = savings;

    price = rawItem.Price;
    if(price == null) {
        price = 'No Price Listed';
    }

    if(price.indexOf('¢')!=-1) { // get rid of cents
        price = price.replace('¢','$');
        price = '0,' + price;
    }
    price = price.replace(/(\s)?\/(\s)?/g,'/');
    pharmaprixItem.price = price;
    pharmaprixItem.unitPrice = getUnitPrice(price);

    pharmaprixItem.units = rawItem.PriceUnit;
    date = rawItem.EffectiveEndDate;
    date = date.match(/[0-9]+/);
    pharmaprixItem.date = parseInt(date[0]);

    pharmaprixItem.category = categories.categorize(pharmaprixItem.name,pharmaprixItem.description);

    return pharmaprixItem;
}

String.prototype.toProperCase = function () {
    return this.replace(/(\w|\u00C0-\u017F)\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getUnitPrice(price) {
    var unitPrice;
    if(price=='' || price.indexOf('PLUS DE POINTS')!=-1 || price.match(/^[0-9]/)==null) {
        unitPrice = 1000000;
    }
    else {
        unitPriceString = price.match(/^[0-9,\/]+(?=(\s)?\$)/);
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
}


