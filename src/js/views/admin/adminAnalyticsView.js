define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'collections/usersCollection',
  'text!templates/admin/adminAnalyticsTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, UsersCollection, AdminAnalyticsTemplate) {    
    var AdminAnalyticsView = BaseView.extend({
      name: "AdminAnalyticsView",
      events: {
          
      },

      initialize: function() {
        this.usersCollection = new UsersCollection();
      },

      render: function(){
          that = this;
          this.usersCollection.fetch({
                success: function(users) {

                  that.$el.html(_.template(AdminAnalyticsTemplate,{users: users.models, _:_}));
                },
                error: function(items, response, options) {
                    console.log("error!");
                },
          });
        
      },


    });

    return AdminAnalyticsView;
  });