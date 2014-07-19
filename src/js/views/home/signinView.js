define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'models/userModel',
  'text!templates/home/signinTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, UserModel, SigninTemplate){

    var SigninView = BaseView.extend({
      events: {
        "submit"    : "signin",
        "click #signup-btn": "signup"
      },
      name: "SigninView",
      initialize: function (){
      },

      signup: function(event) {
          this.$el.modal('hide');
      },

      signin: function(event) {
        event.preventDefault();

        var userDetails = {
          email: this.$("#signinEmail").val(),
          password: this.$("#signinPassword").val()
        };
        
        var user = new UserModel();
        user.url = '/signin';
        var that = this;
        user.save(userDetails, {
          wait:true,
          success: function(model, response) {
            that.$el.on('hidden.bs.modal', function () {
                that.trigger("signin-event"); 
            });
            that.$el.modal('hide');
            
          },
          error: function(model, error) {
            alert("Incorrect username/password. Please try again.");
            // that.$("#errormessage").html(error.responseJSON.message);
          }
        });
      },

      render: function(){
          this.$el.html(SigninTemplate);
        }

      });
    return SigninView;
  });