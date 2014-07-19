define([
  'jquery',
  'underscore',
  'backbone',
  ], function($, _, Backbone) {    
    var UserModel = Backbone.Model.extend({
        idAttribute: "_id",
        urlRoot: "/users",
        // defaults: {
        //     email: '',
        //     password: '',
        // }
    });
    return UserModel;
});