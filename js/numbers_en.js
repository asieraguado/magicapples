/* numbers_en.js: part of the Magic Apples web application. 
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

var unidades = new Array();
unidades[0] = "";
unidades[1] = "one";
unidades[2] = "two";
unidades[3] = "three";
unidades[4] = "four";
unidades[5] = "five";
unidades[6] = "six";
unidades[7] = "seven";
unidades[8] = "eight";
unidades[9] = "nine";

var decenas = new Array();
decenas[0] = "";
decenas[1] = "ten";
decenas[2] = "twenty";
decenas[3] = "thirty";
decenas[4] = "fourty";
decenas[5] = "fifty";
decenas[6] = "sixty";
decenas[7] = "seventy";
decenas[8] = "eighty";
decenas[9] = "ninety";

var centenas = new Array();
centenas[0] = "";
centenas[1] = "one hundred";
centenas[2] = "two hundred";
centenas[3] = "three hundred";
centenas[4] = "four hundred";
centenas[5] = "five hundred";
centenas[6] = "six hundred";
centenas[7] = "seven hundred";
centenas[8] = "eight hundred";
centenas[9] = "nine hundred";

var especiales = new Array(10,11,12,13,14,15,16,17,18,19);

var especial = new Array();
especial[0] = "ten";
especial[1] = "eleven";
especial[2] = "twelve";
especial[3] = "thirteen";
especial[4] = "fourteen";
especial[5] = "fifteen";
especial[6] = "sixteeen";
especial[7] = "seventeen";
especial[8] = "eighteen";
especial[9] = "nineteen";


function genera_num(numero) {

	if (especiales.indexOf(numero) !== -1) {
		return especial[especiales.indexOf(numero)];
	}
        
        decena = Math.floor(numero/10) % 10;
	unidad = numero % 10;
        centena = Math.floor(numero/100) % 10;
        
        if (centena > 0 && (unidad > 0 || decena > 0)) u_centena = " and ";
	else u_centena = "";
        
	if (centena > 0 && especiales.indexOf(numero % 100) !== -1) {
		return centenas[centena] + " and " + especial[especiales.indexOf(numero % 100)];
	}

	if (unidad !== 0 && decena > 1) u_unidad = " ";
	else u_unidad = "";
	

	return centenas[centena] + u_centena + decenas[decena] + u_unidad + unidades[unidad];
}

function playCentenas(centena, u_centena, decena, unidad, callback) {
    if (centena > 0) {
    	SoundManager.setSuccessFunc (function(){
            playDecenas(u_centena, decena, unidad, callback);
        });
        SoundManager.play("speech/en/"+centenas[centena]);
    } else {
        playDecenas(u_centena, decena, unidad, callback);
    }
}

function playDecenas(u_centena, decena, unidad, callback) {
    if (u_centena === "and") {
            SoundManager.setSuccessFunc (function(){
                playDecenas("", decena, unidad);
            });
            SoundManager.play("speech/en/and");
    } else if (decena > 0) {
            SoundManager.setSuccessFunc (function(){
                playUnidades(unidad, callback);
            });
            SoundManager.play("speech/en/"+decenas[decena]);
    } else {
            playUnidades(unidad, callback);
    }
}

function playUnidades(unidad, callback) {
    if (unidad > 0) {
	SoundManager.setSuccessFunc (function(){
		callback();
	});
	SoundManager.play("speech/en/"+unidades[unidad]);
    } else {
    	callback();
    }
}

function play(numero, callback) {   // callback: ÚLTIMA SUCCESSFUNC COMO PARÁMETRO
	if (especiales.indexOf(numero) !== -1) {
            SoundManager.setSuccessFunc (function(){
                callback();
            });
            SoundManager.play("speech/en/"+especial[especiales.indexOf(numero)]);
            return;
	}
        
        decena = Math.floor(numero/10) % 10;
	unidad = numero % 10;
        centena = Math.floor(numero/100) % 10;
        
        if (centena > 0 && (unidad > 0 || decena > 0)) u_centena = "and";
	else u_centena = "";
        
	if (centena > 0 && especiales.indexOf(numero % 100) !== -1) {
            // TODO This Case
            SoundManager.play("pap");
            return;
	}
	
        playCentenas(centena, u_centena, decena, unidad, callback);
}

function manzanas(numero) {
        return genera_num(numero);
}
