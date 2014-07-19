define([
  'jquery',
  'modernizr',
  'retina',
  'smoothscroll',
  'underscore',
  'backbone',
  'bootstrap',
  'views/baseView',
  'collections/groceryItemsCollection',
  'collections/groceryBasketItemsCollection',
  'text!templates/search/searchResultsTemplate.html',
  'text!templates/search/searchResultsInitTemplate.html',
  ], function($, Modernizr, Retina, Smoothscroll, _, Backbone, Bootstrap, BaseView, GroceryItemsCollection, GroceryBasketItemsCollection, SearchResultsTemplate, SearchResultsInitTemplate) {    
    var SearchResultsView = BaseView.extend({
      name: "SearchResultsView",
      events: {
          "click button.addToBasket":"addToBasket",
      },

      initialize: function() {
        this.itemsCollection = new GroceryItemsCollection();
        this.basketItemsCollection = new GroceryBasketItemsCollection();

        this.basketItemsCollection.fetch({
            success: function(items) {
              console.log("successfully fetched basket");
            },
            error: function() {
                console.log("error on fetching basket!");
            },
        });
      },

      render: function(){
        this.getResults("");
        // this.$el.html(_.template(SearchResultsInitTemplate));
      },

      disableAddToBasketButtons: function() {
          return this.basketItemsCollection.pluck("_id");
      },

      getResults: function(query) {
          
          that = this;
          this.itemsCollection.fetch({
                success: function(items) {
                  var ids = that.disableAddToBasketButtons();
                  that.$el.html(_.template(SearchResultsTemplate, {ids: ids, items: items.models, _:_}));
                },
                error: function(items, response, options) {
                    console.log("error!");
                },
                data: { query: query }
          });
      },

      addToBasket: function(e) {
          this.$(e.currentTarget).prop("disabled",true);
          var itemId = this.$(e.currentTarget).data("id");
          var item = this.itemsCollection.models[itemId];
          item.set({quantity: 1, orderReady:false});
          this.basketItemsCollection.create({item:item},{wait:true, 
            success: function(){
                // console.log("item added to basket");
            },
            error: function(){
              alert("Failed to add item to basket.");
            },
          });
      }

    });

    return SearchResultsView;
  });