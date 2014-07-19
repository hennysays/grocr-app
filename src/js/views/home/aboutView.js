define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/home/aboutTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, AboutTemplate) {    
    var AboutView = BaseView.extend({
      name: "AboutView",
    
      initialize: function() {
      },

      render: function() {
        this.$el.html(AboutTemplate);
        return this;
      },
    });

    return AboutView;
  });