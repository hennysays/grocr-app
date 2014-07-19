require.config({
	paths: {
		jquery: 	'lib/jquery',
		modernizr:  'lib/modernizr.custom',
		retina: 	'lib/retina', 
	smoothscroll: 	'lib/smooth-scroll',
	jquery_func: 	'lib/jquery-func',
		underscore: 'lib/underscore',
		backbone: 	'lib/backbone',
		bootstrap: 	'lib/bootstrap',
		text: 		'lib/text',
		facebook: 	'//connect.facebook.net/en_US/all',
		templates:   '../templates'
	},
	shim: {
		'backbone': ['jquery','underscore'],
		'bootstrap': ['jquery'],
		'jquery_easing': ['jquery'],
		'jquery_func': ['jquery','bootstrap'],
		'facebook': {
			exports: 'FB'
		}
	}
});

require(['app'], function(App) {
	App.initialize();
});