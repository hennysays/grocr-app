define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/home/contactTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, ContactTemplate) {    
    var ContactView = BaseView.extend({
      name: "ContactView",
    
      initialize: function() {
      },

      render: function() {
        this.$el.html(ContactTemplate);
        return this;
      },
    });

    return ContactView;
  });