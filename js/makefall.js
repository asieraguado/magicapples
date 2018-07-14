/* makefall.js: part of the Magic Apples web application. 
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

// Functions for fall animation
function getYPosition(element) {
        return $(element).position()['top'] - $(element).parent().position()['top'];
}
function getFallDistance(element) {
        return ($(element).parent().outerHeight() - getYPosition(element)) - $(element).outerHeight();
}
function makeFall(element){
        $(element).removeAttr("id");
        var time = 1250;
        marginLeft = parseInt((count%2 !== 0 ? -0.45 : 0.32) * $(document).width() * Math.random());
        $(element).stop().animate({
                marginTop: getFallDistance($(element)) + "px",
                marginLeft: marginLeft + "px"
        }, {
                duration: time,
                easing: "easeOutBounce"
        });
}

function simpleFall(element){
        $(element).removeAttr("id");
        var time = 1250;
        $(element).stop().animate({
                marginTop: getFallDistance($(element)) + "px"
        }, {
                duration: time,
                easing: "easeOutBounce"
        });
}
