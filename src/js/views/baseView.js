define([
  'jquery',
  'backbone',
  ], function($, Backbone) {    
    var BaseView = Backbone.View.extend({

      removeChildViews: function(callback) {
          this.trigger("cleanup-event");
          return callback();
      },

//     Override remove so that we can get rid of children views first (prevent memory leaks)
      remove: function() {
          var that = this;
          this.removeChildViews(function(){
            that.$el.empty();
            that.stopListening(); // for listenTo events
            that.undelegateEvents(); // for Jquery's on events
            console.log(that.name + ' removed');
            return that;
          });
      },

      loadView : function(indx, view) {
        this.subViews[indx]  = this.subViews[indx] && this.subViews[indx].remove();
        this.subViews[indx] = view;
        _.bindAll(this.subViews[indx],'remove');
        this.subViews[indx].listenTo(this,'cleanup-event',this.subViews[indx].remove);
    },

    });
    return BaseView;
  });