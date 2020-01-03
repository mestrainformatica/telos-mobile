// JavaScript Document
// ===========================================================
// ===========================================================
// ===========================================================
// ===========================================================	
function DataValida(ConteudoCampo, Verifica){
var numer
var dia, mes, ano
numer = ConteudoCampo.value;
if(Verifica == "") Verifica = false;
if(Verifica){
	
	if(numer.length > 1 && numer.length != 10){
	    alert("Data inválida!");
		ConteudoCampo.value = "";
		ConteudoCampo.focus();
		return false;
	}
	
	var qdata = numer.split('/')
	
	dia = parseFloat(qdata[0]);
	mes = parseFloat(qdata[1]);
	ano = parseFloat(qdata[2]);
	
	if(mes < 1 || mes > 12 || dia < 1 || ano == 0){
		alert("Data inválida!");
		ConteudoCampo.value = "";
		ConteudoCampo.focus();
		return false;}

	switch (mes) {
		case 2:
			if(((ano%4==0 && ano%400 != 0) || ano%100==0) && dia > 29){
				alert("Data inválida!");
				ConteudoCampo.value = ""
				ConteudoCampo.focus();
				return false;
				}
			else {
				if(!((ano%4==0 && ano%400 != 0) || ano%100==0) && dia > 28){
				alert("Data inválida!");
				ConteudoCampo.value = "";
				ConteudoCampo.focus();
				return false;
				}
			}
	break;
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
		if(dia > 31){
			alert("Data inválida!");
			ConteudoCampo.value = "";
			ConteudoCampo.focus();
			return false;
			}
	break;
		case 4:
		case 6:
		case 9:
		case 11:		
		if(dia > 30){
			alert("Data inválida!");
			ConteudoCampo.value = "";
			ConteudoCampo.focus();
			return false;
			}
	break;
		default:
		if(ConteudoCampo.value != ""){
			alert("Data inválida!");
			ConteudoCampo.value = "";
			ConteudoCampo.focus();
			return false;
			}
		}
}
return true;
}

function ValidaCPF(campo,CPF){
 var RecebeCPF, soma, resultado1, resultado2
 var Numero = new Array(11);
 var Repeticao, Digito
 RecebeCPF = CPF;
 Campo = campo;
 
 if(RecebeCPF.length != 11 && RecebeCPF.length > 0){
  alert("É obrigatório o CPF com 11 dígitos");
  eval("document.forms[0]."+Campo+".value=''")
  eval("document.forms[0]."+Campo+".focus()")
  return false;
 }else if(RecebeCPF.length == 0){
  return false;
 }
 
 Digito = RecebeCPF.substr(0,1);
 for(i=1; i < 11; i++){
  if(RecebeCPF.substr(i,1) == Digito){
   Repeticao = true;
  }
  else{
   Repeticao = false;
   break;
  }
  
 }
 
 if(Repeticao){
  alert("CPF Inv?lido!");
  eval("document.forms[0]."+Campo+".value=''")
  eval("document.forms[0]."+Campo+".focus()")
  return false;
 }
 
 Numero[0]  = parseInt(RecebeCPF.substr(0,1));
 Numero[1]  = parseInt(RecebeCPF.substr(1,1));
 Numero[2]  = parseInt(RecebeCPF.substr(2,1));
 Numero[3]  = parseInt(RecebeCPF.substr(3,1));
 Numero[4]  = parseInt(RecebeCPF.substr(4,1));
 Numero[5]  = parseInt(RecebeCPF.substr(5,1));
 Numero[6]  = parseInt(RecebeCPF.substr(6,1));
 Numero[7]  = parseInt(RecebeCPF.substr(7,1));
 Numero[8]  = parseInt(RecebeCPF.substr(8,1));
 Numero[9]  = parseInt(RecebeCPF.substr(9,1));
 Numero[10] = parseInt(RecebeCPF.substr(10,1));
 

 soma = (10 * Numero[0]) + (9 * Numero[1]) + (8 * Numero[2]) + (7 * Numero[3]) + (6 * Numero[4]) + (5 * Numero[5]) + (4 * Numero[6]) + (3 * Numero[7]) + (2 * Numero[8])
 
 soma = soma -(11 * (parseInt(soma / 11)))
 
 if( soma == 0 || soma == 1)
  resultado1 = 0;
 else
  resultado1 = 11 - soma;
 
 if(resultado1 == Numero[9]){
 
  soma = (Numero[0] * 11) + (Numero[1] * 10) + (Numero[2] * 9) + (Numero[3] * 8) + (Numero[4] * 7) + (Numero[5] * 6) + (Numero[6] * 5) + (Numero[7] * 4) + (Numero[8] * 3) + (Numero[9] * 2)
 
  soma = soma -(11 * (parseInt(soma / 11)))
 
  if( soma == 0 || soma == 1)
   resultado2 = 0;
  else
   resultado2 = 11 - soma;
 
  if( resultado2 != Numero[10]){
   alert("CPF Inv?lido!");
   eval("document.forms[0]."+Campo+".value=''")
   eval("document.forms[0]."+Campo+".focus()")
   return false;
  }
  
 }else{
  alert("CPF Inv?lido!");
  eval("document.forms[0]."+Campo+".value=''")
  eval("document.forms[0]."+Campo+".focus()")
  return false;
 }
 
 return true;
 
}//end function


function TrataCampo_Currency(event, valorcampo) {
		Tecla = event.which;
		
		if (Tecla == null)
		   Tecla = event.keyCode;	   
		
		if ((Tecla == 46) || (Tecla >= 48 && Tecla <= 57))
		   return true;	
		
		if (Tecla == 44) {
			if (valorcampo.indexOf(',') !=  -1)
				return false;
			else 
				return true;
			}
			
		if (Tecla == 8)
		   return true;	   
		return false;
	}
	
	
function TrataCampo_number(event) {
		Tecla = event.which;		
		if (Tecla == null)
		   Tecla = event.keyCode;		
		if ((Tecla == 46) || (Tecla >= 48 && Tecla <= 57))
		   return true;
		if (Tecla == 8)
		   return true;	   
		return false;
	}


function trim(s) {
  while (s.substring(0,1) == ' ') {
	s = s.substring(1,s.length);
  }
  while (s.substring(s.length-1,s.length) == ' ') {
	s = s.substring(0,s.length-1);
  }
  return s;
}

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
 
   var sep = 0;
   var key = '';
   var i = j = 0;
   var len = len2 = 0;
   var strCheck = '0123456789';
   var aux = aux2 = '';
   var whichCode = (window.Event) ? e.which : e.keyCode;
 
   if (objTextBox.value.length == "10") // 14/04/2011 - Alterado para 11 (antigo era 10)
   {
    return false;
   }   
 
   if (whichCode == 8)
   {
    objTextBox.value = "";
    return false;
   }
 
   if (whichCode == 13) return true;
   key = String.fromCharCode(whichCode); // Valor para o c?digo da Chave
   if (strCheck.indexOf(key) == -1) return false; // Chave inválida
 
   len = objTextBox.value.length;
   for(i = 0; i < len; i++)
    if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
   aux = '';
   for(; i < len; i++)
    if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
   aux += key;
   len = aux.length;
   if (len == 0) objTextBox.value = '';
   if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
   if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
   if (len > 2) {
    aux2 = '';
    for (j = 0, i = len - 3; i >= 0; i--) {
     if (j == 3) {
      aux2 += SeparadorMilesimo;
      j = 0;
     }
     aux2 += aux.charAt(i);
     j++;
    }
    objTextBox.value = '';
    len2 = aux2.length;
    for (i = len2 - 1; i >= 0; i--)
    objTextBox.value += aux2.charAt(i);
    objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
   }
   return false;
  }

//  Mascara para xx/xxxx M?s/Ano
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
 
 
function validComp(Campo){
 var mes, ano
 
 numer = Campo.value;
  
 if(numer != ""){
  if(numer.length < 7 && numer.length >= 1){
   alert("M?s/Ano inv?lido!");
   Campo.value = "";
   Campo.focus();
   return false;
  }
 
  if(numer.length == 7){
   
   mes = parseFloat(numer.substring(0,2));
   ano = parseFloat(numer.substring(3,7));
 
   if(mes < 1 || mes > 12 || ano < 1900){
    alert("M?s/Ano inv?lido!");
    Campo.value = "";
    Campo.focus();
    return false;
   }
 
  }
  return true;
 }
}

function TrataCampo_ValorReal(event, valorcampo) {
		Tecla = event.which;
		
		if (Tecla == null)
		   Tecla = event.keyCode;	   
		
		if (Tecla >= 48 && Tecla <= 57)
		   return true;	
		
		if(Tecla == 45 && valorcampo == '')
		    return true;
		
		if (Tecla == 44) {
			if (valorcampo.indexOf(',') !=  -1){
				return false;
			}else{
			    if (valorcampo != ''){
				    return true;
				}else{
				    return false;
				}
		    }
		}
			
		if (Tecla == 8)
		   return true;	   
		return false;
	}


//##############################In?cio Formata??o de valor############################################
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
		for(i = 1; i <= casas - len; i++)
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

	campo.value = campo.value.substr(0, campo.value.length - 1);
	return true;
}
//##############################Fim Formata??o de valor############################################

//##############################In?cio Formata??o de Data############################################

//var NNav = ((navigator.appName == "Netscape"));
//var debugNav = false;
var AgntUsr	= navigator.userAgent.toLowerCase();
//var AppVer	= navigator.appVersion.toLowerCase();
//var DomYes	= document.getElementById ? 1:0;
var NavYes	= AgntUsr.indexOf('mozilla') != -1 && AgntUsr.indexOf('compatible') == -1 ? 1:0;
var ExpYes	= AgntUsr.indexOf('msie') != -1 ? 1:0;
//var Opr		= AgntUsr.indexOf('opera')!= -1 ? 1:0;
//var interval;
/*if(debugNav){
	alert("Agente: "+AgntUsr+" - Versao: "+AppVer+"\n"+
	"Netscape/Mozilla: "+NavYes+"\n"+
	"Internet Explorer: "+ExpYes+"\n"+
	"Opera: "+Opr);
	var i = i;
}
*/
function formataData(campo,evt)
{

    if(NavYes)
        var tecla = evt.which;
    else
        var tecla = evt.keyCode;

    vr = retornaValorCampo(campo);

      vr = vr.replace( ".", "" );
      vr = vr.replace( "/", "" );
      vr = vr.replace( "/", "" );
      vr = vr.replace( "/", "" );

    tam = vr.length +1;
    if ( tecla != 9 && tecla != 8 && tecla != 0 )
    {
		  if ( tam > 2 && tam < 5 )
				vr = vr.substr( 0, 2 ) + '/' + vr.substr(2, tam );
        if ( tam >= 5 && tam <= 10 )
            vr = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 3 );
		  setValorCampo(campo, vr);
	
        return false;
    }
}

function formataData_NP(campo,evt)
{

    if(NavYes)
        var tecla = evt.which;
    else
        var tecla = evt.keyCode;

   // vr = retornaValorCampo(campo,1 );
   
   vr = document.getElementById(campo).value;

      vr = vr.replace( ".", "" );
      vr = vr.replace( "/", "" );
      vr = vr.replace( "/", "" );
      vr = vr.replace( "/", "" );

    tam = vr.length +1;
    if ( tecla != 9 && tecla != 8 && tecla != 0 )
    {
		  if ( tam > 2 && tam < 5 )
				vr = vr.substr( 0, 2 ) + '/' + vr.substr(2, tam );
        if ( tam >= 5 && tam <= 10 )
            vr = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 3 );
		  //setValorCampo(campo, vr, "" , 1);
	document.getElementById(campo).value = vr;
        return false;
    }
}


function getCampo(campo, form)
{
	form = getForm(form);
	if(form)
		campo = form.elements[campo];
	return campo;
}

function getKeyCode(evt){
	var key;
	if (ExpYes)
		key = evt.keyCode;
	else
		key = evt.which;
	return key;
}

function getForm(form){

	var sessForm = getVarGlobal("form");
	// Se houver um opener recupera o form deste
	var parentForm = "";
	if(opener && form != null){
		return opener.getVarGlobal("parentForm")
	}	

	if(form != "" && form != 0 && ""+form != "undefined")
		form = eval("document.forms['"+form+"']");
	else if(sessForm != "" && sessForm != 0 && ""+sessForm != "undefined" && ""+sessForm != "null")
		form = eval("document.forms['"+sessForm+"']");
	else
		form = eval("document.forms[0]");
	return form;
}

function setValorCampo(nomeCampo, valor, separador, form)
{
	var campo = getCampo(nomeCampo,form);
	if(campo)
	{
		if(arguments[2])
			campo.value = concatenar(retornaValorCampo(nomeCampo), valor, separador);
		else
			campo.value = valor;
		return true;
	}
	return false;
}


function concatenar(oldValue, newValue, separator)
{
	var valRetorno = oldValue;
	if(newValue != "")
	{
		if(oldValue == "")
			valRetorno = newValue;
		else if (oldValue.indexOf(newValue) == -1)
			valRetorno = oldValue + separator + newValue;
	}
	return valRetorno;
}

function validaCaracter(evt, tipo)
{
   var key;
   var keychar;
	key = getKeyCode(evt);	
   /**
   * C?digos de teclas do teclado num?rico
	de 96 ? 105 =  0 - 9
        106 = *
        107 = +
        109 = -
        110 = ,
        111 = /
        194 = .
      */

   // array das setas
   var keyseta = new Array(37,39);

   // array dos numeros + setas
   var keynum = new Array(96,97,98,99,100,101,102,103,104,105,37,39);

   // array de data + numeros
   var keynumD = new Array(96,97,98,99,100,101,102,103,104,105,37,39,111);

   // array dos numeros
   var keydigit = new Array(96,97,98,99,100,101,102,103,104,105);

   keychar = String.fromCharCode(key);

   if ((key==null) || (key==0) || (key==8) || (key==9)|| (key==27) ||
		(key==46))
      return true;
   else if (tipo=="V" && ((("0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynum)))
   		return true;
   else if (tipo=="D" && ((("/0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynumD)))
	    return true;
   else if (tipo=="DT" && (((" :/0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynumD)))
	    return true;
   else if (tipo=="H" && (((":0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynum)))
   		return true;
   else if (tipo=="A" && (("0123456789").indexOf(keychar) == -1 || 
   			validaKeyArray(key,keyseta)))
		return true;
		
   return false;
}

function validaKeyArray(keycode, keyArray){
	var achou = false;

	if(keyArray != null){
		for(var i = 0; i < keyArray.length; i++){
			if(keyArray[i] == keycode){
				achou = true;
				break;
			}
		}
		return achou;
	} else {
		return true;
	}
}

function getVarGlobal(nome, valor) {
   if (this.cache == null) {
     return null;
   } else {
     return this.cache[nome];
   }
}


function retornaValorCampo(field, form)
{
	var campo = "";
	if(form == "" || form == 0 || ""+form == "undefined"){
		if(document.forms && document.forms[0] && document.forms[0].elements)
			campo = eval("document.forms[0].elements['"+field+"']");
	}
	else
		campo = eval("document.forms['"+form+"'].elements['"+field+"']");

	if(campo)
	{
		if(campo.length > 0 && campo[0]){
			if(	campo[0].type == "text" || campo[0].type == "hidden" || campo[0].type == "textarea"  ||
				campo[0].type == "file" || campo[0].type == "password")
				campo = campo[0];
		}
		if(	campo.type == "text" || campo.type == "hidden" || campo.type == "textarea" ||
			campo.type == "file" || campo.type == "password")
		{
			return campo.value;
		}
		else if (campo.type == "checkbox")
		{
			if(campo.checked)
				return campo.value;
			else{
				if(getVarGlobal("uncheck_"+campo.name))
					return getVarGlobal("uncheck_"+campo.name);
				else
					return "N";
			}
		}
		else if (campo.type == "select-one")
		{
			return campo.options[campo.selectedIndex].value;
		}
		else if (campo.type == "select-multiple")
		{
			var valSelect = new Object();
			for(i = 0; i < campo.length; i++){
				if(campo.options[i].selected){
					valSelect[valSelect.length] = campo.options[i].value;
				}
			}
			return valSelect;
		}
		else if (campo.type == "radio")
		{
			if(campo.checked)
				return campo.value;
		}
		else
		{
			for(var i = 0; i < campo.length; i++){
				if(campo[i].checked){
					return campo[i].value;
				}
			}
		}
	}

	return "";
}

//##############################Fim Formata??o de Data###############################################


//##############################In?cio Calcula Idade###############################################
function calculaIdade(CampoData,dataHoje) {
/*Aten??o! Na fun??o, a data correspondente a vari?vel dataHoje onde neste caso passamos fixo,
passar a data do servidor(ASP), para que o usu?rio n?o altere a data do windows!!! */

    if (CampoData.value != ""){
	    data = CampoData.value;

	     x = data.split("/");
	     h = dataHoje.split("/");

	     if(x[0] > 31 || x[1] > 12 || x[2] > h[2]) {
		     alert('Data de Nascimento inválida!');
		     CampoData.value = "";
		     return "";
		     CampoData.focus();
	     }

	     anosProvisorio = h[2] - x[2];
    	
	    if(h[1] < x[1]) {
		     anosProvisorio -= 1;
	     }
	     else if(h[1] == x[1]) {
		     if(h[0] < x[0]) {
			     anosProvisorio -= 1;
		     }
	     }
	     
	     if (anosProvisorio < 0){
	        alert('Data de Nascimento inválida!');
		    CampoData.value = "";
		    return "";
		    CampoData.focus();
	     }
	     
	     return anosProvisorio;
    }
    return "";
}
//##############################Fim Calcula Idade###############################################

function Limpar(valor, validos) {
	// retira caracteres invalidos da string
	var result = "";
	var aux;
	for (var i=0; i < valor.length; i++) {
		aux = validos.indexOf(valor.substring(i, i+1));
			if (aux>=0) {
				result += aux;
			}
	}
		return result;
}

	//Formata n?mero tipo moeda usando o evento onKeyDown

function Formata(campo,tammax,teclapres,decimal) {
    
	if (teclapres.keyCode) tecla = teclapres.keyCode;  //IE
    else if (teclapres.which) tecla = teclapres.which; // Netscape 4.?   
    else if (teclapres.charCode) tecla = teclapres.charCode; // Mozilla 
	
	if ((tecla == 46) || (campo.value.length == tammax) && tecla != 8)  {
       teclapres.cancelBubble = true;
       teclapres.returnValue = false;
       return false;
    }
	
	vr = Limpar(campo.value,"0123456789");
	tam = vr.length;
	dec=decimal
    
	if (tam < tammax && tecla != 8){
		tam = vr.length + 1 ;
	}
    
	if (tecla == 8 )
	{ tam = tam - 1 ; }

	if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ){

		if ( tam <= dec ){
			campo.value = vr ;
		}

		if ( (tam > dec) && (tam <= 5) ){
			campo.value = vr.substr( 0, tam - 2 ) + "," + vr.substr( tam - dec, tam ) ;
		}
		if ( (tam >= 6) && (tam <= 8) ){
			campo.value = vr.substr( 0, tam - 5 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ; 
		}
		if ( (tam >= 9) && (tam <= 11) ){
			campo.value = vr.substr( 0, tam - 8 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ;
		}
		if ( (tam >= 12) && (tam <= 14) ){
			campo.value = vr.substr( 0, tam - 11 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - dec, tam ) ;
		}
		if ( (tam >= 15) && (tam <= 17) ){
			campo.value = vr.substr( 0, tam - 14 ) + "." + vr.substr( tam - 14, 3 ) + "." + vr.substr( tam - 11, 3 ) + "." + vr.substr( tam - 8, 3 ) + "." + vr.substr( tam - 5, 3 ) + "," + vr.substr( tam - 2, tam ) ;
		}
	}
}

function SoNumeros(e, campo) {
   
   if (e.keyCode) carCode = e.keyCode;     //IE  
   else if (e.which) carCode = e.which; // Netscape 4.?   
   else if (e.charCode) carCode = e.charCode; // Mozilla
   
   var key = String.fromCharCode(carCode); //Transforma codigo em caracter
   if (isNaN(key) && carCode != 8) return false;  //N?o ? numero, sai da funcao
   if(carCode == 13){
       document.forms[0].elements[campo.tabIndex+3].focus();
   }    
   if (((carCode == 46) || (carCode < 48) || (carCode > 57)) && carCode != 8)  {
       //alert('Por favor digite apenas n?meros.');
       e.cancelBubble = true;
       e.returnValue = false;
       return false;
   }
   
   return formataDecimalPatch(campo, e,'.',',', 2);
   
}//-->