var _introController;
var _homeController;

var launch = true;
if (!ENV_PRODUCTION) {
	if (Alloy.CFG.run_logic_tests) {
		launch = false;
		Ti.App.addEventListener("logic_tests_complete", function logicTestsComplete() {
			Ti.App.removeEventListener("logic_tests_complete", logicTestsComplete);
			init();
		});
	}
}
if (launch) {
	init();
}


/**
 * Init
 */
function init() {
	
	// App.init();
	
	_introController = Alloy.createController('/intro');
	_introController.window.open();
	
	_homeController = Alloy.createController('/home', {
		loaded_callback: function(){
			_introController.endIntro(displayHome);
	}});
}

/**
 * Display home screen
 */
function displayHome() {
	
	var navWindow = Ti.UI.createNavigationWindow({
		window: _homeController.window
	});
    Alloy.Globals.navigationWindow = navWindow;
    Alloy.Globals.initNavigation();
    Alloy.Globals.navigationWindow.open();
	
	_homeController.animateIn();
	
	_introController.window.close();
	_introController = null;
}
