define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'collections/ordersCollection',
  'text!templates/admin/adminOrdersTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, OrdersCollection, AdminOrdersTemplate) {    
    var AdminOrdersView = BaseView.extend({
      name: "AdminOrdersView",
      events: {
          
      },

      initialize: function() {
          this.ordersCollection = new OrdersCollection();        
      },

      render: function(){

        that = this;
        this.ordersCollection.fetch({
                success: function(orders) {
                  that.$el.html(_.template(AdminOrdersTemplate, {orders: orders.models, _:_}));
                },
                error: function(items, response, options) {
                    console.log("error!");
                },
          });
        
      },


    });

    return AdminOrdersView;
  });