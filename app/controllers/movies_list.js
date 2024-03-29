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
	
	if (OS_IOS) {
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
		endpoint : '/v1/players?terms_id=' + id
	}, function(_response) {

		if (_response.status) {

			$.navbar.title_label.text = args.title.toUpperCase();

			movies = _response.data;
			populateMovies(movies);


		}else{

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
		endpoint : '/v1/players?search=' + query
	}, function(_response) {

		if (_response.status) {

			$.navbar.title_label.text = "Results for '" + query + "'";

			movies = _response.data;
			populateMovies(movies);


		}else{

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
		endpoint : "/v1/players?seasons_id=" + id
	}, function(_response) {
		
		if (_response.status) {

			$.navbar.title_label.text = args.title.toUpperCase();
			movies = _response.data;
			populateMovies(movies);

		}else{

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
	
	for (var i=0; i<movies.length; i++) {
		
		var movie = movies[i];
		
		var cell = Alloy.createController("/views/movies_list_cell");
		cell.updateViews({
			"#title_label": {
				text: movie.title
			},
			"#thumbnail_imageview": {
				top: (OS_IOS) ? cellImageOffset(i) : 0,
				image: (movie.images.length > 0) ? movie.images[0].src : 'https://via.placeholder.com/1280x720'
			}
		});

		tableView_data.push(cell);
		tableView_rows.push(cell.getView());
	}
	
	$.tableview.setData(tableView_rows);
	
	$.activity_indicator.hide();
	
	var tableview_animation = Ti.UI.createAnimation({
		opacity: 1,
		duration: 500,
		curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
	});
	$.tableview.animate(tableview_animation);
}

/**
 * cell offset
 * @param {Number} idx
 * @param {Number} scroll_offset
 */
function cellImageOffset(idx, scroll_offset) {
	scroll_offset = scroll_offset || 0;
	var offset = ((scroll_offset - 64) * tableview_offset_per_px) - (idx * tableview_cell_offset);
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
$.tableview.addEventListener("click", function(e) {
	$.tableview.touchEnabled = false;
	tableView_data[e.index].animateClick(function(){
		var movie = movies[e.index];
    	Alloy.Globals.Navigator.push("movie", {code: movie.code});
    	setTimeout(function() {
	    	$.tableview.touchEnabled = true;
	    }, 1000);
 	});
});


if (OS_IOS) {

	/**
	 * tableview scroll - handle navbar
	 */
	$.tableview.addEventListener('scroll', function(e) {
		var offset = e.contentOffset.y;
		$.navbar.background_view.opacity = Math.min(offset / 44, 1);
		$.navbar.content.opacity = Math.min(1 - (offset / 44), 1);
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
		$.tableview.addEventListener('scroll', function(e) {
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
		for (var i=0, num_rows=tableView_data.length; i<num_rows; i++) {
			var row = tableView_data[i];
			row.updateViews({
				"#thumbnail_imageview": {
					top: cellImageOffset(i, offset)
				}
			});	
		}
	}
}
