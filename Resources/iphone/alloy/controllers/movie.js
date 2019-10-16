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
  this.__controllerPath = 'movie';
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
  { navBarHidden: true, backgroundColor: "black", orientationModes: [Ti.UI.PORTRAIT], clipMode: true, id: "window" });

  $.__views.window && $.addTopLevelView($.__views.window);
  $.__views.background_imageview = Ti.UI.createImageView(
  { top: 0, left: Alloy.Globals.layout.movie.backdropImageLeft, width: Alloy.Globals.layout.movie.backdropImageWidth, height: Alloy.Globals.layout.movie.backdropImageHeight, preventDefaultImage: true, opacity: 0, id: "background_imageview" });

  $.__views.window.add($.__views.background_imageview);
  $.__views.background_gradient_view = Ti.UI.createView(
  { top: 0, left: Alloy.Globals.layout.movie.backdropImageLeft, width: Alloy.Globals.layout.movie.backdropImageWidth, height: Alloy.Globals.layout.movie.backdropImageHeight, backgroundGradient: { type: "linear", startPoint: { x: "0%", y: "0%" }, endPoint: { x: "0%", y: "100%" }, colors: [{ color: "#77000000", offset: 0 }, { color: "#77000000", offset: 0.5 }, { color: "#ff000000", offset: 0.9 }] }, id: "background_gradient_view" });

  $.__views.window.add($.__views.background_gradient_view);
  $.__views.details_scrollview = Ti.UI.createScrollView(
  { top: 0, left: 0, width: Alloy.Globals.Device.width, height: Ti.UI.FILL, contentWidth: "auto", contentHeight: "auto", layout: "vertical", opacity: 0, id: "details_scrollview" });

  $.__views.window.add($.__views.details_scrollview);
  $.__views.title_label = Ti.UI.createLabel(
  { top: Alloy.Globals.layout.movie.titleTop, left: 10, right: 10, height: Ti.UI.SIZE, font: { fontSize: 28, fontFamily: "HelveticaNeue-Bold" }, color: "#ffffff", id: "title_label" });

  $.__views.details_scrollview.add($.__views.title_label);
  $.__views.details_view = Ti.UI.createView(
  { top: Alloy.Globals.layout.movie.detailsTop, left: 10, right: 10, height: Ti.UI.SIZE, id: "details_view" });

  $.__views.details_scrollview.add($.__views.details_view);
  $.__views.poster = Ti.UI.createView(
  { top: 0, left: 0, width: Alloy.Globals.layout.movie.posterWidth, height: Alloy.Globals.layout.movie.posterHeight, id: "poster" });

  $.__views.details_view.add($.__views.poster);
  $.__views.poster_imageview = Ti.UI.createImageView(
  { borderColor: "#66ffffff", borderWidth: 0.5, width: Alloy.Globals.layout.movie.posterWidth, height: Alloy.Globals.layout.movie.posterHeight, preventDefaultImage: true, id: "poster_imageview" });

  $.__views.poster.add($.__views.poster_imageview);
  $.__views.poster_overlay_view = Ti.UI.createView(
  { backgroundColor: "#ffffff", opacity: 0, id: "poster_overlay_view" });

  $.__views.poster.add($.__views.poster_overlay_view);
  $.__views.play_button = Ti.UI.createButton(
  { width: Alloy.Globals.layout.movie.posterWidth, height: Alloy.Globals.layout.movie.posterHeight, backgroundImage: "/play_button.png", backgroundSelectedImage: "/play_button_down.png", id: "play_button" });

  $.__views.poster.add($.__views.play_button);
  $.__views.rightSide = Ti.UI.createView(
  { width: Alloy.Globals.layout.movie.infoWidth, height: Ti.UI.SIZE, top: 0, right: 0, layout: "vertical", id: "rightSide" });

  $.__views.details_view.add($.__views.rightSide);
  $.__views.info_label = Ti.UI.createLabel(
  { top: 0, left: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, font: { fontSize: 14, fontFamily: "HelveticaNeue-Light" }, color: "#d0d0d0", id: "info_label" });

  $.__views.rightSide.add($.__views.info_label);
  $.__views.rightSideButtons = Ti.UI.createView(
  { width: Alloy.Globals.layout.movie.infoWidth, height: Ti.UI.SIZE, left: 0, layout: "horizontal", id: "rightSideButtons" });

  $.__views.rightSide.add($.__views.rightSideButtons);
  $.__views.website_button = Ti.UI.createButton(
  { top: 10, left: 0, width: Alloy.Globals.layout.movie.linkButtonWidth, height: 30, backgroundColor: "#260205", borderColor: "#b0332a", borderWidth: 0.5, color: "#b0332a", font: { fontSize: 14, fontFamily: "HelveticaNeue-Light" }, title: 'Share', id: "website_button" });

  $.__views.rightSideButtons.add($.__views.website_button);
  $.__views.imdb_button = Ti.UI.createButton(
  { top: 10, left: 10, width: Alloy.Globals.layout.movie.linkButtonWidth, height: 30, backgroundColor: "#260205", borderColor: "#b0332a", borderWidth: 0.5, color: "#b0332a", font: { fontSize: 14, fontFamily: "HelveticaNeue-Light" }, title: 'Seasons', id: "imdb_button" });

  $.__views.rightSideButtons.add($.__views.imdb_button);
  $.__views.info_cast = Ti.UI.createLabel(
  { left: 0, top: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#d0d0d0", font: { fontSize: 14, fontFamily: "HelveticaNeue-Light" }, id: "info_cast" });

  $.__views.rightSide.add($.__views.info_cast);
  $.__views.info_views = Ti.UI.createLabel(
  { left: 0, top: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#d0d0d0", font: { fontSize: 14, fontFamily: "HelveticaNeue-Light" }, id: "info_views" });

  $.__views.rightSide.add($.__views.info_views);
  $.__views.synopsis_label = Ti.UI.createLabel(
  { top: Alloy.Globals.layout.movie.synopsisTop, left: 10, right: 10, height: Ti.UI.SIZE, font: { fontSize: 14, fontFamily: "HelveticaNeue" }, backgroundColor: "transparent", color: "#d0d0d0", id: "synopsis_label" });

  $.__views.details_scrollview.add($.__views.synopsis_label);
  $.__views.activity_indicator = Ti.UI.createActivityIndicator(
  { style: Ti.UI.ActivityIndicatorStyle.BIG, height: Ti.UI.SIZE, width: Ti.UI.SIZE, color: "#ff0000", id: "activity_indicator" });

  $.__views.window.add($.__views.activity_indicator);
  $.__views.__alloyId0 = Alloy.createController('views/navbar', { id: "__alloyId0", __parentSymbol: $.__views.window });
  $.__views.__alloyId0.setParent($.__views.window);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var api = require('apiService');
  var Data = require("/data");
  var player = require('/player');
  var yt = require('/youtube');
  var animation = require('/animation');

  var args = arguments[0] || {};
  var movie;
  var code;
  var images_loaded = 0;
  var can_play_trailer = true;

  /**
                                                             * init
                                                             */
  function init() {

    $.window.removeEventListener("open", init);

    $.activity_indicator.show();

    if (args.code) {

      fetchMovie(args.code);

    } else if (args.movie) {

      movie = args.movie;

    }

  }

  /**
       * fetch movie
       * @param {String} id
       */
  function fetchMovie(code) {

    api.getService({
      endpoint: '/v1/players?code=' + code + '&mobile=images' },
    function (_response) {

      // check for in
      if (_response.status) {

        movie = _response.data;
        populateMovie(_response.data);

      } else {

        alert(_response.message);

      }

    });

  }

  /**
       * populate movie
       * @param {Object} movie
       */
  function populateMovie(movie) {

    $.background_imageview.image = movie.images_landscape ? movie.images_landscape : 'https://via.placeholder.com/1280x720';

    $.poster_imageview.image = movie.images_portrait ? movie.images_portrait : 'https://via.placeholder.com/720x1280';

    $.title_label.text = movie.title;
    $.info_label.text = durationString(movie.duration);
    if (movie.release_date) $.info_label.text += '  |  ' + movie.release_date.substr(0, 4);
    var info_label_max_y = $.info_label.rect.y + $.info_label.rect.height;

    if (movie.persons) {

      if (movie.persons.length > 0) {

        var cast = '';
        for (var i = 0; i < movie.persons.length; i++) {
          var comma = movie.persons.length != i + 1 ? ', ' : '';
          cast += movie.persons[i].title + comma;
        }
        $.info_cast.text = 'Cast: ' + cast;

      } else {

        $.rightSide.remove($.info_cast);

      }

    }

    if (movie.views) {

      $.info_views.text = 'Views: ' + movie.views;

    }

    if (movie.hasOwnProperty('seasons')) {
      // SHOW SEASONS BTN::
    } else {
      $.imdb_button.hide();
    }

    if (movie.homepage || movie.imdb_id) {

      if (movie.homepage) {
        $.website_button.top = info_label_max_y + 15;
      } else {
        $.details_view.remove($.website_button);
      }

      if (movie.imdb_id) {
        if (!movie.homepage) $.imdb_button.left = $.website_button.left;
        $.imdb_button.top = info_label_max_y + 15;
      } else {
        $.details_view.remove($.imdb_button);
      }
    }

    // synopsis
    $.synopsis_label.text = movie.long_description;
    var synopsis_height = 0;
    $.synopsis_label.addEventListener('postlayout', function synopsisPostLayout(e) {

      if ($.synopsis_label.rect.height == synopsis_height) {
        return;
      }
      synopsis_height = $.synopsis_label.rect.height;

      $.details_scrollview.contentHeight = $.synopsis_label.rect.y + $.synopsis_label.rect.height + 20;
      $.details_scrollview.contentHeight = Math.max($.details_scrollview.contentHeight, Alloy.Globals.Device.height + 1);
    });

    /*if (movie.trailer) {
            	can_play_trailer = true;
            } else {
            	$.poster.remove($.play_button);
            }*/
  }

  /**
       * duration in hours and minutes
       * @param {Number} minutes
       * @return {String}
       */
  function durationString(minutes) {

    var hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    var duration = hours > 0 ? hours + "h " : "";
    duration += minutes > 9 ? minutes + "m" : "0" + minutes + "m";
    return duration;
  }

  /**
       * animate in
       */
  function animateIn() {
    images_loaded++;
    if (images_loaded < 2) return;

    $.activity_indicator.hide();

    var background_animation = Ti.UI.createAnimation({
      opacity: 1,
      duration: 1000,
      curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT });

    $.background_imageview.animate(background_animation);

    var details_animation = Ti.UI.createAnimation({
      opacity: 1,
      duration: 500,
      delay: 800,
      curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT });

    $.details_scrollview.animate(details_animation);
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
                                                                                     * background imageview load
                                                                                     */
  $.background_imageview.addEventListener('load', function (e) {
    $.background_gradient_view.height = e.source.rect.height + 2; // hacky :(
    animateIn();
  });

  /**
           * poster imageview load
           */
  $.poster_imageview.addEventListener('load', animateIn);

  /**
                                                                                                                   * scrollview scroll
                                                                                                                   */
  $.details_scrollview.addEventListener('scroll', function (e) {

    var opacity = 1.0;
    var offset = e.y;

    if (offset <= 0) {

      var height = Alloy.Globals.layout.movie.backdropImageHeight - offset;
      var scale = height / Alloy.Globals.layout.movie.backdropImageHeight;

      var transform = Ti.UI.create2DMatrix({ scale: scale });
      transform = transform.translate(0, -offset / (2 * scale));

      $.background_imageview.transform = $.background_gradient_view.transform = transform;
      $.background_imageview.opacity = 1;

    } else if (offset > 0) {

      opacity = Math.max(1 - offset / 200, 0.5);
      $.background_imageview.opacity = opacity;
    }

  });

  /**
           * play button click
           */
  $.play_button.addEventListener('click', function (e) {

    api.getCustomerService({
      endpoint: "/v1/access" },
    function (_response) {

      if (_response.status) {

        // LOGGED IN
        $.play_button.touchEnabled = false;
        animation.flash($.poster_overlay_view, function () {

          if (movie.content.media.length > 0) {

            var getTypes = movie.content.media.filter(function (val) {

              return val.mime_type == "application/x-mpegURL";

            });

            if (getTypes.length > 0) {

              var source = getTypes.filter(function (val) {
                return val.ref == "app";
              });

              if (source.length > 0) {

                player.playVideo(source[0].src, args.code);

              } else {

                player.playVideo(getTypes[0].src, args.code);

              }

            }

          } else {

            alert('No videos');

          }

          setTimeout(function () {
            $.play_button.touchEnabled = true;
          }, 2000);

        });

      } else {

        // NOT LOGGED IN::
        Alloy.Globals.Navigator.push("auth", {});

      }

    });

  });

  /**
           * website button click
           */
  $.website_button.addEventListener('click', function (e) {
    if (movie.homepage) {

      Ti.Platform.openURL(movie.homepage);

    }
  });

  /**
           * IMDB button click
           */
  $.imdb_button.addEventListener('click', function (e) {

    var seasonsOptions = [];
    var seasonsArray = [];
    if (movie.seasons) {

      for (var i = 0; i < movie.seasons.length; i++) {

        seasonsOptions.push(movie.seasons[i].title);
        seasonsArray.push(movie.seasons[i]);

      }

    }

    var dialog = Ti.UI.createOptionDialog({
      options: seasonsOptions,
      title: 'Seasons' });

    dialog.addEventListener('click', function (evt) {

      Alloy.Globals.Navigator.push("movies_list", {
        type: 'season',
        id: seasonsArray[evt.index].id,
        title: seasonsArray[evt.index].title });


    });
    dialog.show();

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
//# sourceMappingURL=file:///Users/samueleast/Documents/Appcelerator_Studio_Workspace/OTNet/build/map/Resources/iphone/alloy/controllers/movie.js.map