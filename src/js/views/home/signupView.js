define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'models/userModel',
  'text!templates/home/signupTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, UserModel, SignupTemplate){

    var SignupView = BaseView.extend({

      name: "SignupView",
      initialize: function() {
      },

      events: {
        "submit"    : "signup"
      },

      signup: function(event) {
        event.preventDefault();

        var userDetails = {
          email: this.$("#signupEmail").val(),
          password: this.$("#signupPassword").val()
        };
        
        var user = new UserModel();
        user.url = '/signup';        
        var that = this;
        user.save(userDetails, {
          wait:true,
          success:function(model, response) {
            that.trigger("signin-event"); 
          },
          error: function(model, error) {
            that.$("#errormessage").html(error.responseJSON.message);
          }
        });
      },

      render: function(){
        this.$el.html(SignupTemplate);
      }

    });

  return SignupView;

});