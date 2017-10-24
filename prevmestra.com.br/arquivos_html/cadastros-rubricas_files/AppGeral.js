// jCompany 3.0 : Arquivo Javascript espec?fico da aplica??o
// ? inserido e disponibilizado em todas as p?ginas
 
function isNUMB(c) 
 { 
 if((cx=c.indexOf(","))!=-1) 
  { 
  c = c.substring(0,cx)+"."+c.substring(cx+1); 
  } 
 if((parseFloat(c) / c != 1)) 
  { 
  if(parseFloat(c) * c == 0) 
   { 
   return(1); 
   } 
  else 
   { 
   return(0); 
   } 
  } 
 else 
  { 
  return(1); 
  } 
 } 

function LIMP(c) 
 { 
 while((cx=c.indexOf("-"))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf("/"))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf(","))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf("."))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf("("))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf(")"))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 while((cx=c.indexOf(" "))!=-1) 
  { 
  c = c.substring(0,cx)+c.substring(cx+1); 
  } 
 return(c); 
 } 

function VerifyCNPJ(CNPJ) 
 { 
 CNPJ = LIMP(CNPJ); 
 if(isNUMB(CNPJ) != 1) 
  { 
  return(0); 
  } 
 else 
  { 
  if(CNPJ == 0) 
   { 
   return(0); 
   } 
  else 
   { 
   g=CNPJ.length-2; 
   if(RealTestaCNPJ(CNPJ,g) == 1) 
    { 
    g=CNPJ.length-1; 
    if(RealTestaCNPJ(CNPJ,g) == 1) 
     { 
     return(1); 
     } 
    else 
     { 
     return(0); 
     } 
    } 
   else 
    { 
    return(0); 
    } 
   } 
  } 
 } 
function RealTestaCNPJ(CNPJ,g) 
 { 
 var VerCNPJ=0; 
 var ind=2; 
 var tam; 
 for(f=g;f>0;f--) 
  { 
  VerCNPJ+=parseInt(CNPJ.charAt(f-1))*ind; 
  if(ind>8) 
   { 
   ind=2; 
   } 
  else 
   { 
   ind++; 
   } 
  } 
  VerCNPJ%=11; 
  if(VerCNPJ==0 || VerCNPJ==1) 
   { 
   VerCNPJ=0; 
   } 
  else 
   { 
   VerCNPJ=11-VerCNPJ; 
   } 
 if(VerCNPJ!=parseInt(CNPJ.charAt(g))) 
  { 
  return(0); 
  } 
 else 
  { 
  return(1); 
  } 
 } 
  


function validaCNPJ(objeto) 
{ 
	if(VerifyCNPJ(objeto.value) != 1 && objeto.value!=''){
		alert("Numero de CNPJ invalido!"); 
		//objeto.value='';
		objeto.focus();
	} 
} 


/*---------------------------------------------------------------------------*\
  Fun??o para formatar Campos Telefone
\*---------------------------------------------------------------------------*/ 

function mascaraTelefone(src, mask, teclapres) {

 if(navigator.appName.indexOf("Netscape")!= -1) 
    tecla= teclapres.which; 
  else 
    tecla= teclapres.keyCode; 
	
key = String.fromCharCode( tecla); 

	var strValidos = "0123456789"   
	if ( strValidos.indexOf( key ) == -1 && tecla!= 8 &&  tecla!= 0){
		return false;   
	}


  var i = src.value.length;
  var saida = mask.substring(0,1);
  var texto = mask.substring(i)
if (texto.substring(0,1) != saida) 
  {
	src.value += texto.substring(0,1);
  }
}

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

//funcao para validar o cpf
function Verifica_campo_CPF(src) {

var CPF = src.value; // Recebe o valor digitado no campo
//retirando os digitos invalidos do CPF passado
    CPF = CPF.toString().replace( "-", "" );
    CPF = CPF.toString().replace( ".", "" );
    CPF=  CPF.toString().replace( ".", "" );
    CPF = CPF.toString().replace( "/", "" );

// Aqui comeca a checagem do CPF
var POSICAO, I, SOMA, DV, DV_INFORMADO;
var DIGITO = new Array(10);
DV_INFORMADO = CPF.substr(9, 2); // Retira os dois ultimos digitos do no. informado


if (CPF == "00000000000" || CPF == "11111111111" || CPF == "22222222222" || CPF == "33333333333" || CPF == "44444444444" || CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" || CPF == "88888888888" || CPF =="99999999999"){
   alert("Numero de CPF Invalido");  
   //src.value = '';
   src.focus(); 
}

// Desmembra o no. do CPF na array DIGITO
   for (I=0; I<=8; I++) {
     DIGITO[I] = CPF.substr( I, 1);
}

// Calcula o valor do 10o. digito da verificacao
   POSICAO = 10;
   SOMA = 0;
   for (I=0; I<=8; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[9] = SOMA % 11;
   if (DIGITO[9] < 2) {
        DIGITO[9] = 0;
}
   else{
       DIGITO[9] = 11 - DIGITO[9];
}

// Calcula o valor do 11o. digito da verificacao
   POSICAO = 11;
   SOMA = 0;
   for (I=0; I<=9; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[10] = SOMA % 11;
   if (DIGITO[10] < 2) {
        DIGITO[10] = 0;
   }
   else {
        DIGITO[10] = 11 - DIGITO[10];
   }

// Verifica se os valores dos digitos verificadores conferem
   DV = DIGITO[9] * 10 + DIGITO[10];
   if (DV != DV_INFORMADO) {
      alert("Numero de CPF invalido");  
      //src.value = '';
      src.focus(); 
   }
}

function imprimeErros()
{
	window.open("/Fapes_Previdenciario/mestra/jsps/errosimportacao.jsp");
}

function setDocumentCookie( oDoc, sName, sValue, sExpDate )
{	
	//para evitar erro no FIREFOX
	if ( sValue == undefined)
    {    	
    	sValue = "";
    }
    
    if ( sName.length < 1 )
        return;
 
    if (  0 < sValue.length )
    {
    	
    	if(sExpDate != ''){	    	
			var expDate = new Date();
    	    expDate.setTime( expDate.getTime() + 365*24*60*60*1000 );
			 oDoc.cookie = ""
                        + sName + "=" + sValue + "; "
                        + "expires=" + expDate.toGMTString();
    	}else{
    		oDoc.cookie = ""
                        + sName + "=" + sValue + "; ";
    	}               
    }
    else
    {
        //  this will cause the named cookie to be deleted.
        oDoc.cookie = sName + "=";
    }
}
function deleteDocumentCookie( oDoc, sName )
 {
	 oDoc.cookie = sName + "=";
}
function fetchDocumentCookie( oDoc, sName ) {
	var sValue = ""; 
	var index = 0;
    if( oDoc.cookie )
        index = oDoc.cookie.indexOf( sName + "=" );
    else
        index = -1;
 
    if ( index < 0 )
    {
        sValue = "";
    }
    else
    {
        var countbegin = (oDoc.cookie.indexOf( "=", index ) + 1);
        if ( 0 < countbegin )
        {
            var countend = oDoc.cookie.indexOf( ";", countbegin );
            if ( countend < 0 )
                countend = oDoc.cookie.length;
            sValue = oDoc.cookie.substring( countbegin, countend );
        }
        else
        {
            sValue = "";
        }
    }
    return sValue;
}

function setNamedCookie( sName, sValue, sExpDate ) {
	setDocumentCookie( document, sName, sValue, sExpDate );
}
function fetchNamedCookie( sName ) {
	return fetchDocumentCookie( document, sName );
}
function deleteCookie( sName ) {
	deleteDocumentCookie( document, sName );
}
function mudaLabel(){	
	//para IE	
	if(navigator.appVersion.indexOf("MSIE")> 0){		
		if(myPara.innerText == "Meu Sysprev"){
			myPara.innerText="Sysprev Geral";	
		}else{
			myPara.innerText="Meu Sysprev";	
		}
	}else{	
		//para FireFox
		if(myPara.innerHTML == "Meu Sysprev"){
			myPara.innerHTML="Sysprev Geral";	
		}else{
			myPara.innerHTML="Meu Sysprev";	
		}
	}
}		
function chMenu(){
	//para IE	
	if(navigator.appVersion.indexOf("MSIE")> 0){
		if(myPara.innerText == 'Meu Sysprev'){			
			document.getElementById('MenuNormal').style.display = 'none';
			document.getElementById('MeuSysprev').style.display = 'block';				
		}else{			
			document.getElementById('MeuSysprev').style.display = 'none';
			document.getElementById('MenuNormal').style.display = 'block';
		}
	}else{	
		if(myPara.innerHTML == 'Meu Sysprev'){			
			document.getElementById('MenuNormal').style.display = 'none';
			document.getElementById('MeuSysprev').style.display = 'block';				
		}else{			
			document.getElementById('MeuSysprev').style.display = 'none';
			document.getElementById('MenuNormal').style.display = 'block';
		}
	}
}		

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
			alert("Mes/Ano invalido!");
			Campo.value = "";
			Campo.focus();
			return false;
		}
	
		if(numer.length == 7){
			
			mes = parseFloat(numer.substring(0,2));
			ano = parseFloat(numer.substring(3,7));
	
			if(mes < 1 || mes > 12 || ano < 1900){
				alert("Mes/Ano invalido!");
				Campo.value = "";
				Campo.focus();
				return false;
			}
	
		}
		return true;
	}
}

function formataPercentualTres(fld, e, milSep, decSep) {

	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
		key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key

	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var aux = aux2 = '';

	milSep = typeof milSep != "undefined" ? milSep : ".";
	decSep = typeof decSep != "undefined" ? decSep : ",";

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
	if (len == 1) fld.value = '0'+ decSep + '0' + '0' +'0' + aux;
	if (len == 2) fld.value = '0'+ decSep + '0' + '0' + aux;
	if (len == 3) fld.value = '0'+ decSep + '0' + aux;
	if (len == 4) fld.value = '0'+ decSep + aux;
	

	if (len == 8)
		return false;
	
	if (len > 4 ) {
		aux2 = '';
		
		for (j = 0, i = len - 5; i >= 0; i--) {
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;

		for (i = len2-1; i >= 0; i--)
			fld.value += aux2.charAt(i);
			fld.value += decSep;
			fld.value +=aux.substr(len - 4, len);

	}
	return false;
}

function formataPercentualSete(fld, e, milSep, decSep) {

	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
		key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key

	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var aux = aux2 = '';

	milSep = typeof milSep != "undefined" ? milSep : ".";
	decSep = typeof decSep != "undefined" ? decSep : ",";

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
	if (len == 1) fld.value = '0'+ decSep + '0' + '0' +'0' + aux;
	if (len == 2) fld.value = '0'+ decSep + '0' + '0' + aux;
	if (len == 3) fld.value = '0'+ decSep + '0' + aux;
	if (len == 4) fld.value = '0'+ decSep + aux;
	
	
	if (len == 7)
		return false;
	
	if (len > 4 ) {
		aux2 = '';
		
		for (j = 0, i = len - 5; i >= 0; i--) {
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;

		for (i = len2-1; i >= 0; i--)
			fld.value += aux2.charAt(i);
			fld.value += decSep;
			fld.value +=aux.substr(len - 4, len);

	}
	return false;
}

function formataPercentualQuinze(fld, e, milSep, decSep) {

	var key = '';
	var strCheck = '0123456789';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
		key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key

	var sep = 0;
	var i = j = 0;
	var len = len2 = 0;
	var aux = aux2 = '';

	milSep = typeof milSep != "undefined" ? milSep : ".";
	decSep = typeof decSep != "undefined" ? decSep : ",";

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
	if (len == 1) fld.value = '0' + decSep + '0' + aux;
	if (len == 2) fld.value = '0' + decSep + aux;
	
	if (len == 15)
		return false;
	
	if (len > 2) {
		aux2 = '';
		
		for(j = 0, i = len - 3; i >= 0; i--) {
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
			alert("Hora invalida!");
			Campo.value = "";
			Campo.focus();
			return false;
		}
	
		if(numer.length == 5){
			
			hora = parseFloat(numer.substring(0,2));
			minuto = parseFloat(numer.substring(3,5));
	
			if(hora > 23 || minuto > 59){
				alert("Hora invalida!");
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
	if (navigator.appVersion.substring(0,1) < "5") {
		isNav4 = true;
		isNav5 = false;
	}else
		if (navigator.appVersion.substring(0,1) > "4") {
			isNav4 = false;
			isNav5 = true;
	   }
}else {
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
var whichCode = 0;
if(e) whichCode = (window.Event) ? e.which : e.keyCode;
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
alert("Data Invalida !");
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
else{
	//c?digo copiado para completar data no Firefox
	var mDay = vDateName.value.substr(0,2);
	var mMonth = vDateName.value.substr(3,2);
	var mYear = vDateName.value.substr(6,4);
	var vDateValueCheck = mMonth+"/"+mDay+"/"+mYear;
	
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
		
		vDateValueCheck = mMonth+"/"+mDay+"/"+mYear;
		// Store the new value back to the field.  This function will
		// not work with date type of 2 since the year is entered first.
		if (vDateType == 1) // mm/dd/yyyy
			vDateName.value = mMonth+"/"+mDay+"/"+mYear;
		if (vDateType == 3) // dd/mm/yyyy
			vDateName.value = mDay+"/"+mMonth+"/"+mYear;
	}else
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
if (intYear % 400 == 0) { return true; }
}
else {
if ((intYear % 4) == 0) { return true; }
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

function compLConta(obj)
{
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

//Marca/Desmarca todos os checkboxes

function checkUncheckAll(theElement) {
	var theForm = theElement.form;
	
	for (i = 0; i < theForm.elements.length; i++) {
    	if (theForm[i].type == 'checkbox' && theForm[i].name != 'checkall') {
	    	theForm[i].checked = theElement.checked;
    	}
	}
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

function formataNumero(campo, e, milSep, decSep, casas){

	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
		case 13: //Enter
			return true; //sai da funcao, validando a tecla
	}
	
	var key = String.fromCharCode(code); //Transforma codigo em caracter
	if (isNaN(key)) return false;  //N?o ? numero, sai da funcao
	
	var i = j = 0;
	var len = campo.value.length;
	var len2 = 0;
	var aux = aux2 = '';
	//milSep = typeof milSep != "undefined" ? milSep : "."; //se separadores forem nulos,
	decSep = typeof decSep != "undefined" ? decSep : ",";//especifica separadores padr?es
	
	if(len >= campo.maxLength)
		return false;
	
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
	campo.value = campo.value.substr(0, campo.value.length - 1);
	return true;
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

	if(whichCode == 13) // Tecla 'Enter'
		return true; 

	key = String.fromCharCode(whichCode); // Recupera c?digo da tecla pressionada

	if(strCheck.indexOf(key) == -1) 
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
	
	if(len >= fld.maxLength)
		return false;
	
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
function autoskip(e, el){
	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
   var key = (window.Event) ? e.which : e.keyCode;
   var keyCode = (isNN) ? e.which : e.keyCode; 
   //var el = e.srcElement;
   var valorFireFox = String.fromCharCode(key);
   tipos = "select,text,textarea,checkbox,radio,select-one";
   var filter = (isNN) ? [0,8,9,16,17,18,35,36,37,38,39,40,46] : [0,8,9,16,17,18,35,36,37,38,39,40,46];
   /*if (key == 13) {
       var i = 0;
       while(el != el.form.elements[i]) i++;					
	   //Procura proximo elemento que possa receber foco
	   i++;
		for( ; i < el.form.elements.length; i++){
			el = el.form[i];
			if((el.tagName == "INPUT" || el.tagName == "SELECT") && tipos.indexOf(el.type) > -1 && !(el.readOnly || el.disabled)){
				el.focus();
				break;
			}
		}
   
   } else*/ if (el != undefined && (key != 8 && key != 0)){
      //Verifica se usuario atingiu limite do campo
      if (el.value.length >= el.maxLength && !containsElement(filter,keyCode)) {
         var i = 0;
         var origem = el;
         while(el != el.form.elements[i]) i++;					
	      //Procura proximo elemento que possa receber foco
			i++;
			for( ; i < el.form.elements.length; i++){
				el = el.form[i];
				if((el.tagName == "INPUT" || el.tagName == "SELECT") && tipos.indexOf(el.type) > -1 && !(el.readOnly || el.disabled)){
				   //if (e.keyCode) e.keyCode = 0;
				   el.focus();
				   
				   break;
				}
				//if(i == el.form.elements.length - 1)
				//i = 0;
			}
		}
   }
}

function containsElement(arr, ele) {
	var found = false, index = 0;
		while(!found && index < arr.length)
			if(arr[index] == ele)
				found = true;
			else
				index++;
	return found;
}

//chamado no onfocus dos elementos da tela. Se o elemento for s? leitura ou desabilitado, vai pro pr?ximo v?lido
function skip(o){			
	if(o.readOnly || o.disabled){	
		i = 0;
		tipos = "text,textarea,checkbox,radio,select,select-one";		
		while(o != o.form.elements[i]) i++;
		i++;
		for( ; i < o.form.elements.length; i++){
			el = o.form[i];										
		if((el.tagName == "INPUT" || el.tagName == "SELECT") && tipos.indexOf(el.type) > -1 && !(el.readOnly || el.disabled)){							
			   el.focus();
			   break;
			}
		}
	}
}


/*---------------------------------------------------------------------------*\
  Fun??o para formatar Qualquer Campo
\*---------------------------------------------------------------------------*/ 

function mascaraGeral(src, mask, teclapres) {

 if(navigator.appName.indexOf("Netscape")!= -1) 
    tecla= teclapres.which; 
  else 
    tecla= teclapres.keyCode; 
	
key = String.fromCharCode( tecla); 

	var strValidos = "0123456789"   
	if ( strValidos.indexOf( key ) == -1 && tecla!= 8 &&  tecla!= 0){
		return false;   
	}


  var i = src.value.length;
  var saida = mask.substring(0,1);
  var texto = mask.substring(i)
if (texto.substring(0,1) != saida) 
  {
	src.value += texto.substring(0,1);
  }
}

function FormataValorMonetario(campo,tammax,teclapres)	 {
	var tecla = teclapres.keyCode;
//	vr = document.form[campo].value;
	vr = event.srcElement.value;

	vr = vr.replace( "/", "" );
	//vr = vr.replace( "/", "" );
	vr = vr.replace( ",", "" );
	vr = vr.replace( ".", "" );
	vr = vr.replace( ".", "" );
	vr = vr.replace( ".", "" );
	vr = vr.replace( ".", "" );

	if (vr.length > 0){ vr = parseInt(vr,10); }
	vr = '' + vr

	tam = vr.length;

	if (tam < tammax && tecla != 8){ tam = vr.length + 1 ; }

	if (tecla == 8 ){	tam = tam - 1 ; }
		
	if ( tecla == 8 || tecla >= 48 && tecla <= 57 || tecla >= 96 && tecla <= 105 ){
		if ( tam <= 2 ){ 
	 		// document.form[campo].value = vr ; 
			if (tam == 1){ 
				event.srcElement.value = "0,0" + vr ; 
			}else if (tam == 2){ 
				event.srcElement.value = "0," + vr ; 
			}else{
				event.srcElement.value = "" ; 
			}
		}
	 	if ( (tam > 2) && (tam <= 5) ){
	 		//document.form[campo].value = vr.substr( 0, tam - 1 ) + ',' + vr.substr( tam - 2, tam ) ; 
	 		event.srcElement.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; 
		}
	 	if ( (tam >= 6) && (tam <= 8) ){
	 		//document.form[campo].value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
	 		event.srcElement.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
		}
	 	if ( (tam >= 9) && (tam <= 11) ){
	 		//document.form[campo].value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
	 		event.srcElement.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
		}
	 	if ( (tam >= 12) && (tam <= 14) ){
	 		//document.form[campo].value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
	 		event.srcElement.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; 
		}
	 	if ( (tam >= 15) && (tam <= 17) ){
	 		//document.form[campo].value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;
	 		event.srcElement.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;
		}
	}		
}


function validar_PIS(objeto) {

var valorDigitado = objeto.value;


//	if(valorDigitado == '') {
//		alert("Digite o n?mero do PIS/PASEP");
//		objeto.focus();
//		return;
//	}
	
	if ((!validaPIS(eval("'" + valorDigitado.substring(0,14) + "'"), eval("'" + valorDigitado.substring(14,15) + "'")))){
		alert("O PIS/PASEP: " + valorDigitado + " ? inv?lido");
		objeto.value = '';
//		objeto.focus();
		return;
//	} else {
//		alert("O PIS/PASEP: " + valorDigitado + " ? v?lido");
//		objeto.focus();
//		return;
//    }
	}
}

function mascara_pis(campo) {
	if (campo.value.length == 1) { campo.value += "."; }
	if (campo.value.length == 5) { campo.value += "."; }
	if (campo.value.length == 9) { campo.value += "."; }
	if (campo.value.length == 13) { campo.value += "-"; }
}
//Hilton - funcao para retornar somente letras
function soletrasMesmo(e) {
	var key = '';
	var strCheck = 'abcdefghijklmnopqrstuvxzwyABCDEFGHIJKLMNOPQRSTUVXZWY';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	if (whichCode == 8) return true;  // BackSpace
	if (whichCode == 0) return true;  // Del
	key = String.fromCharCode(whichCode);
	if (strCheck.indexOf(key) == -1) return false;
}
//mostra tela de confirma??o na tela para inser??o de um novo resgistro
function confirmaNovo(acao){
	var conf = confirm('Deseja incluir um novo registro ?');
	if (conf){
		disparaBotaoAcao(acao);
		redirect('${requestScope.contextPathPlc}${requestScope.IND_LINK_INCLUIR}');
	}
	else{
		return false;
	}
}


function limparCaracterFormatacao(campo) {
    var valor = campo.value;

    valor = valor.toString().replace( "-", "" );

    valor = valor.toString().replace( ".", "" );

    valor = valor.toString().replace( ",", "" );

    valor = valor.toString().replace( "/", "" );

    /* Pra garantir */
    valor = valor.toString().replace( ".", "" );
    valor = valor.toString().replace( ".", "" );
    valor = valor.toString().replace( "-", "" );

    campo.value = valor;
}

function isNum(caractere) {
	var strValidos = "0123456789"
 
	if (strValidos.indexOf( caractere ) == -1) return false;
    return true;
}
 
function validaTecla(campo, event) {
	var BACKSPACE= 8;
	var key;
	var tecla; 
	CheckTAB=true;

	if(navigator.appName.indexOf("Netscape")!= -1)
		tecla = event.which;
	else 
		tecla = event.keyCode;
 
	key = String.fromCharCode( tecla);
  
	if ( tecla == 13 ) 	return false;

	if ( tecla == BACKSPACE ) return true;
 
	return ( isNum(key));
}

function formataCNPJ(el) { 
	vr = el.value; 
	tam = vr.length;

	if (vr.indexOf(".") == -1) {
		if (tam <= 2) el.value = vr;
 		if ((tam > 2) && (tam <= 6))
			el.value = vr.substr(0, 2) + '.' + vr.substr(2, tam);
		if ((tam >= 7) && (tam <= 10))
			el.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(5, 3) + '/';
		if ((tam >= 11) && (tam <= 18))
			el.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(5, 3) + '/' + vr.substr(8, 4) + '-' + vr.substr(12, 2);
	}

	if(VerifyCNPJ(el.value) != 1 && el.value!='') {
		alert("Numero de CNPJ invalido!");
		el.focus();
		//return false;
	} else {
		return true;
	}
}

function formataCPF(el) { 
	vr = el.value; 
	tam = vr.length;

	if (vr.indexOf(".") == -1) {
		if (tam <= 3) el.value = vr;
 		if ((tam > 3) && (tam <= 6))
			el.value = vr.substr(0, 3) + '.' + vr.substr(3, tam);
		if ((tam >= 7) && (tam <= 10))
			el.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-';
		if ((tam >= 11) && (tam <= 18))
			el.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-' + vr.substr(9, 2);
	}

	if (!isCPFValido(el)) {
		alert("Numero de CPF invalido!");
		el.focus();
	} else {
		return true;
	}
}

function isCPFValido(src) {

var CPF = src.value; // Recebe o valor digitado no campo
//retirando os digitos invalidos do CPF passado
    CPF = CPF.toString().replace( "-", "" );
    CPF = CPF.toString().replace( ".", "" );
    CPF=  CPF.toString().replace( ".", "" );
    CPF = CPF.toString().replace( "/", "" );

// Aqui comeca a checagem do CPF
var POSICAO, I, SOMA, DV, DV_INFORMADO;
var DIGITO = new Array(10);
DV_INFORMADO = CPF.substr(9, 2); // Retira os dois ultimos digitos do no. informado


if (CPF == "00000000000" || CPF == "11111111111" || CPF == "22222222222" || CPF == "33333333333" || CPF == "44444444444" || CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" || CPF == "88888888888" || CPF =="99999999999"){
   alert("Numero de CPF Invalido");  
   //src.value = '';
   src.focus(); 
}

// Desmembra o no. do CPF na array DIGITO
   for (I=0; I<=8; I++) {
     DIGITO[I] = CPF.substr( I, 1);
}

// Calcula o valor do 10o. digito da verificacao
   POSICAO = 10;
   SOMA = 0;
   for (I=0; I<=8; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[9] = SOMA % 11;
   if (DIGITO[9] < 2) {
        DIGITO[9] = 0;
}
   else{
       DIGITO[9] = 11 - DIGITO[9];
}

// Calcula o valor do 11o. digito da verificacao
   POSICAO = 11;
   SOMA = 0;
   for (I=0; I<=9; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[10] = SOMA % 11;
   if (DIGITO[10] < 2) {
        DIGITO[10] = 0;
   }
   else {
        DIGITO[10] = 11 - DIGITO[10];
   }

// Verifica se os valores dos digitos verificadores conferem
   DV = DIGITO[9] * 10 + DIGITO[10];
   if (DV != DV_INFORMADO) {
      return false;
   } else {
      return true;
   }
    
}

function autoskipCpf(e, el, tamanho){
	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
   var key = (window.Event) ? e.which : e.keyCode;
   var keyCode = (isNN) ? e.which : e.keyCode; 
   //var el = e.srcElement;
   var valorFireFox = String.fromCharCode(key);
   tipos = "select,text,textarea,checkbox,radio,select-one";
	var filter = (isNN) ? [0,8,9,16,17,18,35,36,37,38,39,40,46] : [0,8,9,16,17,18,35,36,37,38,39,40,46];
	/*if(key == 13){
	var i = 0;
         while(el != el.form.elements[i]) i++;					
	      //Procura proximo elemento que possa receber foco
			i++;
			for( ; i < el.form.elements.length; i++){
				el = el.form[i];
				if((el.tagName == "INPUT" || el.tagName == "SELECT") && tipos.indexOf(el.type) > -1 && !(el.readOnly || el.disabled)){
				   el.focus();
				   break;
				}
			}
   }else*/ if (el != undefined && (key != 8 && key != 0)){
      //Verifica se usuario atingiu limite do campo
      if (el.value.length >= tamanho && !containsElement(filter,keyCode)) {
         var i = 0;
         while(el != el.form.elements[i]) i++;					
	      //Procura proximo elemento que possa receber foco
			i++;
			for( ; i < el.form.elements.length; i++){
				el = el.form[i];
				if((el.tagName == "INPUT" || el.tagName == "SELECT") && tipos.indexOf(el.type) > -1 && !(el.readOnly || el.disabled)){
				   el.focus();
				   break;
				}
			}
		}
	}
}
function formataCNPB(el) { 
	vr = el.value; 
	tam = vr.length;
	if (vr.indexOf(".") == -1) {
		if(tam > 9){
			el.value = vr.substring(0, 2) + '.' + vr.substring(2, 5) + '.' + vr.substring(5, 8) + '-' + vr.substring(8);
		}
	}
}
//funcao usada para calcular o mes/ano final de acordo com a quantidade de parcelas
function calculaMesAnoFinal( mesAnoInicial , numeroParcelas, campoRetorno){
	f = document.forms[0];
	var data;
	var valor = mesAnoInicial.value;
	var campo = eval("document.forms[0].elements['"+campoRetorno+"']");
	if(valor != '' && f.numeroParcelas != ''){
		data = new Date();
		data.setMonth(valor.substring(0,2) - 1,1);
		data.setYear(valor.substring(3));
		data.setMonth(data.getMonth() + Number(document.forms[0].numeroParcelas.value));
		mes = data.getMonth()+1;
		mesStr = new String(mes);
		if(mesStr.length < 2){
			mesStr = '0'+mesStr;
		}
		var str = mesStr+'/'+data.getYear();
		if(campo)
			campo.value = str;
		else
			return str;
	}
}

//M?t?do que faz o ajuste din?mico da tabela com seu cabe?alho.
//Felipe Reis 29-07-2008 
function ajustaTabelaDetalhe(){
	
		var ar = String("190,95,95,75,75,75,105").split(",");		

		var objcabecalho = document.getElementById("cabecalho");
		var objtabela = document.getElementById("tabela");
		
		//detalhe
		var objtr1 = objtabela.getElementsByTagName("tr")[0];
		
		var tamanhoTr = objtabela.getElementsByTagName("tr").length;
		var tamanhoTd = objtr1.getElementsByTagName("td").length;

		
		for(pos = 0; pos < tamanhoTr; pos++){
			//objtr1.getElementsByTagName("td")[2]
			var objtr1 = objtabela.getElementsByTagName("tr")[pos];
			var objtd1 = objtr1.getElementsByTagName("td")[6];
			var objtd12 = objtr1.getElementsByTagName("td")[0];
			
			
			if(objtd12.innerHTML.length > 76){
				objtd12.title = objtd12.innerHTML;
				objtd12.innerHTML = objtd12.innerHTML.substring(0,76) + "...";
			}
			
			obja = objtd1.getElementsByTagName("a");
			if (obja.length > 0) {
				obja = obja[0];
				if (window.addEventListener){
					if (obja.innerHTML.length > 17) {
						obja.title = obja.innerHTML;
						obja.innerHTML = obja.innerHTML.substr(0,17) + "...";
					}
				}
				else if (window.attachEvent){
					if (obja.innerText.length > 17) {
						obja.title = obja.innerText;
						obja.innerText = obja.innerText.substring(1,17) + "...";
					}
				}
			}
		}

		//cabecalho
		var objtr2 = objcabecalho.getElementsByTagName("tr")[0];

		for(pos = 0; pos < tamanhoTd; pos++){
		
			var objtd1 = objtr1.getElementsByTagName("td")[pos];
			var objtd2 = objtr2.getElementsByTagName("td")[pos];
			//objtd2.width = objtd1.clientWidth;
			objtd2.width = ar[pos];
			objtd1.width = ar[pos];
			

		}
		document.getElementById("cabecalho").style.display = 'block';
}

function formataSolicitacao(event, eu) {
	Tecla = Tecla = event.which;
	if (Tecla == null)
		Tecla = event.keyCode;	
		
	 if (Tecla != 8 ){
	 	if (Tecla != 46){
			if (eu.value.length < 15) {
				if(eu.value.length == 11 ){
					eu.value += "/";
				}
			}
		}	
	}
}

function SoNumerosCtrl(event) {
	Tecla = event.which;		
	if (Tecla == null)
		Tecla = event.keyCode;		
	if (Tecla >= 48 && Tecla <= 57)
		return true;
	if (Tecla == 8)
		return true;	 
	
	return false;
}

function sonumeroTelefone(e) {
var key = '';
var strCheck = '0123456789-/ ';
var whichCode = (window.Event) ? e.which : e.keyCode;
if (whichCode == 13) return true;  // Enter
if (whichCode == 8) return true;  // BackSpace
if (whichCode == 0) return true;  // Del
key = String.fromCharCode(whichCode);  // Get key value from key code
if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
}

function mascaraNumeroSolicitacao(campo, e) {
    var casas = 4;
	var milSep = '';
	var decSep = '/';
	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
			return true; //sai da funcao, validando a tecla
	}

	if (code == 13) {
		if (campo.value != '') {
			completaComZeros(campo, 16);
		} 
		return false;
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

function completaComZeros(obj,tamanho){
	var campo = obj.value;
	if (campo != ''){
		while(campo.length < tamanho){
			campo = "0" + campo;
		}
		obj.value = campo;
	}
}

String.prototype.trim = function()
{
return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

/**
* Funcao de Formatacao de numeros decimais. Corrige um problema com valores
* come�ados com "0,0", mas "arredonda" quando o n�mero � grande.
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
	if (isNaN(key)) return false;  //N�o � numero, sai da funcao
	if(campo.maxLength <= campo.value.length) return false;//trata erro de casas
	
	var i = j = 0;
	var len = campo.value.length;
	var len2 = 0;
	var aux = aux2 = '';
	
	milSep = typeof milSep != "undefined" ? milSep : "."; //se separadores forem nulos,
	decSep = typeof decSep != "undefined" ? decSep : ",";//especifica separadores padr�es
	
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
	return false;
}

function valData(dataForm){
	var data = dataForm.value;
	day = data.substring(0,2);
	month = data.substring(3,5);
	year = data.substring(6,10);

	if(parseInt(day) == 0 || parseInt(month) == 0 || parseInt(year) == 0) {
		swal('Data inválida!');
		dataForm.value = '';
	}

	if(parseInt(month) > 12) {
		swal('Data inválida!');
		dataForm.value = '';
	}

	if( (month==01) || (month==03) || (month==05) || (month==07) || (month==08) || (month==10) || (month==12) )    {
		if( (day < 01) || (day > 31) ){
			swal('Data inválida!');
			dataForm.value = '';
		}
	} else if( (month==04) || (month==06) || (month==09) || (month==11) ){//mes com 30 dias
		if( (day < 01) || (day > 30) ){
			swal('Data inválida!');
			dataForm.value = '';
		}
	} else if( (month==02) ){//February and leap year
		if( (year % 4 == 0) && ( (year % 100 != 0) || (year % 400 == 0) ) ){
			if( (day < 01) || (day > 29) ){
				swal('Data inválida!');
				dataForm.value = '';
			}
		} else {		
			if( (day < 01) || (day > 28) ){
				swal('Data inválida!');
				dataForm.value = '';
			}
		}
	}
}
