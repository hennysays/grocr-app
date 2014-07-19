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
  'text!templates/privacy/privacyTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, PrivacyTemplate) {    
    var PrivacyView = BaseView.extend({

      el: $("#page"),
      name: "privacyView",
      
      initialize: function() {
      },

      render: function() {
        this.$el.html(PrivacyTemplate);
        smoothScroll.init({
          speed: 600,
          easing: 'easeInOutCubic',
          offset: 80,
        });

        $("body").scrollspy("refresh");
        
        return this;
      },
    });

    return PrivacyView;
  });