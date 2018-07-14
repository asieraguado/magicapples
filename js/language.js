/* language.js: part of the Magic Apples web application. 
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

$("#flag-es").click( function(e){
    localStorage.setItem("language", "es-ES");
    localStorage.setItem("langset", 1);
});
$("#flag-eus").click( function(e){
    localStorage.setItem("language", "eus");
    localStorage.setItem("langset", 1);
});
$("#flag-en").click( function(e){
    localStorage.setItem("language", "en");
    localStorage.setItem("langset", 1);
});
