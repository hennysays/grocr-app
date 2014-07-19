define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/home/homeFooterTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, HomeFooterTemplate){

    var HomeFooterView = BaseView.extend({
      name: "HomeFooterView",
      
      initialize: function() {
      },

      render: function(){
        this.$el.html(HomeFooterTemplate);
      }

    });

  return HomeFooterView;

});