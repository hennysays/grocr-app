define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'controllers/appController',
  'text!templates/admin/adminHeaderTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, AppController, AdminHeaderTemplate){

    var AdminHeaderView = BaseView.extend({
      name: "AdminHeaderView",
      
      initialize: function() {
      },

      events: {
        "click #ordersTab": "ordersTab",
        "click #analyticsTab": "analyticsTab",
        "click #logout": "logout"
      },
      
      ordersTab: function(event) {
        event.preventDefault();
        this.trigger("orders-event");
      },

      analyticsTab: function(event) {
        event.preventDefault();
        this.trigger("analytics-event");
      },

      logout: function(event) {
          event.preventDefault();
          var that = this;
          AppController.logoutUser(function(){
            that.trigger("logout-event");  
          });
          
          
      },

      render: function(){
        this.$el.html(AdminHeaderTemplate);
      }

    });

  return AdminHeaderView;

});