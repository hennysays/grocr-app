define([
  'jquery',
  'underscore',
  'backbone',
  'models/groceryItemModel'
  ], function($, _, Backbone,GroceryItemModel) {    
    var GroceryBasketItemModel = GroceryItemModel.extend({
        idAttribute: "_id",
        defaults: {
        	quantity: 1,
        },

    });
    return GroceryBasketItemModel;
});