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
  this.__controllerPath = 'intro';
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
  $.__views.window = Ti.UI.createWindow(
  { id: "window" });

  $.__views.window && $.addTopLevelView($.__views.window);
  $.__views.clapper_top_container = Ti.UI.createView(
  { top: Alloy.Globals.layout.intro.clapperTopContainerTop, left: Alloy.Globals.layout.intro.clapperTopContainerLeft, height: 62, width: 200, id: "clapper_top_container" });

  $.__views.window.add($.__views.clapper_top_container);
  $.__views.clapper_top = Ti.UI.createImageView(
  { top: 0, left: 100, width: 100, height: 31, id: "clapper_top", image: "/clapper_top.png" });

  $.__views.clapper_top_container.add($.__views.clapper_top);
  $.__views.clapper_bottom = Ti.UI.createImageView(
  { top: Alloy.Globals.layout.intro.clapperBottomTop, left: Alloy.Globals.layout.intro.clapperBottomLeft, width: 100, height: 55, id: "clapper_bottom", image: "/clapper_bottom.png" });

  $.__views.window.add($.__views.clapper_bottom);
  $.__views.activity_indicator = Ti.UI.createActivityIndicator(
  { style: Ti.UI.ActivityIndicatorStyle.BIG, height: Ti.UI.SIZE, width: Ti.UI.SIZE, color: "#ff0000", top: Alloy.Globals.layout.intro.activityViewTop, id: "activity_indicator" });

  $.__views.window.add($.__views.activity_indicator);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var _animateOutOnComplete = false;
  var _animationComplete = false;
  var _callback;

  /**
                                 * Init, called on window open event
                                 */
  function init() {

    $.window.removeEventListener('open', init);

    var animation = Ti.UI.createAnimation({
      transform: Ti.UI.create2DMatrix({ rotate: -10 }),
      curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
      duration: 1000 });

    animation.addEventListener('complete', function (e) {
      var animation = Ti.UI.createAnimation({
        transform: Ti.UI.create2DMatrix({ rotate: 11.3 }),
        duration: 200 });

      animation.addEventListener('complete', function (e) {
        _animationComplete = true;
        if (_animateOutOnComplete) {
          animateOut();
        } else {
          $.activity_indicator.show();
        }
      });
      $.clapper_top_container.animate(animation);
    });
    $.clapper_top_container.animate(animation);

  }

  /**
       * Animate out content and callback
       */
  function animateOut() {
    $.activity_indicator.hide();

    var animation = Ti.UI.createAnimation({
      transform: Ti.UI.create2DMatrix({ scale: 0.7 }),
      opacity: 0,
      duration: 1000 });

    animation.addEventListener('complete', _callback);
    $.window.animate(animation);
  }

  /**
       * End intro once animation has completed
       * @param {Object} callback
       */
  $.endIntro = function (callback) {
    _callback = callback;
    _animateOutOnComplete = true;
    if (_animationComplete) {
      animateOut();
    }
  };


  ///////////////////////////////////////////////////////////////////////////////
  //
  // event handlers
  //
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * window open
   */
  $.window.addEventListener('open', init);

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/intro.js.map