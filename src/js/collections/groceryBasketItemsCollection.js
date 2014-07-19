define([
  'jquery',
  'underscore',
  'backbone',
  'models/groceryBasketItemModel'
], function($, _, Backbone, GroceryBasketItemModel){
  var GroceryBasketItemsCollection = Backbone.Collection.extend({
    model: GroceryBasketItemModel,
      url: '/groceryBasketItems'
  });

  return GroceryBasketItemsCollection;
});