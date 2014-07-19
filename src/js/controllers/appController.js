define([
  'jquery',
  'underscore',
  ], function($, _) {    
  var appController = {
      checkUser: function(callback) {
          $.ajax("api/auth/isloggedin", {
            
              type: "GET",
              dataType: "json",
              success: function(response) {
                  if(response.success) {
                    return callback(true);
                  }
                  else {
                    return callback(false);
                  }
              },
              error: function() {    
                  return callback(false);
              }
          });
      },

      checkAdminUser: function(callback) {
          $.ajax("api/auth/isAdmin", {
            
              type: "GET",
              dataType: "json",
              success: function() {
                  return callback(true);
              },
              error: function() {    
                  return callback(false);
              }
          });
      },

      logoutUser: function(callback) {
        $.ajax("api/auth/logout", {

            type: "GET",
            dataType: "json"
        }).always(callback);
      }
  };
  return appController;
});