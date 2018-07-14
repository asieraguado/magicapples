/* magictree.js: part of the Magic Apples web application. 
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

function gotocount() {
	document.location="count.html";
}

// Total apples fallen
var count = 0;

$("#treeapple").draggable({
     scroll: false,
     drag: function() { if ($(this).attr("id") === "treeapple") $(this).attr("id", "movedtreeapple"); }
});



$("#container").on("touchend mouseup", ".apple", function(e) {
    e.preventDefault();
    if ($(this).attr("id") === "treeapple" || $(this).attr("id") === "movedtreeapple") {
        count++;
        $("#num").html(count);
        $("#textnum").html(genera_num(count));
        play(count, function() {
        	if (count < level) {
		    	$("#container").append('<img id="treeapple" alt="Touch Me" class="apple" src="img/red_apple.svg">');
		        $("#treeapple").draggable({
		            scroll: false,
		            drag: function() { if ($(this).attr("id") === "treeapple") $(this).attr("id", "movedtreeapple"); }
		        });
		    } else {
		       $.getJSON("locales/general." + localStorage.getItem("language") + ".json", function(locale) {  
		           // Show dialog
		            $("#dialog .message").html(locale.messages.letscount);
		            $("#dialog").css("background-image", "url('img/bien-hoja.png')");
		            $("#dialog").css("visibility", "visible");
		          // Play bell
		             SoundManager.clearSuccessFunc();
		             SoundManager.play("bien");
		          // Reload after 5 seconds
		            reactTimer = window.setTimeout('gotocount()', 3000);
		      });
		    }
        });
        if ($(this).attr("id") === "treeapple") makeFall($(this)); else simpleFall($(this));
        $(this).removeAttr("id");
    } else {
        simpleFall($(this));
    }
    
});

// Get and display locale strings
$.getJSON("locales/general." + localStorage.getItem("language") + ".json", function( locale ) {
    $("#txt_language").html(locale.nav.language);
    $("#txt_home").html(locale.nav.home);
});
