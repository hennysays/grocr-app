define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {    
    var OrderModel = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot: "/orders",
        defaults: {
          orderProcessed: false,
          date: new Date()
        }
    });
    return OrderModel;
});