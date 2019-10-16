
var api = require('apiService');

var lib = Alloy.Globals;

var win = null,
    videoPlayer = null;

exports.isPlaying = false;

exports.playVideo = function(url, code) {

	if (OS_IOS) {
		win = Ti.UI.createWindow({
			title : 'View Training Video',
			backgroundColor : '#000'
		});
	}
	if (OS_WINDOWS) {
		win = Ti.UI.createWindow({
			title : 'View Training Video',
			backgroundColor : '#000'
		});
	}
	videoPlayer = Ti.Media.createVideoPlayer({
		url : url,
		autoplay : true,
		allowsAirPlay : true,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
    	scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
		showsControls : true,
		pictureInPictureEnabled : true,
		/*overlayView : Ti.UI.createView({
	        backgroundColor : 'blue',
	        width : 300,
	        height : 300
	    }),*/
	});

	videoPlayer.addEventListener('keypressed', function(e) {
		console.log(e);
	});

	/*videoPlayer.addEventListener('naturalsizeavailable', function(e) {
		console.log(e);
	});*/

	videoPlayer.addEventListener('postlayout', function(e) {
		console.log(e);
	});

	videoPlayer.addEventListener('resize', function(e) {
		console.log(e);
	});

	videoPlayer.addEventListener('loadState', function(e) {
		console.log('loadState', e);
	});

	function playerTimer() {

		if(videoPlayer){

			var timeLapsed = Math.round(videoPlayer.getCurrentPlaybackTime()/1000);
			var duration = Math.round(videoPlayer.getDuration()/1000);

			// 90 x (100/125) = 72 %

			api.postCustomerService({
				endpoint: "/v1/access/streams",
				code: code,
				stream_watched: parseInt(timeLapsed * (100/duration)),
				stream_duration: parseInt(duration),
				stream_rating: 4
			}, function(_response) {

				if (_response.status) {
					
					console.log('_response', _response);

				}else{

					console.log('ERROR', _response.message);
					
				}

			});

		}
		
	}

	var timer = setInterval(playerTimer, 1000);

	videoPlayer.addEventListener('durationavailable', function(e) {

		console.log('durationavailable',e);

	});

	videoPlayer.addEventListener('swipe', function(e) {

		clearInterval(timer);
		
		timer = null;
		
		exports.close();

	});

	videoPlayer.addEventListener('complete', function(e) {

		clearInterval(timer);
		
		timer = null;

		exports.close();
	
	});
	
	if (OS_IOS) {
		win.add(videoPlayer);
		win.open();
	}
	if (OS_WINDOWS) {
		win.add(videoPlayer);
		win.open();
	}
};

exports.close = function() {
	Ti.API.info('closing video player');

	if (OS_IOS) {
		if (videoPlayer) {
			videoPlayer.fullscreen = false;
		}
		win && win.close();
		win = null;
	} else if (OS_WINDOWS) {
		win && win.close();
		win = null;
	} else {
		if (videoPlayer) {
			videoPlayer.hide();
			videoPlayer.release();
			videoPlayer = null;
		}
	}
	exports.isPlaying = false;
};
