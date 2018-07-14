/* level.js: part of the Magic Apples web application. 
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
    $("#txt_selectlvl").html(locale.levels.selectlevel);
    $("#txt_lvl1").html(locale.levels.level1);
    $("#txt_lvl2").html(locale.levels.level2);
    $("#txt_lvl3").html(locale.levels.level3);
    $("#txt_lvl1desc").html(locale.levels.level1desc);
    $("#txt_lvl2desc").html(locale.levels.level2desc);
    $("#txt_lvl3desc").html(locale.levels.level3desc);
});

$("#txt_lvl1").click( function(e){
    localStorage.setItem("level", "5");
});
$("#txt_lvl2").click( function(e){
    localStorage.setItem("level", "10");
});
$("#txt_lvl3").click( function(e){
    localStorage.setItem("level", "20");
});
