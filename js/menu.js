/* menu.js: part of the Magic Apples web application. 
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

switch (parseInt(localStorage.getItem("level"))) {
	case null:
		level = 1;
	break;
	case 5:
		level = 1;
	break;
	case 10:
		level = 2;
	break;
	case 20:
		level = 3;
	break;
	default:
		level = 1;	
}

// Get and display locale strings
$.getJSON("locales/general." + localStorage.getItem("language") + ".json", function( locale ) {
    $("#txt_language").html(locale.nav.language);
    //$("#txt_home").html(locale.nav.home);
    $("#txt_exit").html(locale.menu.exit);
    $("#txt_magictree").html(locale.menu.magictree);
    $("#txt_countingapples").html(locale.menu.counting);
    $("#txt_firstsums").html(locale.menu.firstsums);
    $("#txt_level").html(locale.menu.level + level);
    $("#txt_credits").html(locale.menu.credits);
    $("#title").html(locale.app.name);
});

$("#txt_language").click(function(){
    localStorage.setItem("langset", 0);
    document.location = "index.html";
});

$("#txt_exit").click(function(){
    window.close();  //generic
    //navigator.app.exitApp();  // phonegap
});
