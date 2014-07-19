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
  'views/search/searchHeaderView',
  'views/search/searchResultsView',
  'views/search/basketView',
  'views/search/searchFooterView',
  'text!templates/search/searchTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, SearchHeaderView, SearchResultsView, BasketView, SearchFooterView, SearchTemplate) {    
    var SearchView = BaseView.extend({
      el: $("#page"),
      name: "SearchView",

      initialize: function(router) {
        this.router = router;
        this.subViews = new Array(3);
        // this.render();
      },

      render: function(){
        // this.$el = $("#page");
        this.$el.html(SearchTemplate);
        smoothScroll.init({
          speed: 500,
          easing: 'easeInOutCubic'
        });
        
        $("body").scrollspy("refresh");

        
        this.loadView(0,new SearchHeaderView({el: "#header"}));
        this.loadView(2,new SearchFooterView({el: "#footer"}));
        this.subViews[0].render();
        this.subViews[2].render();


        
        var that = this;
        this.listenTo(this.subViews[0],"query-event",function(query){
            that.router.navigate('search');
            that.getResults(query);
        });

        this.listenTo(this.subViews[0],"basket-event",function(){
            that.router.navigate('basket');
            that.showBasketView();
        });
        this.listenTo(this.subViews[0],"search-event",function(){
            that.router.navigate('search');
            that.showSearchResultsView();
        });

        this.listenTo(this.subViews[0], "logout-event",function(){
            that.router.navigate('',{trigger: true, replace: true});
        });
        this.$("#searchTab").parent().attr("class","active");

        return this;

      },

      getResults: function(query) {
          this.showSearchResultsView();
          this.subViews[1].getResults(query);
      },
      
      showSearchResultsView: function() {
          this.loadView(1,new SearchResultsView({el: "#searchresults"}));
          this.subViews[1].render();
          this.$("#searchTab").parent().addClass("active");
          this.$("#basketTab").parent().removeClass('active');
      },

      showBasketView: function() {
          this.loadView(1,new BasketView({el: "#searchresults"}));
          this.subViews[1].render();
          this.$("#basketTab").parent().addClass("active");
          this.$("#searchTab").parent().removeClass("active");
      },


    });

    return SearchView;
  });