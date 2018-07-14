/* credits.js: part of the Magic Apples web application. 
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

// Get and display locale strings
$.getJSON("locales/general." + localStorage.getItem("language") + ".json", function( locale ) {
	$("#creditslbl").html(locale.credits.creditslbl);
	$("#originalidea").html(locale.credits.originalidea);
    $("#programminganddesign").html(locale.credits.programminganddesign);
    $("#thirdparty").html(locale.credits.thirdparty);
    $("#license").html(locale.credits.license);
    $("#license3").html(locale.credits.license3);
    $("#licinfo").html(locale.credits.licinfo);
    $("#licinfo3").html(locale.credits.licinfo3);
    $("#specialthanks").html(locale.credits.specialthanks);
    $("#txt_home").html(locale.nav.home);
});

