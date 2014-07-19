define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'collections/groceryBasketItemsCollection',
  'models/userModel',
  'models/orderModel',
  'views/baseView',
  'views/search/completeInfoView',
  'text!templates/search/basketTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, GroceryBasketItemsCollection, UserModel, OrderModel, BaseView, CompleteInfoView, BasketTemplate) {    
    var BasketView = BaseView.extend({
      name: "basketView",
      events: {
        "change input.quantity-item":"changeQuantity",
        "click #order": "order",
        "click .remove-item": "removeItem"
      },

      initialize: function() {
        this.subViews = new Array(1);
        this.basketItemsCollection = new GroceryBasketItemsCollection();
        _.bindAll(this,'render'); 
        this.listenTo(this.basketItemsCollection,'destroy',this.render);
        this.listenTo(this.basketItemsCollection,'change',this.render);
        this.listenTo(this.basketItemsCollection,'reset',this.render);
      },

      render: function(){
          that = this;
          this.basketItemsCollection.fetch({
                success: function(items) {
                  that.$el.html(_.template(BasketTemplate, {items: items.models, _:_}));
                },
                error: function(items, response, options) {
                    console.log("error!");
                },
          });
      },

      changeQuantity: function(e) {
        var basketItemId = this.$(e.currentTarget).data("id");
        var quantity = this.$(e.currentTarget).val();
        quantity = parseInt(quantity);
        if(isNaN(quantity) || quantity<1) {
            this.$(e.currentTarget).val(this.basketItemsCollection.models[basketItemId].get("quantity"));
        }
        else{
            var that =this;
            basketItem = this.basketItemsCollection.models[basketItemId];
            basketItem.save({quantity:quantity} ,{
                wait:true,
                success: function(model,response) {
                  that.basketItemsCollection.set(model,{remove:false});
                  // for(i=0;i<that.basketItemsCollection.length;i++) {
                  //     console.log(that.basketItemsCollection.models[i].toJSON());
                  // }
                  // alert("success"); // NOT WORKING???!!!!                  
                },
                error: function(model,response) {
                  alert("Failed to delete from basket!");
                  that.$(e.currentTarget).val(model.get("quantity"));
                },
            });
        }
      },

      removeItem: function(e) {
        var basketItemId = this.$(e.currentTarget).data("id");
        var basketItem = this.basketItemsCollection.models[basketItemId];
        var that = this;
        basketItem.destroy({
          wait:true,
          success: function() {
              // alert("success"); // NOT WORKING???!!!!
            
          },
          error: function(model,response) {
              alert("Failed to delete from basket!");
          },
        });
      },

      order: function() {
        if(this.basketItemsCollection.length===0) {
          alert("No items in your basket!!");  
        }
        else {
            this.userModel = new UserModel();
            this.userModel.urlRoot = "/getUserInfo";
            that = this;
            this.userModel.fetch({
                  success: function(user) {
                    if(user.get("userInfo")==null) {
                        that.loadView(0, new CompleteInfoView({el: "#completeinfo"}));
                        that.subViews[0].render();
                        that.subViews[0].show();
                        that.listenTo(that.subViews[0],"user-update-event",function(){
                            that.sendOrder();
                        });


                    }
                    else {
                        that.sendOrder();
                    }
                    
                  },
                  error: function(user, response, options) {
                      alert("ERROR");
                      console.log("error!");
                  },
            });
        }
    },

    sendOrder: function() {
        var memo = this.$("textarea#memo").val();
        var orderModel = new OrderModel();
        orderModel.set({basket: that.basketItemsCollection.toJSON(), memo: memo});
        // var that = this;
        orderModel.save(null,{
          wait:true,
          success: function(model,response) {
              alert("Order request sent! Please wait for us to contact you for confirmation!");
              that.basketItemsCollection.reset();
              
          },
          error: function(model,response) {
            alert("FAILURE");
          }
        });
    }
  });

    return BasketView;
  });