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
  this.__controllerPath = 'views/list_cell';
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
  { top: 10, left: 10, width: Alloy.Globals.layout.lists.cell.width, height: Alloy.Globals.layout.lists.cell.height, backgroundColor: "#333333", clipMode: true, id: "cell" });

  $.__views.cell && $.addTopLevelView($.__views.cell);
  $.__views.image = Ti.UI.createView(
  { top: Alloy.Globals.layout.lists.cell.imageTop, left: Alloy.Globals.layout.lists.cell.imageLeft, width: Alloy.Globals.layout.lists.cell.imageWidth, height: Alloy.Globals.layout.lists.cell.imageHeight, touchEnabled: false, id: "image" });

  $.__views.cell.add($.__views.image);
  $.__views.imageview = Ti.UI.createImageView(
  { width: Alloy.Globals.layout.lists.cell.imageWidth, height: Alloy.Globals.layout.lists.cell.imageHeight, preventDefaultImage: true, touchEnabled: false, zIndex: 0, id: "imageview" });

  $.__views.image.add($.__views.imageview);
  $.__views.imageview1 = Ti.UI.createImageView(
  { width: Alloy.Globals.layout.lists.cell.imageWidth, height: Alloy.Globals.layout.lists.cell.imageHeight, preventDefaultImage: true, touchEnabled: false, zIndex: 1, opacity: 0, id: "imageview1" });

  $.__views.image.add($.__views.imageview1);
  $.__views.__alloyId8 = Ti.UI.createView(
  { top: 0, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundGradient: { type: "linear", startPoint: { x: "0%", y: "0%" }, endPoint: { x: "0%", y: "100%" }, colors: [{ color: "#33000000", offset: 0 }, { color: "#aa000000", offset: 1 }] }, touchEnabled: false, id: "__alloyId8" });

  $.__views.cell.add($.__views.__alloyId8);
  $.__views.title_label = Ti.UI.createLabel(
  { left: 4, right: 4, width: Ti.UI.FILL, height: Ti.UI.FILL, font: { fontSize: 22, fontFamily: "HelveticaNeue-Bold" }, textAlign: "center", color: "#ffffff", touchEnabled: false, id: "title_label" });

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
  var alloyAnimation = require('alloy/animation'),
  animation = require('/animation');

  var _images = [];
  var _currentImageIndex = 0;
  var _currentImageView = 'imageview';
  var _animationInterval;

  $.populateImages = function (images) {
    _images = images;
    $.imageview.image = _images[0];
    Ti.API.debug('Images: ' + images);
  };

  $.animateImages = function () {

    var nextImageIndex = _currentImageIndex >= _images.length - 1 ? 0 : _currentImageIndex + 1;
    var nextImageView = _currentImageView == 'imageview' ? 'imageview1' : 'imageview';

    $[_currentImageView].zIndex = 0;
    $[nextImageView].opacity = 0;
    $[nextImageView].zIndex = 1;
    $[nextImageView].image = _images[nextImageIndex];

    if (true) {
      $[nextImageView].animate({
        opacity: 1,
        duration: 1000 });

    }
    if (false) {
      $[nextImageView].animate({
        opacity: 1,
        duration: 1000 });

    }

    _currentImageIndex = nextImageIndex;
    _currentImageView = nextImageView;
  };

  $.animateClick = function (callback) {
    animation.flash($.overlay_view, callback);
  };

  if (false) {
    $.imageview.addEventListener('load', function (e) {
      $.imageview.animate({
        opacity: 1,
        duration: 1000 });

    });

    $.imageview1.addEventListener('load', function (e) {
      $.imageview1.animate({
        opacity: 1,
        duration: 1000 });

    });
  }

  $.title_label.addEventListener('postlayout', function (e) {
    if ($.title_label.text.indexOf(' ') == -1) {
      if (true) {
        $.title_label.minimumFontSize = $.title_label.font.size;
      } else if (false) {
        $.title_label.wordWrap = false;
      }
    }
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
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/views/list_cell.js.map