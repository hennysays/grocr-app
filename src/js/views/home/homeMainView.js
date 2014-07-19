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
  'views/home/welcomeView',
  'views/home/itemsPreviewView',
  'views/home/signupView',
  'views/home/aboutView',
  'views/home/contactView',

  'collections/groceryItemsCollection',
  'text!templates/home/homeMainTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, WelcomeView, ItemsPreviewView, SignupView, AboutView, ContactView, GroceryItemsCollection, HomeMainTemplate) {    
    var HomeMainView = BaseView.extend({
      name: "HomeMainView",
      
      initialize: function() {
        this.itemsCollection = new GroceryItemsCollection();
      },

      render: function() {
        this.$el.html(_.template(HomeMainTemplate));
        this.subViews = new Array(5);
        this.loadView(0, new WelcomeView({el: "#welcome"}));
        this.subViews[0].render();
        this.loadView(1, new ItemsPreviewView({el: "#itemspreview"}));
        this.subViews[1].render();
        this.loadView(2, new SignupView({el: "#signup"}));
        this.subViews[2].render();
        this.loadView(3, new AboutView({el: "#about"}));
        this.subViews[3].render();
        this.loadView(4, new ContactView({el: "#contact"}));
        this.subViews[4].render();



        // this.getResults("");

        
        // var that = this;
        // _.each(this.subViews,function(subview){
        //   _.bindAll(subview,'remove');
        //   subview.listenTo(that,'cleanup-event',subview.remove);
        //   subview.render();
        // });

      },

      getResults: function(query) {
          
          that = this;
          this.itemsCollection.fetch({
                success: function(items) {
                  that.$el.html(_.template(HomeMainTemplate, {items: items.models, _:_}));
                  this.loadView(0, new SignupView({el: "#signup"}));
                  this.subViews[0].render();
                },
                error: function(items, response, options) {
                    console.log("error!");
                },
                data: { query: query }
          });
      },

      
    });

    return HomeMainView;
  });