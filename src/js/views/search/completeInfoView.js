define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'models/userModel',
  'text!templates/search/completeInfoTemplate.html'
  ], function($, _, Backbone, Bootstrap, BaseView, UserModel, CompleteInfoTemplate){

    var CompleteInfoView = BaseView.extend({
      
      events: {
        "submit"    : "order",
      },
      // events: {
      //   "submit"    : "signin",
      //   "click #signup-btn": "signup"
      // },
      name: "CompleteInfoView",

      initialize: function (){
      },

      order: function(event){
        event.preventDefault();
        var userDetails = {
            userInfo: {
                street: this.$("#completeInfoStreet").val(),
                city: this.$("#completeInfoCity").val(),
                province: this.$("#completeInfoProvince").val(),
                country: this.$("#completeInfoCountry").val(),
                postalCode: this.$("#completeInfoPostalCode").val(),
                phoneNumber: this.$("#completeInfoPhoneNumber").val()
            }
        };
        var user = new UserModel();
        var that = this;
        console.log(userDetails);

        user.save(userDetails, {
            wait: true,
            success: function(model, response) {
                that.$el.on('hidden.bs.modal', function () {
                  that.trigger("user-update-event");
                });
                that.$el.modal('hide');
            },

            error: function(model, error) {
                alert("error!");
            }
        });
      },
           

      //   user.save(userDetails, {
      //     wait:true,
      //     success: function(model, response) {
      //       that.$el.on('hidden.bs.modal', function () {
      //           that.trigger("signin-event"); 
      //       });
      //       that.$el.modal('hide');
            
      //     },
      //     error: function(model, error) {
      //       alert("Incorrect username/password. Please try again.");
      //       // that.$("#errormessage").html(error.responseJSON.message);
      //     }
      //   });
      // },

      show: function() {
        this.$el.modal('show');
      },

      render: function(){
          this.$el.html(CompleteInfoTemplate);
        }

      });
    return CompleteInfoView;
  });