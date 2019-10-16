var api = require('apiService');

var args = arguments[0] || {};

$.container_login.hide();
$.container_register.hide();
$.container_logged.hide();

api.getCustomerService({
	endpoint: "/v1/access"
}, function(_response) {

	if (_response.status) {
		
		$.customer_email.text = _response.data.email;
		$.container_logged.show();

	}else{

		$.container_login.show();
		
	}

});

function rbtn(){

	$.container_login.hide();
	$.container_register.show();
	$.container_logged.hide();

}

function lbtn(){

	$.container_login.show();
	$.container_register.hide();
	$.container_logged.hide();

}

function logout(){

	Ti.App.Properties.setString('token', '');

	$.container_login.show();
	$.container_register.hide();
	$.container_logged.hide();


}

function login(e) {

	var email = $.login_email.value;
	var password = '6q4vfVSPLt$dA7Sg'; //.login_password.value;

	api.postService({
		endpoint: "/v1/customers/login",
		email: email,
		password: password
	}, function(_response) {

		if (_response.status) {
			
			console.log('_response', _response);

			Ti.App.Properties.setString('token', _response.token);

			api.getCustomerService({
				endpoint: "/v1/access"
			}, function(_response) {

				if (_response.status) {
					
					console.log('_response', _response);

					$.customer_email.text = _response.data.email;
					$.container_login.hide();
					$.container_register.hide();
					$.container_logged.show();

				}else{

					$.container_login.show();
					$.container_register.hide();
					$.container_logged.hide();
					
				}

			});

		}else{

			alert(_response.message);
			
		}

	});

}

function register(e) {

	var email = $.register_email.value;
	var password = '6q4vfVSPLt$dA7Sg'; //.register_password.value;
	var passconf = '6q4vfVSPLt$dA7Sg'; //.register_passconf.value;

	api.postService({
		endpoint: "/v1/customers/register",
		email: email,
		password: password,
		passconf: passconf
	}, function(_response) {

		if (_response.status) {
			
			console.log('_response', _response);

			Ti.App.Properties.setString('token', _response.token);

			api.getCustomerService({
				endpoint: "/v1/access"
			}, function(_response) {

				if (_response.status) {
					
					console.log('_response', _response);

					$.customer_email.text = _response.data.email;
					$.container_login.hide();
					$.container_register.hide();
					$.container_logged.show();

				}else{

					$.container_login.show();
					$.container_register.hide();
					$.container_logged.hide();
					
				}

			});

		}else{

			alert(_response.message);
			
		}

	});

}