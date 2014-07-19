define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'controllers/appController',
  'text!templates/search/searchHeaderTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, AppController, SearchHeaderTemplate){

    var SearchHeaderView = BaseView.extend({
    name: "SearchHeaderView",
      initialize: function() {
      },

      events: {
        "submit"    : "search",
        "click #basketTab": "basketTab",
        "click #searchTab": "searchTab",
        "click #logout": "logout"
      },

      search: function(event) {
        event.preventDefault();
        var query = $("input#search").val();
        this.trigger("query-event",query);
      },

      basketTab: function(event) {
        event.preventDefault();
        this.trigger("basket-event");
      },

      searchTab: function(event) {
        event.preventDefault();
        this.trigger("search-event");
      },

      logout: function(event) {
          event.preventDefault();
          var that = this;
          AppController.logoutUser(function(){
            that.trigger("logout-event");  
          });
          
          
      },

      render: function(){
        this.$el.html(SearchHeaderTemplate);
      }

    });

  return SearchHeaderView;

});