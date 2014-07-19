define(['facebook'], function(){
	FB.init({
		appId      	: '1393608100901845',
		status		: true,
		xfbml       : true
	});
	FB.Event.subscribe('auth.authResponseChange',function(response) {
		if(response.status === 'connected') {
			testAPI();
		}
		else {
			FB.login();
		}
	});

	function testAPI() {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});
	}
});