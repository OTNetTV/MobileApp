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
  this.__controllerPath = 'views/list_static_cell';
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
  $.__views.cell = Ti.UI.createView(
  { top: 10, left: 10, bottom: 10, width: Alloy.Globals.layout.lists.cell.width, height: Alloy.Globals.layout.lists.cell.height, backgroundColor: "#b0332a", clipMode: true, id: "cell" });

  $.__views.cell && $.addTopLevelView($.__views.cell);
  $.__views.imageview = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, preventDefaultImage: true, touchEnabled: false, id: "imageview" });

  $.__views.cell.add($.__views.imageview);
  $.__views.title_label = Ti.UI.createLabel(
  { left: 4, right: 4, width: Ti.UI.FILL, height: Ti.UI.FILL, font: { fontSize: 48, fontFamily: "FontAwesome" }, textAlign: "center", color: "#ffffff", touchEnabled: false, id: "title_label" });

  $.__views.cell.add($.__views.title_label);
  $.__views.overlay_view = Ti.UI.createView(
  { backgroundColor: "#ffffff", opacity: 0, touchEnabled: false, id: "overlay_view" });

  $.__views.cell.add($.__views.overlay_view);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var animation = require('/animation');

  var args = arguments[0] || {};

  $.animateClick = function (callback) {
    animation.flash($.overlay_view, callback);
  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/views/list_static_cell.js.map