define([
  'jquery',
  'underscore',
  'backbone',
  'models/groceryItemModel'
], function($, _, Backbone, GroceryItemModel){
  var GroceryItemsCollection = Backbone.Collection.extend({
    model: GroceryItemModel,
      url: '/groceryItems'
  });

  return GroceryItemsCollection;
});