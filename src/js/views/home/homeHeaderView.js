define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'views/home/signinView',
  'text!templates/home/homeHeaderTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, SigninView, HomeHeaderTemplate) {    
    var HomeHeaderView = BaseView.extend({
      name: "HomeHeaderView",
      
      events: {
          "click .navbar-collapse" : "minimizeNavbar"
      },

      initialize: function() {
      },

      render: function() {
        this.$el.html(HomeHeaderTemplate);
        this.subViews = new Array(1);
        this.loadView(0, new SigninView({el: "#signin"}));
        this.subViews[0].render();
        return this;
      },
      
      minimizeNavbar: function() {
          this.$(".navbar-toggle").click();
      }

    });

    return HomeHeaderView;
  });