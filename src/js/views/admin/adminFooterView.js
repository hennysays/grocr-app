define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'text!templates/admin/adminFooterTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, AdminFooterTemplate){

    var AdminFooterView = BaseView.extend({
      name: "AdminFooterView",
      initialize: function() {
      },

      render: function(){
        this.$el.html(AdminFooterTemplate);
      }

    });

  return AdminFooterView;

});