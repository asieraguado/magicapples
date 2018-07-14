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

function getXPosition(element) {
        return $(element).position()['left'] - $(element).parent().position()['left'];
}

function getFallDistance(element) {
        return ($(element).parent().outerHeight() - getYPosition(element)) - $(element).outerHeight();
}
function makeFall(element){
        $(element).removeAttr("id");
        var time = 1250;
        var floordistance = getFallDistance(element);
        var objects = 0;
        marginLeft = parseInt((count%2 !== 0 ? -0.45 : 0.32) * $(document).width() * Math.random());
        do {
		    obs = document.elementFromPoint( getXPosition(element) + marginLeft + $(element).width()/2, $(element).parent().outerHeight() - objects - $(element).height()/2 );
	  		if (obs.nodeName == "IMG" && !$(obs).is(element)) {
	  			objects += $(obs).height();
	  		}
	  	}
	  	while (obs.nodeName == "IMG" && !$(obs).is(element));
	  	if (objects > 0) objects -= $(element).height()/4;
        $(element).stop().animate({
                marginTop: (floordistance - objects) + "px",
                marginLeft: marginLeft + "px"
        }, {
                duration: time,
                easing: "easeOutBounce"
        });
}

function simpleFall(element){
        $(element).removeAttr("id");
        var time = 1250;
        var floordistance = getFallDistance(element);
        var objects = 0;
        do {
		    obs = document.elementFromPoint( getXPosition(element) + $(element).width()/2, $(element).parent().outerHeight() - objects - $(element).height()/2 );
	  		if (obs.nodeName == "IMG" && !$(obs).is(element)) {
	  			objects += $(obs).height();
	  		}
	  	}
	  	while (obs.nodeName == "IMG" && !$(obs).is(element));
	  	if (objects > 0) objects -= $(element).height()/4;
        $(element).stop().animate({
                marginTop: (floordistance - objects) + "px"
        }, {
                duration: time,
                easing: "easeOutBounce"
        });
}
