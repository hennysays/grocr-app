define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/home/itemsPreviewTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, ItemsPreviewTemplate) {    
    var ItemsPreviewView = BaseView.extend({
      name: "ItemsPreviewView",
    
      initialize: function() {
      },

      render: function() {
        this.$el.html(ItemsPreviewTemplate);
        return this;
      },
    });

    return ItemsPreviewView;
  });