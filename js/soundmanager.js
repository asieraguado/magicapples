/* soundmanager.js: part of the Magic Apples web application. 
Copyright (c) 2014 Asier Aguado.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

var soundDir = "sounds/";
var audio = new Audio();
if (audio.canPlayType("audio/ogg")) {
    format = "ogg";
} else {
    format = "mp3";
}

var SoundManager = {
	play: function(soundId) {
		var file = soundDir + soundId + "." + format;
		
	/* -----PhoneGap API-------
	
		this.media = new Media(file, onMediaSuccess, onMediaError);
		this.media.play();
		var mediaTimer = setInterval(function() { 
		// This timer forces media object to update the current position
		// (patch for a bug: media object sometimes not calling success function)
			// Get position
			SoundManager.media.getCurrentPosition(
			    // Success callback function
			    function(position) {
				if (position >= 0) {
				    console.log((position) + " sec");
				} else {
				    clearInterval(mediaTimer);
				}
			    },
			    // Error callback function
			    function(e) {
				console.log("Error getting position=" + e);
			    }
			);
		}, 1000);
	*/
	
	// (Browser & FirefoxOS) HTML5 API
		this.audio = new Audio();
		$(SoundManager.audio).one('ended',function(){
		    onMediaSuccess();
		});
		$(SoundManager.audio).one('error',function(){
		    onMediaError();
		});
        this.audio.src = file;
        this.audio.play();
	},
	
	setSuccessFunc: function(theFunc) {
		this.play_success = theFunc;
	},
	
	clearSuccessFunc: function() {
		this.play_success = function() { return; };
	},
	
	play_success: function() {
		console.log("[W]: (SoundManager) Nothing set for sound success.");
	}
};

function onMediaError(error) {
	console.log('[MediaError] code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
    SoundManager.play_success();
}

function onMediaSuccess() {
	// --phonegap only--
	// SoundManager.media.release();
	SoundManager.play_success();
}
