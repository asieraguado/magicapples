/* count.js: part of the Magic Apples web application. 
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

$.getScript("js/numbers_" + localStorage.getItem("language") + ".js");
if (localStorage.getItem("level") !== null) {
	level = localStorage.getItem("level");
} else {
	level = 5;
}

function reset() {
    window.clearTimeout(reactTimer);
    $("#keys .key").css("background-color", "orange");
    $("#blockingdiv").css("z-index", -1);
    $("#dialog").css("visibility", "hidden");
    $("#text").html("");
    $("#text").css("text-decoration", "none");
    $("#text").css("color", "black");
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

var apples = Math.ceil(Math.random()*level);

$(document).ready(function() {
	var applesize = Math.sqrt((parseInt($("#graphic").css("width").replace("px", "")) * parseInt($("#graphic").css("height").replace("px", "")))/(1.9*apples))+"px";
	//alert(applesize);
    // Load apple graphics
    for (i=0; i<apples; i++) {
        $("#graphicdiv").append('<img alt="Apple" class="apple" src="img/red_apple.svg">');
        $("#graphicdiv .apple").css("height", applesize); // set apple size
    }
        
    // Load random number keys
    var randomnumbers = []
    while(randomnumbers.length < 3){
      var randomnumber = Math.ceil(Math.random()*level);
      if (randomnumber !== apples) {    // Don't generate the good answer
		  var found=false;
		  for (var i=0; i<randomnumbers.length; i++) {   // Don't repeat numbers
		    if(randomnumbers[i]==randomnumber) {
		    	found=true;
		    	break; 
		    }
		  }
      	  if(!found) randomnumbers[randomnumbers.length] = randomnumber;
      }
    }
    randomnumbers[randomnumbers.length] = apples;
    shuffleArray(randomnumbers);

    for(i=0; i<randomnumbers.length; i++) {
        $("#keys div").append('<button type="button" class="key">' + randomnumbers[i] + '</button>');
    }
	
	var keyflag = false;
    $(".key").on("touchstart click", function() {
     if (!keyflag) {
     keyflag = true;
     setTimeout(function(){ keyflag = false; }, 500);
		 keyN = parseInt($(this).text());
		 key = this;
		 $(key).css("background-color", "grey");
		 $("#blockingdiv").css("z-index", 99);
		 $.getJSON("locales/general." + localStorage.getItem("language") + ".json", function( locale ) {          
		    $("#text").html(genera_num(keyN));
		     if (keyN === apples) {
		       // 1. Play number
		       play(apples, function(){
		           // Reformat number text and change key color
		            $("#text").css("color", "green");
		            $(key).css("background-color", "green");
		           // Show dialog
		            $("#dialog .message").html(locale.messages.ok);
		            $("#dialog").css("background-image", "url('img/bien-hoja.png')");
		            $("#dialog").css("visibility", "visible");
		          // Play bell
		             SoundManager.clearSuccessFunc();
		             SoundManager.play("bien");
		          // Wait for user interaction or reload after 5 seconds
		            $("#blockingdiv").on("touchstart click", function(){
		                location.reload();
		            });
		            reactTimer = window.setTimeout('location.reload()', 3000);
		       });
		   } else { // keyN !== apples
		       // Play number
		       play(keyN, function(){
		           // Reformat number text and change key color
		            $("#text").css("text-decoration", "line-through");
		            $("#text").css("color", "red");
		            $(key).css("background-color", "red");
		           // Show dialog
		            $("#dialog .message").html(locale.messages.tryagain);
		            $("#dialog").css("background-image", "url('img/mal-hoja.png')");
		            $("#dialog").css("visibility", "visible");
		            // Play bell
		             SoundManager.clearSuccessFunc();
		             SoundManager.play("ohoh");
		            // Wait for user interaction or reset after 5 sec.
		            $("#blockingdiv").on("touchstart click", function() {
		            	if (!keyflag) reset();
		            });
		            reactTimer = window.setTimeout(reset, 3000);
		            return false;
		       });
		   }
		  });
	 }
    });
});

// Get and display locale strings
$.getJSON("locales/general." + localStorage.getItem("language") + ".json", function( locale ) {
    $("#txt_language").html(locale.nav.language);
    $("#txt_home").html(locale.nav.home);
    $("#question p").html(locale.questions.howmanyapples);
    $("#dialog .continue").html(locale.nav.touchtocontinue);
});
