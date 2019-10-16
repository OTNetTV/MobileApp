var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'index';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var _introController;
  var _homeController;

  var launch = true;
  if (!false) {
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
      loaded_callback: function () {
        _introController.endIntro(displayHome);
      } });
  }

  /**
       * Display home screen
       */
  function displayHome() {

    var navWindow = Ti.UI.createNavigationWindow({
      window: _homeController.window });

    Alloy.Globals.navigationWindow = navWindow;
    Alloy.Globals.initNavigation();
    Alloy.Globals.navigationWindow.open();

    _homeController.animateIn();

    _introController.window.close();
    _introController = null;
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/index.js.map