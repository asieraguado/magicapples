/* numbers_eus.js: part of the Magic Apples web application. 
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
unidades[1] = "bat";
unidades[2] = "bi";
unidades[3] = "hiru";
unidades[4] = "lau";
unidades[5] = "bost";
unidades[6] = "sei";
unidades[7] = "zazpi";
unidades[8] = "zortzi";
unidades[9] = "bederatzi";
unidades[10] = "hamar";
unidades[11] = "hamaika";
unidades[12] = "hamabi";
unidades[13] = "hamahiru";
unidades[14] = "hamalau";
unidades[15] = "hamabost";
unidades[16] = "hamasei";
unidades[17] = "hamazazpi";
unidades[18] = "hemezortzi";
unidades[19] = "hemeretzi";

// En realidad veintenas, hasta cien
var decenas = new Array();
decenas[0] = "";
decenas[1] = "hogei";
decenas[2] = "berrogei";
decenas[3] = "hirurogei";
decenas[4] = "laurogei";

var centenas = new Array();
centenas[0] = "";
centenas[1] = "ehun";
centenas[2] = "berrehun";
centenas[3] = "hirurehun";
centenas[4] = "laurehun";
centenas[5] = "bostehun";
centenas[6] = "seiehun";
centenas[7] = "zazpiehun";
centenas[8] = "zortziehun";
centenas[9] = "bederatziehun";

/* Por suerte de estos no hay

var especiales = new Array(10,11,12,13,14,15,20,100);

var especial = new Array();
especial[0] = "diez";
especial[1] = "once";
especial[2] = "doce";
especial[3] = "trece";
especial[4] = "catorce";
especial[5] = "quince";
especial[6] = "veinte";
especial[7] = "cien";
*/

function genera_num(numero) {


	centena = Math.floor(numero/100) % 10;
	decena = Math.floor(numero/20) % 5;
	unidad = numero % 20;

	if (centena > 0 && (unidad > 0 || decena > 0)) u_centena = " eta ";
	else u_centena = "";

	if (unidad > 0 && decena > 0) u_unidad = "ta ";
	else u_unidad = "";

	return centenas[centena] + u_centena + decenas[decena] + u_unidad + unidades[unidad];

}

function playCentenas(centena, u_centena, decena, unidad, u_unidad, callback) {
    if (centena > 0) {
        SoundManager.setSuccessFunc (function(){
            playDecenas(u_centena, decena, unidad, u_unidad, callback);
        });
        SoundManager.play("speech/eus/"+centenas[centena]);       
    } else {
        playDecenas(u_centena, decena, unidad, u_unidad, callback);
    }
}

function playDecenas(u_centena, decena, unidad, u_unidad, callback) {
    
    if (u_centena === "eta") {
            SoundManager.setSuccessFunc (function(){
                playDecenas("", decena, unidad, u_unidad, callback);
            });
            SoundManager.play("speech/eus/eta");
    } else if (decena > 0) {
                SoundManager.setSuccessFunc (function(){
                    playUnidades(unidad, callback);
                });
                SoundManager.play("speech/eus/"+decenas[decena]+u_unidad);
    } else {
            playUnidades(unidad, callback);
    }
    
}

function playUnidades(unidad, callback) {
	if (unidad > 0) {
		SoundManager.setSuccessFunc (function(){
		    callback();
		});
		SoundManager.play("speech/eus/"+unidades[unidad]);
	} else {
		callback();
	}
}

function play(numero, callback) {       
	unidad = numero % 20;
        decena = Math.floor(numero/20) % 5;
        centena = Math.floor(numero/100) % 10;
        
        if (centena > 0 && (unidad > 0 || decena > 0)) u_centena = "eta";
	else u_centena = "";
        
	if (unidad !== 0 && decena > 0) u_unidad = "ta";
	else u_unidad = "";
	
        playCentenas(centena, u_centena, decena, unidad, u_unidad, callback);
}
function manzanas(numero) {
        return genera_num(numero);
}
