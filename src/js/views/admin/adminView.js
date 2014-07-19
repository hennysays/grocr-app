define([
  'jquery',
  'modernizr',
  'retina',
  // 'jquery_easing',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'models/userModel',
  'views/baseView',
  'views/admin/adminHeaderView',
  'views/admin/adminOrdersView',
  'views/admin/adminAnalyticsView',
  'views/admin/adminFooterView',
  'text!templates/admin/adminSignedOutTemplate.html',
  'text!templates/admin/adminSignedInTemplate.html',
  'controllers/appController',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, UserModel, BaseView, AdminHeaderView, AdminOrdersView, AdminAnalyticsView, AdminFooterView, AdminSignedOutTemplate, AdminSignedInTemplate, AppController) {    
    var AdminView = BaseView.extend({
      el: $("#page"),
      name: "AdminView",

      events: {
        "submit"    : "signin",
      },

      initialize: function(router) {
          this.router = router;
          this.subViews = new Array(3);
      },

      render: function(isAdmin) {
          if(!isAdmin) {
              this.$el.html(AdminSignedOutTemplate);
          }
          else {
              this.$el.html(AdminSignedInTemplate);
              this.loadView(0,new AdminHeaderView({el: "#header"}));
              this.loadView(2,new AdminFooterView({el: "#footer"}));
              _.bindAll(this.subViews[0],'remove');
              _.bindAll(this.subViews[2],'remove');
              this.subViews[0].listenTo(this,'cleanup-event',this.subViews[0].remove);
              this.subViews[2].listenTo(this,'cleanup-event',this.subViews[2].remove);
              this.subViews[0].render();
              this.subViews[2].render();

              var that = this;
              this.listenTo(this.subViews[0],"orders-event",function(){
                that.router.navigate('admin');
                that.showOrdersView();
              });

              this.listenTo(this.subViews[0],"analytics-event",function(){
                that.router.navigate('admin/analytics');
                that.showAnalyticsView();
              });

              this.listenTo(this.subViews[0], "logout-event",function(){
                  that.router.navigate('admin',{replace: true});
                  that.render();
              });
          }
          return this;

          
      },
      
      showOrdersView: function() {
        this.loadView(1,new AdminOrdersView({el: "#adminbody"}));
        _.bindAll(this.subViews[1],'remove'); 
        this.subViews[1].listenTo(this,'cleanup-event',this.subViews[1].remove);
        this.subViews[1].render();
        this.$("#ordersTab").parent().addClass("active");
        this.$("#analyticsTab").parent().removeClass('active');
      },

      showAnalyticsView: function() {
        this.loadView(1,new AdminAnalyticsView({el: "#adminbody"}));
        _.bindAll(this.subViews[1],'remove');
        this.subViews[1].listenTo(this,'cleanup-event',this.subViews[1].remove);
        this.subViews[1].render();
        this.$("#analyticsTab").parent().addClass("active");
        this.$("#ordersTab").parent().removeClass("active");

      },

      signin: function(event) {
        event.preventDefault();
        var userDetails = {
          email: this.$("#adminEmail").val(),
          password: this.$("#adminPassword").val()
        };
        var user = new UserModel();
        user.url = '/signin';
        var that = this;
        user.save(userDetails, {
          wait:true,
          success: function(model, response) {

              AppController.checkAdminUser(function(isAdmin){
                  if(!isAdmin) {
                      alert("You are not an admin");
                      that.router.navigate('search',{trigger:true, replace: true});
                  }
                  else {
                      that.render(isAdmin).showOrdersView();
                  }
              });
            
          },
          error: function(model, error) {
            alert("Incorrect username/password. Please try again.");
          }
        });
      },



      
    });

    return AdminView;
  });