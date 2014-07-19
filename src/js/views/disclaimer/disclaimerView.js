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
  'text!templates/disclaimer/disclaimerTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, DisclaimerTemplate) {    
    var DisclaimerView = BaseView.extend({

      el: $("#page"),
      name: "DisclaimerView",
      
      initialize: function() {
      },

      render: function() {
        this.$el.html(DisclaimerTemplate);
        smoothScroll.init({
          speed: 600,
          easing: 'easeInOutCubic',
          offset: 80,
        });

        $("body").scrollspy("refresh");
        
        return this;
      },
    });

    return DisclaimerView;
  });