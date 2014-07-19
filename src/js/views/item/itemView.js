define([
  'jquery',
  'modernizr',
  'retina',
  // 'jquery_easing',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/item/itemTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, ItemTemplate) {    
    var ItemView = BaseView.extend({
        
      initialize: function(){
        this.render();
      },

      render: function() {
        that.$el.html(_.template(ItemTemplate, {item: itemModel, _:_}));
      }

    });

    return ItemView;
  });