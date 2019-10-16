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
  this.__controllerPath = 'home';
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
  { backgroundColor: "black", extendEdges: Titanium.UI.EXTEND_EDGE_TOP, navBarHidden: true, orientationModes: [Ti.UI.PORTRAIT], id: "window", title: "Movies" });

  $.__views.window && $.addTopLevelView($.__views.window);
  $.__views.container = Ti.UI.createView(
  { top: -70, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "container" });

  $.__views.window.add($.__views.container);
  $.__views.search_textfield = Ti.UI.createTextField(
  { top: 30, left: 10, right: 10, height: 40, padding: { right: 10, left: 40 }, color: "#ffffff", autocapitalization: true, autocorrect: false, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, enableReturnKey: true, hintText: "Search", borderColor: "#b0332a", borderWidth: 1, backgroundColor: "#260205", keyboardAppearance: Ti.UI.KEYBOARD_APPEARANCE_DARK, clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS, id: "search_textfield" });

  $.__views.container.add($.__views.search_textfield);
  $.__views.search_icon = Ti.UI.createImageView(
  { top: 40, left: 20, width: 20, height: 20, image: "/search_icon.png", id: "search_icon" });

  $.__views.container.add($.__views.search_icon);
  $.__views.lists_container = Ti.UI.createScrollView(
  { top: 70, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, contentWidth: "auto", contentHeight: "auto", scrollType: "vertical", opacity: 0, id: "lists_container", zIndex: 100 });

  $.__views.container.add($.__views.lists_container);
  $.__views.searchCell = Alloy.createController('views/list_static_cell', { id: "searchCell", __parentSymbol: $.__views.lists_container });
  $.__views.searchCell.setParent($.__views.lists_container);
  $.__views.authCell = Alloy.createController('views/list_static_cell', { id: "authCell", __parentSymbol: $.__views.lists_container });
  $.__views.authCell.setParent($.__views.lists_container);
  if (true) {
    $.__views.settingsCell = Alloy.createController('views/list_static_cell', { id: "settingsCell", __parentSymbol: $.__views.lists_container });
    $.__views.settingsCell.setParent($.__views.lists_container);
  }
  $.__views.search_overlay = Ti.UI.createView(
  { top: 70, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundColor: "#99000000", id: "search_overlay", zIndex: 0 });

  $.__views.container.add($.__views.search_overlay);
  $.__views.activity_indicator = Ti.UI.createActivityIndicator(
  { style: Ti.UI.ActivityIndicatorStyle.BIG, height: Ti.UI.SIZE, width: Ti.UI.SIZE, color: "#ff0000", id: "activity_indicator" });

  $.__views.container.add($.__views.activity_indicator);
  if (true) {
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
  var Data = require("/data");

  if (true) {
    var CoreMotion = require("ti.coremotion");
    var DeviceMotion = CoreMotion.createDeviceMotion();
  }

  var args = arguments[0] || {};
  var loaded_callback = args.loaded_callback;

  var lists = [];
  var genres = [];
  var cells = [];
  var image_animation_interval = null;
  var displaying_overlay = false;
  var overlay_controller;
  var android_back_event_listener;
  var displaying_search = false;
  var cellOffset = true ? 20 : 0;

  /**
                                                                     * init
                                                                     */
  function init() {

    configureStaticCells();

    getConfig();
    getLists();

    // not required when loading local data
    // $.activity_indicator.show();

    if (true) {
      $.navbar.back_button.hide();
    }

    if (false) {
      $.window.addEventListener('open', function (e) {
        $.search_textfield.hide();
      });
    }
  }
  init();

  /**
                   * get configuration
                   */
  function getConfig() {

    Data.get_config(function (error, e) {
      if (!error) {
        Alloy.Globals.setBackdropImageSize(e.images.backdrop_sizes);
        Alloy.Globals.setPosterImageSize(e.images.poster_sizes);
      } else {
        // handle error
      }
    });
  }

  /**
       * get movie collections and populate
       */
  function getLists() {

    api.getService({
      endpoint: '/v1/taxonomies/' + Alloy.Globals.playlistsId + '/terms' },
    function (_response) {

      if (_response.status) {

        lists = _response.data;
        populateLists(lists, 'list', 0, cellOffset + Alloy.Globals.layout.lists.cell.height + 20);
        getGenres();

      } else {

        alert(_response.message);

      }

    });

  }

  /**
       * get movie genres and populate
       * - animates in content once populated
       */
  function getGenres() {

    api.getService({
      endpoint: '/v1/taxonomies/' + Alloy.Globals.genresId + '/terms' },
    function (_response) {

      if (_response.status) {

        genres = _response.data;
        populateLists(genres, 'genre', lists.length, cellOffset + 40 + Alloy.Globals.layout.lists.cell.height);
        loaded_callback();

      } else {

        alert(_response.message);

      }

    });

  }

  function configureStaticCells() {

    $.searchCell.updateViews({
      "#cell": {
        top: cellOffset,
        left: 10 },

      "#title_label": {
        text: "\uf002" } });



    $.authCell.updateViews({
      "#cell": {
        top: cellOffset,
        left: 10 + (Alloy.Globals.layout.lists.cell.width + 10),
        height: true ? (Alloy.Globals.layout.lists.cell.height - 10) / 2 : Alloy.Globals.layout.lists.cell.height },

      "#title_label": {
        text: "\uf007" } });



    if (true) {
      $.settingsCell.updateViews({
        "#cell": {
          top: cellOffset + (Alloy.Globals.layout.lists.cell.height - 10) / 2 + 10,
          left: 10 + (Alloy.Globals.layout.lists.cell.width + 10),
          height: (Alloy.Globals.layout.lists.cell.height - 10) / 2 },

        "#title_label": {
          text: "\uf013" } });


    }
  }

  /**
       * populate lists
       */
  function populateLists(lists, type, cellOffset, yOffset) {

    for (var i = 0, num_lists = lists.length; i < num_lists; i++) {

      var list = lists[i];
      var idx = i + cellOffset;
      var cell_x = 10 + (Alloy.Globals.layout.lists.cell.width + 10) * (idx % 2);
      var cell_y = yOffset + (Alloy.Globals.layout.lists.cell.height + 10) * Math.floor(idx / 2);

      var cell = Alloy.createController("/views/list_cell");
      cell.updateViews({
        "#cell": {
          top: cell_y,
          left: cell_x },

        "#title_label": {
          text: list.title.toUpperCase() } });



      var images = [];
      _.each(list.images, function (path) {

        if (path != null) {

          images.push(path.src800x800);

        }
      });

      images = _.chain(images).shuffle().first(5).value();
      cell.populateImages(images);

      (function (cell, index) {

        cell.getView().addEventListener("click", function (e) {

          $.lists_container.touchEnabled = false;

          cell.animateClick(function () {

            if (type == 'list') {
              openList(lists[index]);
            } else if (type == 'genre') {
              openGenre(genres[index]);
            }

            setTimeout(function () {
              $.lists_container.touchEnabled = true;
            }, 1000);

          });
        });

      })(cell, i);

      cells.push(cell);
      $.lists_container.add(cell.getView());
      var contentHeight = cell_y + Alloy.Globals.layout.lists.cell.height + 10;
      if (false) {
        contentHeight = Alloy.Globals.dpToPx(contentHeight);
      }
      $.lists_container.contentHeight = contentHeight;
    }
  }

  function startAnimatingImages() {
    if (cells.length > 0 && !image_animation_interval) {
      image_animation_interval = setInterval(animateImages, 5000);
    }
  }

  function stopAnimatingImages() {
    clearInterval(image_animation_interval);
    image_animation_interval = null;
  }

  function animateImages() {
    _.each(cells, function (cell, index) {
      setTimeout(function () {
        animateCellImages(cell);
      }, index * 100);
    });
  }

  function animateCellImages(cell) {

    var cellTop = cell.getView().rect.y;
    var cellBottom = cell.getView().rect.y + cell.getView().rect.height;
    var visibleTop = $.lists_container.contentOffset.y;
    if (false) {
      visibleTop = Alloy.Globals.pxToDp(visibleTop);
    }
    var visibleBottom = visibleTop + $.lists_container.rect.height;

    var isVisible = cellTop < visibleBottom && cellBottom > visibleTop;

    if (isVisible) {
      cell.animateImages();
    }
  }

  /**
       * add cell separator line
       */
  function addCellSeparator(offset) {
    var view = Ti.UI.createView({
      top: offset,
      left: 10,
      right: 10,
      height: 0.5,
      backgroundColor: '#b0332a' });

    $.lists_container.add(view);
  }

  /**
       * animate in view
       */
  $.animateIn = function () {
    $.activity_indicator.hide();

    var offset = cellOffset + Alloy.Globals.layout.lists.cell.height;
    if (false) {
      offset = Alloy.Globals.dpToPx(offset + 20);
    }
    $.lists_container.setContentOffset({ x: 0, y: offset }, false);

    $.lists_container.animate(Ti.UI.createAnimation({
      opacity: 1,
      duration: 1000 }));


    startAnimatingImages();

  };

  /**
         * open list
         */
  function openList(data) {

    Alloy.Globals.Navigator.push("movies_list",
    {
      type: 'list',
      id: data.id,
      title: data.title });


  }

  /**
       * open genre
       */
  function openGenre(data) {

    Alloy.Globals.Navigator.push("movies_list",
    {
      type: 'genre',
      id: data.id,
      title: data.title });


  }

  /**
       * show overlay controller
       */
  function showOverlay(controller, options) {
    overlay_controller = Alloy.createController('/' + controller, options);
    var view = overlay_controller.getView();
    if (true) view.transform = Ti.UI.createMatrix2D({ scale: 2.0 });
    $.window.add(view);

    var cells_animation = Ti.UI.createAnimation({
      transform: Ti.UI.createMatrix2D({ scale: 0.7 }),
      opacity: 0.5,
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration: 500 });

    $.lists_container.animate(cells_animation);

    var view_animation = Ti.UI.createAnimation({
      transform: Ti.UI.createMatrix2D({ scale: 1 }),
      opacity: 1,
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration: 500,
      delay: 100 });

    view.animate(view_animation);

    overlay_controller.getView().addEventListener("click", hideOverlay);

    displaying_overlay = true;

    if (false) {
      android_back_event_listener = function (e) {
        hideOverlay();
      };

      $.window.addEventListener('androidback', android_back_event_listener);
    }
  }

  /**
       * hide overlay controller
       */
  function hideOverlay() {

    var view = overlay_controller.getView();
    view.removeEventListener("click", hideOverlay);
    var view_animation = Ti.UI.createAnimation({
      transform: Ti.UI.createMatrix2D({ scale: 2.0 }),
      opacity: 0,
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration: 500 });

    view.animate(view_animation);
    view_animation.addEventListener('complete', function (e) {
      $.window.remove(view);
      overlay_controller.destroy();
      overlay_controller = null;
    });

    var animation = Ti.UI.createAnimation({
      transform: Ti.UI.createMatrix2D({ scale: 1.0 }),
      opacity: 1,
      curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      duration: 500,
      delay: 100 });

    $.lists_container.animate(animation);

    displaying_overlay = false;

    if (false) {
      $.window.removeEventListener('androidback', android_back_event_listener);
    }
  }

  function displaySearch() {
    if (false) {
      $.search_textfield.show();
    }

    displaying_search = true;
    $.lists_container.scrollEnabled = false;
    $.lists_container.contentOffset = { x: 0, y: 0 };
    $.search_overlay.zIndex = 101;
    $.search_textfield.focus();

    $.container.animate({
      top: 0,
      duration: 250 });

  }

  /**
       * hide search and reset list scroll offset
       */
  function hideSearch() {
    displaying_search = false;
    $.search_overlay.zIndex = 0;
    $.lists_container.scrollEnabled = true;
    $.search_textfield.blur();
    $.search_textfield.value = '';

    var animation = Ti.UI.createAnimation({
      top: -70,
      duration: 250 });

    if (false) {
      animation.addEventListener('complete', function (e) {
        $.search_textfield.hide();
      });
    }
    $.container.animate(animation);
  }


  ///////////////////////////////////////////////////////////////////////////////
  //
  // event handlers
  //
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * scrollview scroll event handler
   */
  if (true) {
    $.lists_container.addEventListener('scroll', function (e) {
      var offset = e.y;
      $.navbar.background_view.opacity = Math.max(Math.min(offset / (cellOffset / 2), 1), 0);
    });
  }

  /**
       * search overlay click event handler
       */
  $.search_overlay.addEventListener('click', function (e) {
    hideSearch();
  });

  /**
           * search textfield return event handler
           */
  $.search_textfield.addEventListener('return', function (e) {
    Alloy.Globals.Navigator.push("movies_list", {
      type: 'search',
      query: e.value });


    setTimeout(function () {
      hideSearch();
    }, 1000);
  });

  $.searchCell.getView().addEventListener("click", function (e) {
    $.lists_container.touchEnabled = false;
    $.searchCell.animateClick(function () {

      displaySearch();

      setTimeout(function () {

        $.lists_container.touchEnabled = true;

      }, 1000);

    });
  });

  function handleStaticCellClick(cell, overlay) {
    $.lists_container.touchEnabled = false;
    cell.animateClick(function () {

      showOverlay(overlay);

      setTimeout(function () {

        $.lists_container.touchEnabled = true;

      }, 1000);

    });
  }

  $.authCell.getView().addEventListener("click", function (e) {

    Alloy.Globals.Navigator.push("auth", {});

  });

  /**
           * iOS only: settings button click event handler
           */
  if (true) {
    $.settingsCell.getView().addEventListener("click", function (e) {
      handleStaticCellClick($.settingsCell, 'settings');
    });
  }

  /**
       *
       * iOS only: Core motion for list parallax effect
       *
       * - motion updates are listened for when property is set, app is active and window is visisble
       *
       */
  if (true) {

    Ti.App.addEventListener(Alloy.Globals.EVENT_PROPERTY_ENABLE_MOTION_ANIMATION_DID_CHANGE, registerForMotionUpdates);

    $.window.addEventListener('focus', function (e) {
      startAnimatingImages();
      registerForMotionUpdates();
      Ti.App.addEventListener('resume', registerForMotionUpdates);
      Ti.App.addEventListener('pause', unregisterForMotionUpdates);
    });

    $.window.addEventListener('blur', function (e) {
      stopAnimatingImages();
      unregisterForMotionUpdates();
      Ti.App.removeEventListener('resume', registerForMotionUpdates);
      Ti.App.removeEventListener('pause', unregisterForMotionUpdates);
    });

    function registerForMotionUpdates() {

      if (!Ti.App.Properties.getBool(Alloy.Globals.PROPERTY_ENABLE_MOTION_ANIMATION)) {
        unregisterForMotionUpdates();
        return;
      }

      if (DeviceMotion.isDeviceMotionAvailable() && !DeviceMotion.isDeviceMotionActive()) {
        DeviceMotion.setDeviceMotionUpdateInterval(50);
        DeviceMotion.startDeviceMotionUpdates(function (e) {
          if (e.success) {
            // Ti.API.info("picth: " + e.attitude.pitch);
            // Ti.API.info("roll: " + e.attitude.roll);
            // Ti.API.info("yaw: " + e.attitude.yaw);

            var imageTop = Alloy.Globals.layout.lists.cell.imageTop + 15 * e.attitude.pitch;
            var imageLeft = Alloy.Globals.layout.lists.cell.imageLeft + 15 * e.attitude.roll;

            for (var i = 0, num_cells = cells.length; i < num_cells; i++) {

              var cell = cells[i];
              cell.updateViews({
                "#image": {
                  top: imageTop,
                  left: imageLeft } });


            }
          }
        });
      }
    }

    function unregisterForMotionUpdates() {
      if (DeviceMotion.isDeviceMotionActive()) {
        DeviceMotion.stopDeviceMotionUpdates();
      }
    }
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
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/home.js.map