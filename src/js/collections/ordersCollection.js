define([
  'jquery',
  'underscore',
  'backbone',
  'models/orderModel'
], function($, _, Backbone, OrderModel){
  var OrdersCollection = Backbone.Collection.extend({
    model: OrderModel,
      url: '/orders'
  });

  return OrdersCollection;
});