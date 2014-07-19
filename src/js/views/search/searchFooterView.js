define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/search/searchFooterTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, SearchFooterTemplate){

    var SearchFooterView = BaseView.extend({
      name: "SearchFooterView",
      initialize: function() {
      },

      render: function(){
        this.$el.html(SearchFooterTemplate);
      }

    });

  return SearchFooterView;

});