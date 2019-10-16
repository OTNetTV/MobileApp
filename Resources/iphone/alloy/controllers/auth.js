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
  this.__controllerPath = 'auth';
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
  { navBarHidden: true, orientationModes: [Ti.UI.PORTRAIT], backgroundColor: "#000000", id: "window", title: "Auth" });

  $.__views.window && $.addTopLevelView($.__views.window);
  $.__views.container_logged = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "container_logged" });

  $.__views.window.add($.__views.container_logged);
  $.__views.customer_email = Ti.UI.createLabel(
  { color: "white", id: "customer_email" });

  $.__views.container_logged.add($.__views.customer_email);
  $.__views.btn = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, height: 40, color: "#ffffff", backgroundColor: "#b0332a", title: 'Logout', id: "btn" });

  $.__views.container_logged.add($.__views.btn);
  logout ? $.addListener($.__views.btn, 'click', logout) : __defers['$.__views.btn!click!logout'] = true;$.__views.container_login = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "container_login" });

  $.__views.window.add($.__views.container_login);
  $.__views.login_email = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Email", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "login_email", value: "test@test2.com" });

  $.__views.container_login.add($.__views.login_email);
  $.__views.login_password = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Email", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "login_password" });

  $.__views.container_login.add($.__views.login_password);
  $.__views.btn = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, height: 40, color: "#ffffff", backgroundColor: "#b0332a", title: 'Submit', id: "btn" });

  $.__views.container_login.add($.__views.btn);
  login ? $.addListener($.__views.btn, 'click', login) : __defers['$.__views.btn!click!login'] = true;$.__views.btn_blank = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, height: 40, color: "#ffffff", title: 'Regsiter', id: "btn_blank" });

  $.__views.container_login.add($.__views.btn_blank);
  rbtn ? $.addListener($.__views.btn_blank, 'click', rbtn) : __defers['$.__views.btn_blank!click!rbtn'] = true;$.__views.container_register = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "container_register" });

  $.__views.window.add($.__views.container_register);
  $.__views.register_email = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Email", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "register_email", value: "test@test2.com" });

  $.__views.container_register.add($.__views.register_email);
  $.__views.register_password = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Email", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "register_password" });

  $.__views.container_register.add($.__views.register_password);
  $.__views.register_passconf = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Email", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "register_passconf" });

  $.__views.container_register.add($.__views.register_passconf);
  $.__views.btn = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, height: 40, color: "#ffffff", backgroundColor: "#b0332a", title: 'Submit', id: "btn" });

  $.__views.container_register.add($.__views.btn);
  register ? $.addListener($.__views.btn, 'click', register) : __defers['$.__views.btn!click!register'] = true;$.__views.btn_blank = Ti.UI.createButton(
  { top: 10, left: 10, right: 10, height: 40, color: "#ffffff", title: 'Login', id: "btn_blank" });

  $.__views.container_register.add($.__views.btn_blank);
  lbtn ? $.addListener($.__views.btn_blank, 'click', lbtn) : __defers['$.__views.btn_blank!click!lbtn'] = true;if (true) {
    $.__views.navbar = Alloy.createController('views/navbar', { id: "navbar", __parentSymbol: $.__views.window });
    $.__views.navbar.setParent($.__views.window);
  }
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var api = require('apiService');

  var args = arguments[0] || {};

  $.container_login.hide();
  $.container_register.hide();
  $.container_logged.hide();

  api.getCustomerService({
    endpoint: "/v1/access" },
  function (_response) {

    if (_response.status) {

      $.customer_email.text = _response.data.email;
      $.container_logged.show();

    } else {

      $.container_login.show();

    }

  });

  function rbtn() {

    $.container_login.hide();
    $.container_register.show();
    $.container_logged.hide();

  }

  function lbtn() {

    $.container_login.show();
    $.container_register.hide();
    $.container_logged.hide();

  }

  function logout() {

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
      password: password },
    function (_response) {

      if (_response.status) {

        console.log('_response', _response);

        Ti.App.Properties.setString('token', _response.token);

        api.getCustomerService({
          endpoint: "/v1/access" },
        function (_response) {

          if (_response.status) {

            console.log('_response', _response);

            $.customer_email.text = _response.data.email;
            $.container_login.hide();
            $.container_register.hide();
            $.container_logged.show();

          } else {

            $.container_login.show();
            $.container_register.hide();
            $.container_logged.hide();

          }

        });

      } else {

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
      passconf: passconf },
    function (_response) {

      if (_response.status) {

        console.log('_response', _response);

        Ti.App.Properties.setString('token', _response.token);

        api.getCustomerService({
          endpoint: "/v1/access" },
        function (_response) {

          if (_response.status) {

            console.log('_response', _response);

            $.customer_email.text = _response.data.email;
            $.container_login.hide();
            $.container_register.hide();
            $.container_logged.show();

          } else {

            $.container_login.show();
            $.container_register.hide();
            $.container_logged.hide();

          }

        });

      } else {

        alert(_response.message);

      }

    });

  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views.btn!click!logout'] && $.addListener($.__views.btn, 'click', logout);__defers['$.__views.btn!click!login'] && $.addListener($.__views.btn, 'click', login);__defers['$.__views.btn_blank!click!rbtn'] && $.addListener($.__views.btn_blank, 'click', rbtn);__defers['$.__views.btn!click!register'] && $.addListener($.__views.btn, 'click', register);__defers['$.__views.btn_blank!click!lbtn'] && $.addListener($.__views.btn_blank, 'click', lbtn);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/auth.js.map