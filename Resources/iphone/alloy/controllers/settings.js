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
  this.__controllerPath = 'settings';
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
  $.__views.settings = Ti.UI.createView(
  { backgroundColor: "#66000000", width: Ti.UI.FILL, height: Ti.UI.FILL, opacity: 0, id: "settings" });

  $.__views.settings && $.addTopLevelView($.__views.settings);
  $.__views.__alloyId3 = Ti.UI.createView(
  { layout: "vertical", width: Alloy.Globals.layout.overlay.width, height: Ti.UI.SIZE, id: "__alloyId3" });

  $.__views.settings.add($.__views.__alloyId3);
  $.__views.__alloyId4 = Ti.UI.createView(
  { height: 100, id: "__alloyId4" });

  $.__views.__alloyId3.add($.__views.__alloyId4);
  $.__views.__alloyId5 = Ti.UI.createLabel(
  { color: "#ffffff", left: 0, text: 'Device motion animation', id: "__alloyId5" });

  $.__views.__alloyId4.add($.__views.__alloyId5);
  $.__views.motion_switch = Ti.UI.createSwitch(
  { right: 0, value: false, id: "motion_switch" });

  $.__views.__alloyId4.add($.__views.motion_switch);
  $.__views.__alloyId6 = Ti.UI.createView(
  { height: 100, id: "__alloyId6" });

  $.__views.__alloyId3.add($.__views.__alloyId6);
  $.__views.__alloyId7 = Ti.UI.createLabel(
  { color: "#ffffff", left: 0, text: 'Parallax animation', id: "__alloyId7" });

  $.__views.__alloyId6.add($.__views.__alloyId7);
  $.__views.list_animation_switch = Ti.UI.createSwitch(
  { right: 0, value: false, id: "list_animation_switch" });

  $.__views.__alloyId6.add($.__views.list_animation_switch);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  /**
   * Movies
   * 
   * @copyright
   * Copyright (c) 2015 by Appcelerator, Inc. All Rights Reserved.
   *
   * @license
   * Licensed under the terms of the Apache Public License
   * Please see the LICENSE included with this distribution for details.
   */

  var args = arguments[0] || {};

  function init() {
    $.motion_switch.value = Ti.App.Properties.getBool(Alloy.Globals.PROPERTY_ENABLE_MOTION_ANIMATION);
    $.list_animation_switch.value = Ti.App.Properties.getBool(Alloy.Globals.PROPERTY_ENABLE_LIST_ANIMATION);
  }
  init();


  ///////////////////////////////////////////////////////////////////////////////
  //
  // event handlers
  //
  ///////////////////////////////////////////////////////////////////////////////

  $.motion_switch.addEventListener('change', function (e) {
    Ti.Analytics.featureEvent('edit:motion.' + e.value);
    Ti.App.Properties.setBool(Alloy.Globals.PROPERTY_ENABLE_MOTION_ANIMATION, e.value);
    Ti.App.fireEvent(Alloy.Globals.EVENT_PROPERTY_ENABLE_MOTION_ANIMATION_DID_CHANGE, { value: e.value });
  });

  $.list_animation_switch.addEventListener('change', function (e) {
    Ti.Analytics.featureEvent('edit:parallax.' + e.value);
    Ti.App.Properties.setBool(Alloy.Globals.PROPERTY_ENABLE_LIST_ANIMATION, e.value);
    Ti.App.fireEvent(Alloy.Globals.EVENT_PROPERTY_ENABLE_LIST_ANIMATION_DID_CHANGE, { value: e.value });
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/settings.js.map