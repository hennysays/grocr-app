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
  'views/home/homeHeaderView',
  'views/home/homeMainView',
  'views/home/homeFooterView',
  'text!templates/home/homeTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, HomeHeaderView, HomeMainView, HomeFooterView, HomeTemplate) {    
    var HomeView = BaseView.extend({

      el: $("#page"),
      name: "HomeView",
      
      initialize: function(router) {
          this.router = router;
          this.subViews = new Array(3);
      },

      render: function() {
        this.$el.html(HomeTemplate);

        // Load header and footer views
        this.loadView(0,new HomeHeaderView({el: "#header"}));
        this.loadView(2,new HomeFooterView({el: "#footer"}));
        this.subViews[0].render();
        this.subViews[2].render();

        // _.bindAll(this,'onSignedIn');
        // this.listenTo(this.subViews[0].subViews[0],"signin-event",this.onSignedIn);

        this.showHomeMainView();
        
        smoothScroll.init({
          speed: 600,
          easing: 'easeInOutCubic',
          offset: 80,
        });

        $("body").scrollspy("refresh");
        
        return this;
      },

      showHomeMainView: function() {
          this.loadView(1,new HomeMainView({el: "#body"}));
          this.subViews[1].render();
          _.bindAll(this,'onSignedIn');
          this.listenTo(this.subViews[0].subViews[0],"signin-event",this.onSignedIn);
          this.listenTo(this.subViews[1].subViews[2],"signin-event",this.onSignedIn);
      },
      
      onSignedIn: function() {
          this.router.navigate('search', {trigger: true, replace: true});
      }

    });

    return HomeView;
  });