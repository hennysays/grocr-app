var request = require('request');
var cheerio = require('cheerio');
var mongoose = require("mongoose");
var async = require('async');
var GroceryItem = require('../models/groceryItem');
var GroceryStore = require('../models/groceryStore');
var categories = require('./categories');


exports.run = function(globalcallback) {
    var url = 'http://www.loblaws.ca/en_CA/flyers.banner@LOBPQ.storenum@8310.week@current.next@1.limit@500.html';
    var storeID = 3;
    request(url, function(err, resp, body) {
        if (err)
          throw err;
        $ = cheerio.load(body);
        date = $('.header-content h2.title').text().trim();
        expirydate = formatLoblawsDate(date);

        var items = [];
        $('.card-grid-layout .product').each(function() {
            var item = new Object();
            details = $(this).find('div.details').find('div.more').html().trim().replace(/[\r\n]+/g,'');
            
            // Normal English Formatting
            if(details.indexOf('<br><br') != -1) {
                details = formatLoblawsNameAndDescription(details);
                item.name = details[0];   
                item.description = '';
                if(details.length>1) {
                    for(i=1;i<details.length-1;i++) {
                      if(details[i] != '') {
                          item.description += details[i] + ', ';
                      }
                  }
                  item.description += details[details.length-1];
                }
                else item.description = '';
            }
            else {
                title = $(this).find('h3.title').text().trim();
                details = formatLoblawsNameAndDescription(details);
                if(isFormatIrregularLoblawsDetails(details)) {
                    item.name = title;
                    item.description='';
                    for(i=0;i<details.length-1;i++) {
                        if(details[i] != '') {
                            item.description += details[i] + ', ';
                        }
                    }
                    item.description += details[details.length-1];
                }
                else {
                    item.name = details[0];
                    item.description='';
                    for(i=1;i<details.length-1;i++) {
                        if(details[i] != '') {
                            item.description += details[i] + ', ';
                        }
                    }
                    item.description += details[details.length-1];
                }
            }
            savings = $(this).find('p.savings').text().trim();
            price = $(this).find('div.details .price').text().trim();        
            price = formatLoblawsPrices(price);
            item.category = categories.categorize(item.name,item.description);
            item.savings = savings;
            item.price = price;
            item.unitPrice = getUnitPrice(price);
            item.units = '';
            item.date = expirydate;
            items.push(item);
        });

        GroceryStore.findById(storeID, function(err,store) {
            if(store.publicationId == expirydate.toString()) {
                console.log("Current flyer already scraped");
                globalcallback(null,'LOBLAWS');
            }
            else {

                GroceryItem.remove({store: storeID}).exec(function (err) {
                    if(err) console.log('Error removing items');
                });

                store.publicationId = expirydate.toString();
                store.save(function(err) {
                    if(err) console.log("FAILURE TO SAVE STORE");
                });

                var savingItem = function(item, callback) {
                    var newItem = new GroceryItem({
                        name: item.name.toLowerCase().toProperCase(),
                        description: item.description,
                        savings: item.savings,
                        price: item.price,
                        unitPrice: item.unitPrice,
                        units: item.units,
                        date: item.date,
                        category: item.category,
                        store: store._id
                    }).save(function(err) {
                            if (err) console.log ('Error on save!');
                                callback(null);
                        });
                };
                async.each(items,savingItem,function(err){
                    if(err) console.log("FAILURE");
                    else {
                        console.log("Finish");
                        console.log(items.length + ' items were saved');
                        globalcallback(null,'LOBLAWS');
                    }
                });
            }
        });
    });
}




function formatLoblawsNameAndDescription(details) {
  formattedDetails = details.replace(/[\w\u00C0-\u017F!@#\$%\^&\*\(\)_\+-=\[\]\{};':"\\\|,\.<>\/\?\s«»¢]*\/(\s)?<br><br>/,'') // replace everytghing before two <br>'s
                          .replace(/<[\w\/=#:,-;"\s]+>/g,';') // replace all html tags
                          .replace(/(\s)?,(\s)?/g,',') // replace all commas with spaces to just commas
                          .replace(/(\s|,|;)?;(\s|,|;)?/g,';') // replace all repeating tags
                          .replace(/^;/,'')
                          .replace(/;$/,'')
                          .split(';');
  return formattedDetails;
}

function isFormatIrregularLoblawsDetails(details) {
    if(details[0].match(/^[0-9]|(pqt)|(certain)|(ch\.)|(produit)/)!=null) {
        return true;
    }
    else {
        return false;
    }
}


function formatLoblawsPrices(price) {
    price = price.replace(/\slb[\w\s,\/\$¢]*/g,'/lb'); // get rid of kg conversion
    price = price.replace(/\s(ch\.|chacun)\/(ea\.|each)/,''); // get rid of ch./ea. 
    price = price.replace(/\sou(\/or)?[\w\s,\/\$¢\.]*/,''); // get rid of unit price
    price = price.replace(/\s\/100\sg[\w\s,\/\$¢]*/,'/100 g'); // get rid of lb conversion
    price = price.replace(/\spour\/for\s/,"/"); // change pour/for to /
    price = price.replace(/pqt de\//,''); // get rid of french pqt de
    if(price.indexOf('¢')!=-1) { // get rid of cents
        price = price.replace('¢','$');
        price = '0,' + price;
    }
    price = price.replace(/\s+\$/,' $');

    if(price=='') {
        price = 'No Price Listed';
    }

    return price;
}

function formatLoblawsDate(date) {
    date = date.replace(/[\w\s]+\s-\s/,'');
    date = date.split(' ');
    
    dateCurrent = new Date();
    year = dateCurrent.getFullYear();
    if(dateCurrent.getMonth()==11 && date[1]=='January') {
        year +=1;
    }

    formattedDate = new Date(date[1] + ' ' + date[2] + ' ' + year);

    dateInMilliseconds = Date.parse(formattedDate.toDateString());
    return dateInMilliseconds + 14400000;
}

String.prototype.toProperCase = function () {
    return this.replace(/(\w|\u00C0-\u017F)\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function getUnitPrice(price) {
    var unitPrice;
    if(price=='' || price.match(/^[0-9]/)==null) {
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
};

