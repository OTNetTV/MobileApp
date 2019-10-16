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
  this.__controllerPath = 'views/navbar';
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
  $.__views.container = Ti.UI.createView(
  { top: 0, left: 0, width: Ti.UI.FILL, height: 64, id: "container", zIndex: 400 });

  $.__views.container && $.addTopLevelView($.__views.container);
  $.__views.background_view = Ti.UI.createView(
  { top: 0, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundGradient: { type: "linear", startPoint: { x: "0%", y: "0%" }, endPoint: { x: "0%", y: "100%" }, colors: [{ color: "#99000000", offset: 0 }, { color: "#33000000", offset: 0.5 }, { color: "#00000000", offset: 1 }] }, id: "background_view" });

  $.__views.container.add($.__views.background_view);
  $.__views.content = Ti.UI.createView(
  { id: "content" });

  $.__views.container.add($.__views.content);
  if (true) {
    $.__views.back_button = Ti.UI.createButton(
    { top: 20, left: 10, width: 100, height: 44, font: { fontSize: 14, fontWeight: "bold" }, backgroundColor: "transparent", color: "#ffffff", image: "/back_button.png", tintColor: "#ffffff", id: "back_button" });

    $.__views.content.add($.__views.back_button);
  }
  $.__views.title_label = Ti.UI.createLabel(
  { top: 20, height: 44, font: { fontSize: 18, fontFamily: "HelveticaNeue-Bold" }, viewShadowRadius: 5, color: "#ffffff", width: Ti.UI.SIZE, id: "title_label" });

  $.__views.content.add($.__views.title_label);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file

  if (true) {
    $.back_button.addEventListener('click', function (e) {
      Alloy.Globals.Navigator.pop();
    });
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
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/views/navbar.js.map