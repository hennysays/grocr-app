define([
  'jquery',
  'modernizr',
  'retina',
  'underscore',
  'backbone',
  'bootstrap',
  'router'
], function($, Modernizr, Retina, _, Backbone, Bootstrap, Router){
	var initialize = function() {
    this.router = new Router();
	};
  return {
  	initialize:initialize
  };
  
});