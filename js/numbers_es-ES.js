/* numbers_es-ES.js: part of the Magic Apples web application. 
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
unidades[1] = "una";
unidades[2] = "dos";
unidades[3] = "tres";
unidades[4] = "cuatro";
unidades[5] = "cinco";
unidades[6] = "seis";
unidades[7] = "siete";
unidades[8] = "ocho";
unidades[9] = "nueve";

var decenas = new Array();
decenas[0] = "";
decenas[1] = "dieci";
decenas[2] = "veinti";
decenas[3] = "treinta";
decenas[4] = "cuarenta";
decenas[5] = "cincuenta";
decenas[6] = "sesenta";
decenas[7] = "setenta";
decenas[8] = "ochenta";
decenas[9] = "noventa";

var centenas = new Array();
centenas[0] = "";
centenas[1] = "ciento ";
centenas[2] = "doscientas ";
centenas[3] = "trescientas ";
centenas[4] = "cuatrocientas ";
centenas[5] = "quinientas ";
centenas[6] = "seiscientas ";
centenas[7] = "setecientas ";
centenas[8] = "ochocientas ";
centenas[9] = "novecientas ";

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


function genera_num(numero) {

	if (especiales.indexOf(numero) !== -1) {
		return especial[especiales.indexOf(numero)];
	}
	
	centena = Math.floor(numero/100) % 10;
	if (centena > 0 && especiales.indexOf(numero % 100) !== -1) {
		return centenas[centena] + especial[especiales.indexOf(numero % 100)];
	}

	decena = Math.floor(numero/10) % 10;
	unidad = numero % 10;
	if (unidad !== 0 && decena > 2) u_unidad = " y ";
	else u_unidad = "";
	

	return centenas[centena] + decenas[decena] + u_unidad + unidades[unidad];

}


function playCentenas(centena, decena, unidad, u_unidad, callback) {
    if (centena > 0) {
    	SoundManager.setSuccessFunc (function(){
            playDecenas(decena, unidad, u_unidad, callback);
        });
        SoundManager.play("speech/es-ES/"+centenas[centena].replace(" ",""));
    } else {
        playDecenas(decena, unidad, u_unidad, callback);
    }
}

function playDecenas(decena, unidad, u_unidad, callback) {
    if (decena > 0) {
            SoundManager.setSuccessFunc (function(){
                playUnidades(unidad, u_unidad, callback);
            });
            SoundManager.play("speech/es-ES/"+decenas[decena]);
    } else {
        playUnidades(unidad, u_unidad, callback);
    }
}

function playUnidades(unidad, u_unidad, callback) {
    if (u_unidad === "y") {
        SoundManager.setSuccessFunc (function(){
            playUnidades(unidad, "", callback);
        });
        SoundManager.play("speech/es-ES/y");
    } else {
        SoundManager.setSuccessFunc (function(){
            callback();
        });
        SoundManager.play("speech/es-ES/"+unidades[unidad]);
    }
}

function play(numero, callback) {
       
	if (especiales.indexOf(numero) !== -1) {
            SoundManager.setSuccessFunc (function(){
                callback();
            });
            SoundManager.play("speech/es-ES/"+especial[especiales.indexOf(numero)]);
            return;
	}
        
        decena = Math.floor(numero/10) % 10;
	unidad = numero % 10;
        centena = Math.floor(numero/100) % 10;
        
	if (centena > 0 && especiales.indexOf(numero % 100) !== -1) {
            // TODO This Case
            SoundManager.play("pap");
            return;
	}

	if (unidad !== 0 && decena > 2) u_unidad = "y";
	else u_unidad = "";
	
        playCentenas(centena, decena, unidad, u_unidad, callback);
}

function manzanas(numero) {
        return genera_num(numero);
}
