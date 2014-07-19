define([
  'jquery',
  'modernizr',
  'retina',
  'underscore',
  'backbone',
  'bootstrap',
  'views/admin/adminView',
  'views/home/homeView',
  'views/search/searchView',
  'views/disclaimer/disclaimerView',
  'views/privacy/privacyView',
  'controllers/appController'
], function($, Modernizr, Retina, _, Backbone, Bootstrap, AdminView, HomeView, SearchView, DisclaimerView, PrivacyView, AppController) {
  	var AppRouter = Backbone.Router.extend({
		routes: {
			'':'showHome',
			'search':'showSearch',
			'basket':'showBasket',
			'admin':'showAdmin',
			'admin/analytics':'showAnalytics',
			'disclaimer':'showDisclaimer',
			'privacy':'showPrivacy',
			// '*actions':'defaultAction'
		},

		initialize: function() {
			Backbone.history.start();
		},

		showHome: function() {
			var that = this;
	      	AppController.checkUser(function(isLoggedIn){
			    if(!isLoggedIn) {
					that.loadView(new HomeView(that));
					that.view.render();
			    }
			    else {
			    	that.navigate('search', {trigger: true});
			    }
			});
		},

		showDisclaimer: function() {
			this.loadView(new DisclaimerView());
			this.view.render();
		},

		showPrivacy: function() {
			this.loadView(new PrivacyView());
			this.view.render();
		},
		showSearch: function() {
			var that = this;
			AppController.checkUser(function(isLoggedIn){
				if(!isLoggedIn) {
					that.navigate('', {trigger: true, replace: true});
				}
				else {
					that.loadView(new SearchView(that));
					that.view.render().showSearchResultsView();
				}
			});
		},

		showBasket: function() {
			var that = this;
			AppController.checkUser(function(isLoggedIn){
				if(!isLoggedIn) {
					that.navigate('', {trigger: true, replace: true});
				}
				else {
					that.loadView(new SearchView(that));
					that.view.render().showBasketView();
				}
			});
		},

		showAdmin: function() {
			var that = this;
			AppController.checkUser(function(isLoggedIn){
				if(!isLoggedIn){
					that.loadView(new AdminView(that));
					that.view.render(false);
				}
				else {
					AppController.checkAdminUser(function(isAdmin){
						if(!isAdmin) {
							that.navigate('', {trigger: true, replace: true});
						}
						else {
							that.loadView(new AdminView(that));
							that.view.render(isAdmin).showOrdersView();

						}
					});
				}
			});
		},
		showAnalytics: function() {
			var that = this;
			AppController.checkUser(function(isLoggedIn){
				if(!isLoggedIn){
					that.navigate('admin', {trigger: true, replace: true});
				}
				else {
					AppController.checkAdminUser(function(isAdmin){
						if(!isAdmin) {
							that.navigate('', {trigger: true, replace: true});
						}
						else {
							that.loadView(new AdminView(that));
							that.view.render(isAdmin).showAnalyticsView();
						}
					});
				}
			});
		},

		defaultAction: function() {
			this.navigate('',{trigger: true, replace: true});
		},
		
		loadView : function(view) {
			this.view  = this.view && this.view.remove();
			this.view = view;
		},

		onSignedIn: function() {
    		this.navigate('search', {trigger: true, replace: true});
    	}

	});
		
	return AppRouter;
});