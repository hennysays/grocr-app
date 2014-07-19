define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/home/welcomeTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, WelcomeTemplate) {    
    var WelcomeView = BaseView.extend({
      name: "WelcomeView",
    
      initialize: function() {
      },

      render: function() {
        this.$el.html(WelcomeTemplate);
        return this;
      },
    });

    return WelcomeView;
  });