define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {    
    var GroceryItemModel = Backbone.Model.extend({
        idAttribute: "_id",
    });
    return GroceryItemModel;
});