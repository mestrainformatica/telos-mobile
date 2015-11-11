// jCompany 2.5.1 : Arquivo Javascript espec?fico da aplica??o
// ? inserido e disponibilizado em todas as p?ginas

//FUN??O QUE DESTACA A LINHA EM QUE E PASSADO O MOUSE NAS TELAS DE LISTA
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//muda a cor da linha
//onmouseover="CCA(this,1)" onmouseout="CCA(this,0)"

function CCA(CB,N)
{
	if (N == 1)
	//if (CB.checked)
		hL(CB);
	else
		dL(CB);
}

//Formata valor monet?rio
function FormataValor(campo,tammax,teclapres) {
var tecla = teclapres.keyCode;

vr = String.fromCharCode(campo.value);
vr = vr.replace( "/", "" );
vr = vr.replace( "/", "" );
vr = vr.replace( ",", "" );
vr = vr.replace( ".", "" );
vr = vr.replace( ".", "" );
vr = vr.replace( ".", "" );
vr = vr.replace( ".", "" );
tam = vr.length;
if (tam < tammax && tecla != 8){ tam = vr.length + 1; }
if (tecla == 8 ){ tam = tam - 1; }
if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ){

		if ((tam > 2) && (tam <= 4)){
			campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ); 
			}
		}
}


//funciona em conjundo com a CCA
function hL(e){
//while (E.tagName!="TR")
//	{E=E.parentElement;}
//E.className = "td_lista_a";
    {
	var r = null;
	if (e.parentNode && e.parentNode.parentNode) {
	    r = e.parentNode.parentNode;
	}
	else if (e.parentElement && e.parentElement.parentElement) {
	    r = e.parentElement.parentElement;
	}
	if (r) {
		r.className = "td_lista_a";
	}
    }
}
//funciona em conjundo com a CCA
function dL(e){
//while (E.tagName!="TR")
//	{E=E.parentElement;}
//E.className = "td_lista_b";
    {
	var r = null;
	if (e.parentNode && e.parentNode.parentNode) {
	    r = e.parentNode.parentNode;
	}
	else if (e.parentElement && e.parentElement.parentElement) {
	    r = e.parentElement.parentElement;
	}
	if (r) {
		r.className = "td_lista_b";
	}
    }
}

//***************************************************************************************
//FUNCAO PARA ENVIAR A PAGINA SOLICITADA AO SEU DESTINO
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onClick="DST('url da pagina')"

function DST(destino){
document.location.href=destino;
}

//***************************************************************************************
//FUNCAO PARA MASCARAR CAMPOS MES/ANO
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onkeypress="return mascComp(this, event)" onblur="validComp(this)" 

function mascComp(objeto, e){
	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1){ 
		return false;  // Not a valid key		
		}
		else{
			if (objeto.value.indexOf("/") == -1 && objeto.value.length > 7){ objeto.value = ""; }
			if (objeto.value.length == 2){
			objeto.value += "/";
		}
	}
}


//***************************************************************************************
//FUNCAO PARA VALIDAR CAMPOS MES/ANO 
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onblur="validComp(this)" 

function validComp(Campo){
	var mes, ano
	numer = Campo.value;		
	if(numer != ""){
		if(numer.length < 7 && numer.length >= 1){
			//alert("M?s/Ano inv?lido!");
			Campo.value = "";
			Campo.focus();
			return false;
		}	
		if(numer.length == 7){			
			mes = parseFloat(numer.substring(0,2));
			ano = parseFloat(numer.substring(3,7));
	
			if(mes < 1 || mes > 12 || ano < 1900){
			//alert("M?s/Ano inv?lido!");
				Campo.value = "";
				Campo.focus();
				return false;
			}	
		}
		return true;
	}
}

function validComp13Mes(Campo){
	var mes, ano
	numer = Campo.value;		
	if(numer != ""){
		if(numer.length < 7 && numer.length >= 1){
			//alert("M?s/Ano inv?lido!");
			Campo.value = "";
			Campo.focus();
			return false;
		}	
		if(numer.length == 7){			
			mes = parseFloat(numer.substring(0,2));
			ano = parseFloat(numer.substring(3,7));
	
			if(mes < 1 || mes > 13 || ano < 1900){
			//alert("M?s/Ano inv?lido!");
				Campo.value = "";
				Campo.focus();
				return false;
			}	
		}
		return true;
	}
}



//***************************************************************************************
//FUNCAO PARA MASCARAR CAMPOS HH:MM
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onkeypress="return mascHora(this, event)" onblur="validHora(this)" 

function mascaraHora(objeto, e){
	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1){ 
		return false;  // Not a valid key		
		}
		else{
			if (objeto.value.indexOf(":") == -1 && objeto.value.length > 5){ objeto.value = ""; }
			if (objeto.value.length == 2){
			objeto.value += ":";
		}
	}
}


//***************************************************************************************
//FUNCAO PARA VALIDAR CAMPOS HH:MM 
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onblur="validHora(this)" 

function validaHora(Campo){
	var hora, minuto

	numer = Campo.value;
		
	if(numer != ""){
		if(numer.length < 5 && numer.length >= 1){
			alert("Hora inv?lida!");
			Campo.value = "";
			Campo.focus();
			return false;
		}
	
		if(numer.length == 5){
			
			hora = parseFloat(numer.substring(0,2));
			minuto = parseFloat(numer.substring(3,5));
	
			if(hora > 23 || minuto > 59){
				alert("Hora inv?lida!");
				Campo.value = "";
				Campo.focus();
				return false;
			}
	
		}
		return true;
	}
}


//FUNCAO PARA NEGAR A DIGITA??O DE CARACTERES N?O NUMERICOS EXETO O "."
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onkeypress="return sonumero(event)"

function sonumero(e) {
var key = '';
var strCheck = '0123456789,';
var whichCode = (window.Event) ? e.which : e.keyCode;
if (whichCode == 13) return true;  // Enter
if (whichCode == 8) return true;  // BackSpace
if (whichCode == 0) return true;  // Del
key = String.fromCharCode(whichCode);  // Get key value from key code
if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
}

function sonumeroMesmo(e) {
var key = '';
var strCheck = '0123456789';
var whichCode = (window.Event) ? e.which : e.keyCode;
if (whichCode == 13) return true;  // Enter
if (whichCode == 8) return true;  // BackSpace
if (whichCode == 0) return true;  // Del
key = String.fromCharCode(whichCode);  // Get key value from key code
if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
}


//***************************************************************************************
//FUNCAO PARA MASCARAR CONTA PRINCIPAL (X.X.X.X.X.X.X.XX.XX.X)
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onkeypress="return mascConta(this, event)"

function mascConta(obj, e){
	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1){ 
		return false;  // Not a valid key		
	}else{
		if (obj.value.indexOf(".") == -1 && obj.value.length > 21){ obj.value = ""; }
			if (obj.value.length == 1){obj.value += ".";}
			if (obj.value.length == 3){obj.value += ".";}
			if (obj.value.length == 5){obj.value += ".";}
			if (obj.value.length == 7){obj.value += ".";}
			if (obj.value.length == 9){obj.value += ".";}
			if (obj.value.length == 11){obj.value += ".";}
			if (obj.value.length == 13){obj.value += ".";}
			if (obj.value.length == 16){obj.value += ".";}
			if (obj.value.length == 19){obj.value += ".";}		
	}

}


//***************************************************************************************
//FUNCAO PARA COMPLETAR CONTA PRINCIPAL (X.X.X.X.X.X.X.XX.XX.X)
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
// onblur="compConta(this)"


function compConta(obj)
{
var numero;
numero = obj.value;
resultado = obj.value;
	if(obj.value.length > 0){
		if(numero.substr(0,1) == ""){resultado = "0."}else{resultado = numero.substr(0,1) + "."}
		if(numero.substr(2,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(2,1) + "."}
		if(numero.substr(4,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(4,1) + "."}
		if(numero.substr(6,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(6,1) + "."}
		if(numero.substr(8,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(8,1) + "."}
		if(numero.substr(10,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(10,1) + "."}
		if(numero.substr(12,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(12,1) + "."}
		if(numero.substr(14,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(14,1)}
		if(numero.substr(15,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(15,1) + "."}
		if(numero.substr(17,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(17,1)}
		if(numero.substr(18,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(17,1) + "."}
		if(numero.substr(20,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(20,1)}
	}
obj.value = resultado;
}




//FUNCAO QUE LIMITA A DIGITA??O EM UM TEXTAREA
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onkeydown="textomaximo(this,255)" onkeyup="textomaximo(this,255)"

function textomaximo(field, maxlimit) {
if (field.value.length > maxlimit) 
field.value = field.value.substring(0, maxlimit);
}


//***************************************************************************************
//FUNCAO PARA FORMATAR E VALIDAR DATA	
/* 
 * @author: S?rgio Chaves - Mestra Inform?tica 2003 
*/
//onfocus="javascript:vDateType='3'" onkeyup="DateFormat(this,this.value,event,false)" onblur="DateFormat(this,this.value,event,true)"

var isNav4 = false, isNav5 = false, isIE4 = false
var strSeperator = "/"; 

var vDateType = 3; // Formato Global 
//                1 = mm/dd/yyyy
//                2 = yyyy/dd/mm  
//                3 = dd/mm/yyyy

  var vYearType = 4; //Set to 2 or 4 for number of digits in the year for Netscape
  var vYearLength = 2; // Set to 4 if you want to force the user to enter 4 digits for the year before validating.
  var err = 0; // Set the error code to a default of zero
  if(navigator.appName == "Netscape") { 
  if (navigator.appVersion < "5") {
  isNav4 = true;
  isNav5 = false;
}
else
  if (navigator.appVersion > "4") {
    isNav4 = false;
    isNav5 = true;
  }
}
else {
  isIE4 = true;
}
function DateFormat(vDateName, vDateValue, e, dateCheck) {

// vDateName = object name
// vDateValue = value in the field being checked
// e = event
// dateCheck 
// True  = Verify that the vDateValue is a valid date
// False = Format values being entered into vDateValue only
// vDateType
// 1 = mm/dd/yyyy
// 2 = yyyy/mm/dd
// 3 = dd/mm/yyyy
//Enter a tilde sign for the first number and you can check the variable information.
if (vDateValue == "~") {
alert("AppVersion = "+navigator.appVersion+" \nNav. 4 Version = "+isNav4+" \nNav. 5 Version = "+isNav5+" \nIE Version = "+isIE4+" \nYear Type = "+vYearType+" \nDate Type = "+vDateType+" \nSeparator = "+strSeperator);
vDateName.value = "";
vDateName.focus();
return true;
}
var whichCode = (window.Event) ? e.which : e.keyCode;
// Check to see if a seperator is already present.
// bypass the date if a seperator is present and the length greater than 8
if (vDateValue.length > 8 && isNav4) {
if ((vDateValue.indexOf("-") >= 1) || (vDateValue.indexOf("/") >= 1))
return true;
}
//Eliminate all the ASCII codes that are not valid
var alphaCheck = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/-";
if (alphaCheck.indexOf(vDateValue) >= 1) {
if (isNav4) {
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
}
else {
vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
return false;
   }
}
if (whichCode == 8) //Ignore the Netscape value for backspace. IE has no value
return false;
else {
//Create numeric string values for 0123456789/
//The codes provided include both keyboard and keypad values
var strCheck = '47,48,49,50,51,52,53,54,55,56,57,58,59,95,96,97,98,99,100,101,102,103,104,105';
if (strCheck.indexOf(whichCode) != -1) {
if (isNav4) {
if (((vDateValue.length < 6 && dateCheck) || (vDateValue.length == 7 && dateCheck)) && (vDateValue.length >=1)) {
alert("Data Inv?lida !");
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
}
if (vDateValue.length == 6 && dateCheck) {
var mDay = vDateName.value.substr(2,2);
var mMonth = vDateName.value.substr(0,2);
var mYear = vDateName.value.substr(4,4)
//Turn a two digit year into a 4 digit year
if (mYear.length == 2 && vYearType == 4) {
var mToday = new Date();
//If the year is greater than 30 years from now use 19, otherwise use 20
var checkYear = mToday.getFullYear() + 30; 
var mCheckYear = '20' + mYear;
if (mCheckYear >= checkYear)
mYear = '19' + mYear;
else
mYear = '20' + mYear;
}
var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
if (!dateValid(vDateValueCheck)) {
alert("Data Inv?lida !");
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
}
return true;
}
else {
// Reformat the date for validation and set date type to a 1
if (vDateValue.length >= 8  && dateCheck) {
if (vDateType == 1) // mmddyyyy
{
var mDay = vDateName.value.substr(2,2);
var mMonth = vDateName.value.substr(0,2);
var mYear = vDateName.value.substr(4,4)
vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
}
if (vDateType == 2) // yyyymmdd
{
var mYear = vDateName.value.substr(0,4)
var mMonth = vDateName.value.substr(4,2);
var mDay = vDateName.value.substr(6,2);
vDateName.value = mYear+strSeperator+mMonth+strSeperator+mDay;
}
if (vDateType == 3) // ddmmyyyy
{
var mMonth = vDateName.value.substr(2,2);
var mDay = vDateName.value.substr(0,2);
var mYear = vDateName.value.substr(4,4)
vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
}
//Create a temporary variable for storing the DateType and change
//the DateType to a 1 for validation.
var vDateTypeTemp = vDateType;
vDateType = 1;
var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
if (!dateValid(vDateValueCheck)) {
alert("Data Inv?lida !");
vDateType = vDateTypeTemp;
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
}
vDateType = vDateTypeTemp;
return true;
}
else {
if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
alert("Data Inv?lida !");
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
         }
      }
   }
}
else {
// Non isNav Check
if (((vDateValue.length < 8 && dateCheck) || (vDateValue.length == 9 && dateCheck)) && (vDateValue.length >=1)) {
alert("Data Inv?lida !");
vDateName.value = "";
vDateName.focus();
return true;
}
// Reformat date to format that can be validated. mm/dd/yyyy
if (vDateValue.length >= 8 && dateCheck) {
// Additional date formats can be entered here and parsed out to
// a valid date format that the validation routine will recognize.
if (vDateType == 1) // mm/dd/yyyy
{
var mMonth = vDateName.value.substr(0,2);
var mDay = vDateName.value.substr(3,2);
var mYear = vDateName.value.substr(6,4)
}
if (vDateType == 2) // yyyy/mm/dd
{
var mYear = vDateName.value.substr(0,4)
var mMonth = vDateName.value.substr(5,2);
var mDay = vDateName.value.substr(8,2);
}
if (vDateType == 3) // dd/mm/yyyy
{
var mDay = vDateName.value.substr(0,2);
var mMonth = vDateName.value.substr(3,2);
var mYear = vDateName.value.substr(6,4)
}
if (vYearLength == 4) {
if (mYear.length < 4) {
alert("Data Inv?lida !");
vDateName.value = "";
vDateName.focus();
return true;
   }
}
// Create temp. variable for storing the current vDateType
var vDateTypeTemp = vDateType;
// Change vDateType to a 1 for standard date format for validation
// Type will be changed back when validation is completed.
vDateType = 1;
// Store reformatted date to new variable for validation.
var vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
if (mYear.length == 2 && vYearType == 4 && dateCheck) {
//Turn a two digit year into a 4 digit year
var mToday = new Date();
//If the year is greater than 30 years from now use 19, otherwise use 20
var checkYear = mToday.getFullYear() + 30; 
var mCheckYear = '20' + mYear;
if (mCheckYear >= checkYear)
mYear = '19' + mYear;
else
mYear = '20' + mYear;
vDateValueCheck = mMonth+strSeperator+mDay+strSeperator+mYear;
// Store the new value back to the field.  This function will
// not work with date type of 2 since the year is entered first.
if (vDateTypeTemp == 1) // mm/dd/yyyy
vDateName.value = mMonth+strSeperator+mDay+strSeperator+mYear;
if (vDateTypeTemp == 3) // dd/mm/yyyy
vDateName.value = mDay+strSeperator+mMonth+strSeperator+mYear;
} 
if (!dateValid(vDateValueCheck)) {
alert("Data Inv?lida !");
vDateType = vDateTypeTemp;
vDateName.value = "";
vDateName.focus();
return true;
}
vDateType = vDateTypeTemp;
return true;
}
else {
if (vDateType == 1) {
if (vDateValue.length == 2) {
vDateName.value = vDateValue+strSeperator;
}
if (vDateValue.length == 5) {
vDateName.value = vDateValue+strSeperator;
   }
}
if (vDateType == 2) {
if (vDateValue.length == 4) {
vDateName.value = vDateValue+strSeperator;
}
if (vDateValue.length == 7) {
vDateName.value = vDateValue+strSeperator;
   }
} 
if (vDateType == 3) {
if (vDateValue.length == 2) {
vDateName.value = vDateValue+strSeperator;
}
if (vDateValue.length == 5) {
vDateName.value = vDateValue+strSeperator;
   }
}
return true;
   }
}
if (vDateValue.length == 10&& dateCheck) {
if (!dateValid(vDateName)) {
// Un-comment the next line of code for debugging the dateValid() function error messages
//alert(err);  
alert("Data Inv?lida !");
vDateName.focus();
vDateName.select();
   }
}
return false;
}
else {
// If the value is not in the string return the string minus the last
// key entered.
if (isNav4) {
vDateName.value = "";
vDateName.focus();
vDateName.select();
return false;
}
else
{
vDateName.value = vDateName.value.substr(0, (vDateValue.length-1));
return false;
         }
      }
   }
}
function dateValid(objName) {
var strDate;
var strDateArray;
var strDay;
var strMonth;
var strYear;
var intday;
var intMonth;
var intYear;
var booFound = false;
var datefield = objName;
var strSeparatorArray = new Array("-"," ","/",".");
var intElementNr;
// var err = 0;
var strMonthArray = new Array(12);
strMonthArray[0] = "Jan";
strMonthArray[1] = "Feb";
strMonthArray[2] = "Mar";
strMonthArray[3] = "Apr";
strMonthArray[4] = "May";
strMonthArray[5] = "Jun";
strMonthArray[6] = "Jul";
strMonthArray[7] = "Aug";
strMonthArray[8] = "Sep";
strMonthArray[9] = "Oct";
strMonthArray[10] = "Nov";
strMonthArray[11] = "Dec";
//strDate = datefield.value;
strDate = objName;
if (strDate.length < 1) {
return true;
}
for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
strDateArray = strDate.split(strSeparatorArray[intElementNr]);
if (strDateArray.length != 3) {
err = 1;
return false;
}
else {
strDay = strDateArray[0];
strMonth = strDateArray[1];
strYear = strDateArray[2];
}
booFound = true;
   }
}
if (booFound == false) {
if (strDate.length>5) {
strDay = strDate.substr(0, 2);
strMonth = strDate.substr(2, 2);
strYear = strDate.substr(4);
   }
}
//Adjustment for short years entered
if (strYear.length == 2) {
strYear = '20' + strYear;
}
strTemp = strDay;
strDay = strMonth;
strMonth = strTemp;
intday = parseInt(strDay, 10);
if (isNaN(intday)) {
err = 2;
return false;
}
intMonth = parseInt(strMonth, 10);
if (isNaN(intMonth)) {
for (i = 0;i<12;i++) {
if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
intMonth = i+1;
strMonth = strMonthArray[i];
i = 12;
   }
}
if (isNaN(intMonth)) {
err = 3;
return false;
   }
}
intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) {
	err = 4;
	return false;
	//TODO : ANDR? :VALIDAR DATAS MENORES QUE 1900
	} else if (intYear < 1800) {
		err = 4;
		return false;
	}
if (intMonth>12 || intMonth<1) {
err = 5;
return false;
}
if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
err = 6;
return false;
}
if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
err = 7;
return false;
}
if (intMonth == 2) {
if (intday < 1) {
err = 8;
return false;
}
if (LeapYear(intYear) == true) {
if (intday > 29) {
err = 9;
return false;
   }
}
else {
if (intday > 28) {
err = 10;
return false;
      }
   }
}
return true;
}

	function LeapYear(intYear) {
	  if (intYear % 100 == 0) {
	    if (intYear % 400 == 0) { 
	      return true;
	    }
	  }else {
	    if ((intYear % 4) == 0) { 
	      return true;
	    }
  	  }
	  return false;
	}

// Fun??o para preencher com "NULO" os campos do subdetalhe deixados em branco
	function preencheNulo() {
	
		var qtde = document.forms[0].elements.length;
	
		for (var i = 0; i < qtde; i++) {
			var name = document.forms[0].elements[i].name;
			var nomeSubdetalhe = name.substring(0,10);
	
			if (nomeSubdetalhe == "subDetalhe" && document.forms[0].elements[i].value == "") {
				document.forms[0].elements[i].value = "NULO";
			}
		}
	
	}

	function mascLConta(obj, e){
		var key = '';
		var strCheck = '0123456789';
		var whichCode = (window.Event) ? e.which : e.keyCode;
		if (whichCode == 13) return true;  // Enter
		if (whichCode == 8) return true;  // BackSpace
		if (whichCode == 0) return true;  // Del
		key = String.fromCharCode(whichCode);  // Get key value from key code
		if (strCheck.indexOf(key) == -1){ 
			return false;  // Not a valid key		
		}else{
			if (obj.value.indexOf(".") == -1 && obj.value.length > 21){ obj.value = ""; }
				if (obj.value.length == 1){obj.value += ".";}
				if (obj.value.length == 3){obj.value += ".";}
				if (obj.value.length == 5){obj.value += ".";}
				if (obj.value.length == 7){obj.value += ".";}
				if (obj.value.length == 9){obj.value += ".";}
				if (obj.value.length == 11){obj.value += ".";}
				if (obj.value.length == 13){obj.value += ".";}
				if (obj.value.length == 16){obj.value += ".";}
				if (obj.value.length == 19){obj.value += ".";}		
		}
	
	}

// FUN??ES PARA FORMATA??O DE CONTA
// AUTOR: Wilson
	function compLConta(obj){
	var numero;
	numero = obj.value;
	alert(numero);
	resultado = obj.value;
		if(obj.value.length > 0){
			if (obj.value.length < 20) {
			if(numero.substr(0,1) == ""){resultado = "0."}else{resultado = numero.substr(0,1) + "."}
			if(numero.substr(2,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(2,1) + "."}
			if(numero.substr(4,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(4,1) + "."}
			if(numero.substr(6,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(6,1) + "."}
			if(numero.substr(8,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(8,1) + "."}
			if(numero.substr(10,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(10,1) + "."}
			if(numero.substr(12,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(12,1) + "."}
			if(numero.substr(14,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(14,1)}
			if(numero.substr(15,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(15,1) + "."}
			if(numero.substr(17,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(17,1)}
			if(numero.substr(18,1) == ""){resultado = resultado +"0."}else{resultado = resultado + numero.substr(17,1) + "."}
			if(numero.substr(20,1) == ""){resultado = resultado +"0"}else{resultado = resultado + numero.substr(20,1)}
			}
		}
	obj.value = resultado;
	}	

	function getIndex(obj) {
		myForm = obj.form.name;
	    for (var i=0;i<eval("document."+myForm+".elements.length");i++)
	        if (obj == eval("document."+myForm+".elements[i]"))
	            return i;
	    return -1;
	}

	function dchis(obj) {
	   //alert(getIndex(obj));
	    myForm = obj.form.name;
	    eval("document."+myForm+".elements[getIndex(obj)+1].value=obj.value");
	}

// Ajusta zeros a esquerda quando o obj > zeros. tam ? o tamanho maximo da string
	function ajustaZerosEsquerda(obj,tam){
		if (obj.value.length > 0){
		    dif= tam - obj.value.length;
		    temp = "";
		    for (i=0; i<dif; i++) {
		       temp += "0";
		    }
		    obj.value = temp + obj.value;
	    }
	}

	function formataMonetario(fld, e, milSep, decSep) {
		var sep = 0;
		var key = '';
		var i = j = 0;
		var len = len2 = 0;
		var strCheck = '0123456789';
		var aux = aux2 = '';
		milSep = typeof milSep != "undefined" ? milSep : ".";
		decSep = typeof decSep != "undefined" ? decSep : ",";
		var whichCode = (window.Event) ? e.which : e.keyCode;
		if (whichCode == 13) // Tecla 'Enter'
			return true; 
			key = String.fromCharCode(whichCode); // Recupera c?digo da tecla pressionada
		if (strCheck.indexOf(key) == -1) 
			return true; // N?o ? um valor v?lido
			len = fld.value.length;
		for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) 
		break;
		aux = '';
		for(; i < len; i++){
			if (strCheck.indexOf(fld.value.charAt(i))!=-1) 
			aux += fld.value.charAt(i);
		} 
		aux += key;
		len = aux.length;
		if (len == 0) fld.value = '';
		if (len == 1) fld.value = '0'+ decSep + '0' + aux;
		if (len == 2) fld.value = '0'+ decSep + aux;
		if (len > 2) {
		  aux2 = '';
		  for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
				aux2 += aux.charAt(i);
				j++;
		  }
		  fld.value = '';
		  len2 = aux2.length;
		  for (i = len2 - 1; i >= 0; i--)
		  fld.value += aux2.charAt(i);
		  fld.value += decSep + aux.substr(len - 2, len);
		}
	    return false;
	 }

//*********************************************************************//
// Funcao para efetuar a mascara de CPF e CNPJ.                        //
// para utilizar ? so alterar a mascara desejada.                      //
// chamada no form :                                                   //
// onkeypress="return mascaraCpf(this, '##.###.###/####-##', event)"   //                                                            //
//*********************************************************************//
	function mascaraCpf(src, mask, teclapres) {
	
	        if(navigator.appName.indexOf("Netscape")!= -1) 
	           tecla= teclapres.which; 
	        else 
	           tecla= teclapres.keyCode; 
	        
	        key = String.fromCharCode( tecla); 
	
	        var strValidos = "0123456789" ;   
	        if ( strValidos.indexOf( key ) == -1 && tecla!= 8 &&  tecla!= 0)
	        {
	                return false;   
	        }
	
	       var i = src.value.length;
	       var saida = mask.substring(0,1);
	       var texto = mask.substring(i) ;
	       if (texto.substring(0,1) != saida) {
	         src.value += texto.substring(0,1);
	       }
	}


/**
* Funcao de Formatacao de numeros decimais. Corrige um problema com valores
* come?ados com "0,0", mas "arredonda" quando o n?mero ? grande.
* @author Andre Santos
*/
function formataDecimalPatch(campo, e, milSep, decSep, casas){

	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
		case 13: //Enter
			return true; //sai da funcao, validando a tecla
	}
	
	var key = String.fromCharCode(code); //Transforma codigo em caracter
	if (isNaN(key)) return false;  //N?o ? numero, sai da funcao
	if(campo.maxLength <= campo.value.length) return false;//trata erro de casas
	
	var i = j = 0;
	var len = campo.value.length;
	var len2 = 0;
	var aux = aux2 = '';
	
	milSep = typeof milSep != "undefined" ? milSep : "."; //se separadores forem nulos,
	decSep = typeof decSep != "undefined" ? decSep : ",";//especifica separadores padr?es
	
	for(i = 0; i < len; i++)
		if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != decSep))
			break;
	
	for(; i < len; i++){
		if (!isNaN(campo.value.charAt(i))) //se for numero
			aux += campo.value.charAt(i);	//adiciona a variavel auxiliar
	}
	
	aux += key; 		//adiciona tecla digitada
	len = aux.length;
	
	if (len == 0) campo.value = '';
	
	//se o numero do campo for menor q a quantidade de casas decimais
	if(len > 0 && len <= casas){ //insere os zeros necessarios antes do mesmo
		campo.value = '0' + decSep;

      /*trecho acrescentado devido ao bug do 1 centavo */
	   if (len == 1 && casas == 2)
	      campo.value += '0';
	   else /*fim trecho */
		for(i = 1; i < casas - len; i++)
			campo.value += '0';
			
		campo.value += aux;
	}
	
	if (len > casas ) {
		aux2 = '';
		
		for (j = 0, i = len - (casas + 1); i >= 0; i--) {
			if (milSep != "" && j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		campo.value = '';
		len2 = aux2.length;
		
		for (i = len2-1  ; i >= 0; i--) //coloca numero com ou sem separadores no campo
			campo.value += aux2.charAt(i);
		
		//adiciona numeros decimais
		campo.value += decSep + aux.substr(len - casas, len);
	}
	return false;
}

function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}
//hilton - funcao para completar com zeros a esquerda para eventos onblur
function completaComZeros(valor,tamanho){
	var campo = valor.value;
	if (campo != ''){
		while(campo.length < tamanho){
			campo = "0" + campo;
		}
		valor.value = campo;
	}
}

function validarData(campo) {
   var reDate5 = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/\d{4}$/; 
   var reDate = reDate5;

   var pStr = campo.value;
   //, pFmt
	//eval("reDate = reDate" + '');
	if (reDate.test(pStr)) {
		return true;
	} else if (pStr != null && pStr != "") {
		alert("Data Inv?lida !");
		campo.value = "";
		campo.focus();
		campo.select();
		return false;
	}

   return false;
} 

//Marca/Desmarca todos os checkboxes
function checkUncheckAll(theForm, campo) {
		
	for (i = 0; i < theForm.elements.length; i++) {
	    if (theForm[i].type == 'checkbox' && theForm[i].name != 'checkall') {
		    theForm[i].checked = campo.checked; 
	    }
	}
}