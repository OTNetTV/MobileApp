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
  this.__controllerPath = 'movies_list';
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
  { navBarHidden: true, orientationModes: [Ti.UI.PORTRAIT], backgroundColor: "#000000", id: "window" });

  $.__views.window && $.addTopLevelView($.__views.window);
  if (true) {
    $.__views.tableview_header = Ti.UI.createView(
    { backgroundColor: "#b0332a", height: 64, id: "tableview_header" });

  }
  if (true) {
    $.__views.pull_view = Ti.UI.createView(
    { backgroundColor: "#b0332a", id: "pull_view" });

  }
  $.__views.tableview = Ti.UI.createTableView(
  { top: 0, left: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundColor: "transparent", pullBackgroundColor: "#b0332a", showVerticalScrollIndicator: false, opacity: 0, tableSeparatorInsets: { left: 0, right: 0 }, separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE, headerView: $.__views.tableview_header, headerPullView: $.__views.pull_view, id: "tableview" });

  $.__views.window.add($.__views.tableview);
  $.__views.activity_indicator = Ti.UI.createActivityIndicator(
  { style: Ti.UI.ActivityIndicatorStyle.BIG, height: Ti.UI.SIZE, width: Ti.UI.SIZE, color: "#ff0000", id: "activity_indicator" });

  $.__views.window.add($.__views.activity_indicator);
  $.__views.navbar = Alloy.createController('views/navbar', { id: "navbar", __parentSymbol: $.__views.window });
  $.__views.navbar.setParent($.__views.window);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var api = require('apiService');
  var Data = require('/data');

  var args = arguments[0] || {};

  var movies = [];
  var tableView_data = [];
  var tableview_offset_per_px = 0;
  var tableview_cell_offset = 0;

  var that = this;

  /**
                                     * init
                                     */
  function init() {

    $.window.removeEventListener("open", init);

    // not required when loading local data
    // $.activity_indicator.show();

    var diff = Alloy.Globals.layout.list.row.imageHeight - Alloy.Globals.layout.list.row.height;
    tableview_offset_per_px = diff / $.tableview.rect.height;
    tableview_cell_offset = tableview_offset_per_px * Alloy.Globals.layout.list.row.height;

    if (args.type == 'search') {

      search(args.query);

    } else if (args.type == 'season') {

      season(args.id);

    } else {

      fetchCollection(args.id);

    }

    if (true) {
      $.navbar.background_view.opacity = 0;
    }


  }


  /**
       * fetch collection
       * @param {String} 	type (list, genre)
       * @param {String} 	id
       */
  function fetchCollection(id) {

    api.getService({
      endpoint: '/v1/players?terms_id=' + id },
    function (_response) {

      if (_response.status) {

        $.navbar.title_label.text = args.title.toUpperCase();

        movies = _response.data;
        populateMovies(movies);


      } else {

        alert(_response.message);

      }

    });

  }

  /**
       * search
       * @param {String} 	query
       */
  function search(query) {

    api.getService({
      endpoint: '/v1/players?search=' + query },
    function (_response) {

      if (_response.status) {

        $.navbar.title_label.text = "Results for '" + query + "'";

        movies = _response.data;
        populateMovies(movies);


      } else {

        alert(_response.message);

      }

    });

  }

  /**
       * search
       * @param {String} 	query
       */
  function season(id) {

    api.getService({
      endpoint: "/v1/players?seasons_id=" + id },
    function (_response) {

      if (_response.status) {

        $.navbar.title_label.text = args.title.toUpperCase();
        movies = _response.data;
        populateMovies(movies);

      } else {

        alert(_response.message);

      }

    });

  }

  /**
       * populateMovies
       * @param {Array} 	movies
       */
  function populateMovies(movies) {

    tableView_data = [];
    var tableView_rows = [];

    for (var i = 0; i < movies.length; i++) {

      var movie = movies[i];

      var cell = Alloy.createController("/views/movies_list_cell");
      cell.updateViews({
        "#title_label": {
          text: movie.title },

        "#thumbnail_imageview": {
          top: true ? cellImageOffset(i) : 0,
          image: movie.images.length > 0 ? movie.images[0].src : 'https://via.placeholder.com/1280x720' } });



      tableView_data.push(cell);
      tableView_rows.push(cell.getView());
    }

    $.tableview.setData(tableView_rows);

    $.activity_indicator.hide();

    var tableview_animation = Ti.UI.createAnimation({
      opacity: 1,
      duration: 500,
      curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT });

    $.tableview.animate(tableview_animation);
  }

  /**
       * cell offset
       * @param {Number} idx
       * @param {Number} scroll_offset
       */
  function cellImageOffset(idx, scroll_offset) {
    scroll_offset = scroll_offset || 0;
    var offset = (scroll_offset - 64) * tableview_offset_per_px - idx * tableview_cell_offset;
    offset = Math.min(offset, 0);
    offset = Math.max(offset, Alloy.Globals.layout.list.row.height - Alloy.Globals.layout.list.row.imageHeight);
    return offset;
  }

  ///////////////////////////////////////////////////////////////////////////////
  //
  // event handlers
  //
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * window open
   */
  $.window.addEventListener("open", init);


  /**
                                                                                     * tableview click
                                                                                     */
  $.tableview.addEventListener("click", function (e) {
    $.tableview.touchEnabled = false;
    tableView_data[e.index].animateClick(function () {
      var movie = movies[e.index];
      Alloy.Globals.Navigator.push("movie", { code: movie.code });
      setTimeout(function () {
        $.tableview.touchEnabled = true;
      }, 1000);
    });
  });


  if (true) {

    /**
                         * tableview scroll - handle navbar
                         */
    $.tableview.addEventListener('scroll', function (e) {
      var offset = e.contentOffset.y;
      $.navbar.background_view.opacity = Math.min(offset / 44, 1);
      $.navbar.content.opacity = Math.min(1 - offset / 44, 1);
    });

    (function startScrollAnimation() {

      if (!Ti.App.Properties.getBool(Alloy.Globals.PROPERTY_ENABLE_LIST_ANIMATION)) {
        return;
      }

      /**
           * tableview postlayout
           */
      $.tableview.addEventListener('postlayout', function tableviewPostLayout(e) {

        var height = e.source.rect.height;
        if (height > 0 && height <= Alloy.Globals.deviceHeight) {

          var diff = Alloy.Globals.layout.list.row.imageHeight - Alloy.Globals.layout.list.row.height;
          tableview_offset_per_px = diff / height;
          tableview_cell_offset = tableview_offset_per_px * Alloy.Globals.layout.list.row.height;

          $.tableview.removeEventListener('postlayout', tableviewPostLayout);
        }
      });

      /**
               * tableview scroll
               */
      $.tableview.addEventListener('scroll', function (e) {
        var offset = e.contentOffset.y;
        updateTableView(offset);
      });

    })();

    /**
                 * updateTableView
                 * 
                	 * @param {Number} offset
                 */
    function updateTableView(offset) {
      for (var i = 0, num_rows = tableView_data.length; i < num_rows; i++) {
        var row = tableView_data[i];
        row.updateViews({
          "#thumbnail_imageview": {
            top: cellImageOffset(i, offset) } });


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
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/movies_list.js.map