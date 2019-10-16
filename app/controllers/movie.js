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
		endpoint : '/v1/players?code=' + code + '&mobile=images'
	}, function(_response) {

		// check for in
		if (_response.status) {

			movie = _response.data;
			populateMovie(_response.data);

		}else{

			alert(_response.message);
			
		}

	});
	
}

/**
 * populate movie
 * @param {Object} movie
 */
function populateMovie(movie) {
	
	$.background_imageview.image = (movie.images_landscape) ? movie.images_landscape : 'https://via.placeholder.com/1280x720';
	
	$.poster_imageview.image = (movie.images_portrait) ? movie.images_portrait : 'https://via.placeholder.com/720x1280';
	
	$.title_label.text = movie.title;
	$.info_label.text = durationString(movie.duration);
	if (movie.release_date) $.info_label.text += '  |  ' + movie.release_date.substr(0, 4); 
	var info_label_max_y = $.info_label.rect.y + $.info_label.rect.height;

	if(movie.persons){ 

		if(movie.persons.length > 0){

			var cast = '';
			for (var i = 0; i < movie.persons.length; i++) { 
				var comma = (movie.persons.length != (i+1)) ? ', ' : '';
			  	cast += movie.persons[i].title + comma;
			}
			$.info_cast.text = 'Cast: ' + cast;

		}else{

			$.rightSide.remove($.info_cast);

		}

	}
	
	if(movie.views){ 

		$.info_views.text = 'Views: ' + movie.views;

	}

 	if (movie.hasOwnProperty('seasons') ) {
	 	// SHOW SEASONS BTN::
	}else{
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
	
	var hours = Math.floor(minutes/60);
	minutes = minutes - (hours * 60);
	var duration = (hours > 0) ? hours + "h " : "";
	duration += (minutes > 9) ? minutes + "m" : "0" + minutes + "m";
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
		curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
	});
	$.background_imageview.animate(background_animation);
	
	var details_animation = Ti.UI.createAnimation({
		opacity: 1,
		duration: 500,
		delay: 800,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
	});
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
$.background_imageview.addEventListener('load', function(e) {
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
$.details_scrollview.addEventListener('scroll', function(e) {
	
	var opacity = 1.0;
	var offset = e.y;
	
	if (offset <= 0) {
		
		var height = Alloy.Globals.layout.movie.backdropImageHeight - offset;
		var scale = height / Alloy.Globals.layout.movie.backdropImageHeight;
		
		var transform = Ti.UI.create2DMatrix({scale: scale});
		transform = transform.translate(0, -offset/(2*scale));
		
		$.background_imageview.transform = $.background_gradient_view.transform = transform;
		$.background_imageview.opacity = 1;
		
	} else if (offset > 0) {
		
		opacity = Math.max(1 - (offset / 200), 0.5);
		$.background_imageview.opacity = opacity; 
	}

});

/**
 * play button click
 */
$.play_button.addEventListener('click', function(e){

	api.getCustomerService({
		endpoint: "/v1/access"
	}, function(_response) {

		if (_response.status) {
			
			// LOGGED IN
			$.play_button.touchEnabled = false;
			animation.flash($.poster_overlay_view, function(){

				if(movie.content.media.length > 0){
					
					var getTypes =  movie.content.media.filter(function(val) {

						return val.mime_type == "application/x-mpegURL";

					});

					if(getTypes.length > 0){

						var source =  getTypes.filter(function(val) {
							return val.ref == "app";
						});

						if(source.length > 0){

							player.playVideo(source[0].src, args.code);

						}else{

							player.playVideo(getTypes[0].src, args.code);

						}

					}

				}else{

					alert('No videos');

				}
				
				setTimeout(function(){
					$.play_button.touchEnabled = true;
				}, 2000);

			});

		}else{

			// NOT LOGGED IN::
			Alloy.Globals.Navigator.push("auth", {});
			
		}

	});

});

/**
 * website button click
 */
$.website_button.addEventListener('click', function(e){
	if (movie.homepage) {

		Ti.Platform.openURL(movie.homepage);

	}
});

/**
 * IMDB button click
 */
$.imdb_button.addEventListener('click', function(e){
	
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
	    title: 'Seasons'
	});
	dialog.addEventListener('click', function(evt){

	    Alloy.Globals.Navigator.push("movies_list", {
			type: 'season',
			id:    seasonsArray[evt.index].id,
			title: seasonsArray[evt.index].title
		});

	});
	dialog.show();

});
