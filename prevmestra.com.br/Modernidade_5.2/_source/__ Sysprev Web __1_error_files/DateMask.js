/**
 * Sobrescrita de JS de Data
 * 
 */

var dataMaskType = '00/00/0000';
var NNav = ((navigator.appName == "Netscape"));

/**
 * Efetua a sobrescrita do js AppGeral.js que contem a chamada da function DateFormat, com o intuito de 
 * centralizar as informações de mascara de data e retirar o 'bug' da perca de um caracter.
 * 
 * @param vDateInput
 * @param vDateValue
 * @param e
 * @param dateCheck
 * @return
 */
function DateFormat(vDateInput, vDateValue, e, dateCheck){
	if(isBlankOrNull(vDateValue) && (vDateValue.length == 10 || e.type == 'blur')){
		validaDataOnblur(vDateInput);
	}else if(vDateValue != undefined && vDateValue != 'undefined' && vDateValue != '' && (vDateValue.length < 10 && e.type == 'blur')){
		alert('Data inv\xE1lida.');
		return false;
	}else{
		return MascaraData(vDateInput, e);
	}
}

/**
 * Valida o conteúdo do campo
 * @param value
 * @return
 */
function isBlankOrNull(value){
	return value != null && value != '' && value != undefined ? true : false;
}

/**
 * Valida os dados de data no onblur
 * @param campo
 * @return
 */
function validaDataOnblur(campo) {
	var date = campo.value;
	var ardt=new Array;
	var ExpReg=new RegExp('(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}');
	ardt=date.split("/");
	erro=false;
	if ( date.search(ExpReg)==-1){
		erro = true;
		}
	else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
		erro = true;
	else if ( ardt[1]==2) {
		if ((ardt[0]>28)&&((ardt[2]%4)!=0))
			erro = true;
		if ((ardt[0]>29)&&((ardt[2]%4)==0))
			erro = true;
	}
	if (erro) {
		campo.value = "";
		alert('Data inv\xE1lida.');
		campo.focus();
		return false;
	}
	return true;
}

/**
 * Efetua a mascada de data 
 * @param data
 * @param event
 * @return
 */
function MascaraData(data, event){
    if(!mascaraInteiro(event)){
            event.returnValue = false;
            var aux = data.value;
            data.value = onlyNumeric(data.value);
    }
    return formataCampo(data, dataMaskType, event);
}

/**
 * valida data
 * @param data
 * @return
 */
function ValidaData(data){
    exp = /\d{2}\/\d{2}\/\d{4}/
    if(!exp.test(data.value)){
       alert('Data Inv\xE1lida.');
    }
}

/**
 * valida numero inteiro com mascara
 * @return
 */
function mascaraInteiro(event){
    if (new Number(event.keyCode) < 48 || new Number(event.keyCode) > 57){
    		event.returnValue = false;
            return false;
    }
    return true;
}


/**
 * formata de forma generica os campos
 * 
 * @param campo
 * @param Mascara
 * @param evento
 * @return
 */
function formataCampo(campo, Mascara, evento) { 
    var boleanoMascara; 

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g;
    campoSoNumeros = campo.value.toString().replace( exp, "" ); 

    var posicaoCampo = 0;    
    var NovoValorCampo="";
    var TamanhoMascara = campoSoNumeros.length;; 

    if (Digitato != 8) { // backspace 
            for(i=0; i<= TamanhoMascara; i++) { 
                    boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                            || (Mascara.charAt(i) == "/")) 
                    boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") 
                                                            || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " ")) 
                    if (boleanoMascara) { 
                            NovoValorCampo += Mascara.charAt(i); 
                              TamanhoMascara++;
                    }else { 
                            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                            posicaoCampo++; 
                      }              
              }      
            campo.value = NovoValorCampo;
              return true; 
    }else { 
            return true; 
    }
}

/**
 * Efetua o replace de caracteres não numéricos
 * @param idElement
 * @param event
 * @return
 */
function onlyNumeric(valueElement){
	return valueElement.replace(/[^\d]/gi,'');
}

/**
 * Function de sobrescrita da function principal da framework que é responspavel pela 
 * formatação dos campos DATA do sistema.
 * @param campo
 * @param evt
 * @return
 */
function formataData(campoId,evt) {
	/*
	 * Setas de direção -  KeyCode - 37 38 39 40
	 * Backspace - KeyCode - 8
	 */
	
	if(NNav)
        var tecla = evt.which;
    else
        var tecla = evt.keyCode;

	var campo;
	if($('#'+campoId).val() != null && $('#'+campoId).val() != '' && $('#'+campoId).val() != undefined && $('#'+campoId).val() != 'undefined'){
		campo = $('#'+campoId);
	}else{
		campo = $('input[name='+campoId+']');
	}
		
	if(tecla != 37 && 
	   tecla != 38 &&
	   tecla != 39 &&
	   tecla != 40 &&
	   tecla != 8  &&
	  ((tecla > 47  && tecla < 58) || (tecla > 95 && tecla < 106))){

		var vr = campo.val();
		var maxLength = campo.attr('maxlength') != null && campo.attr('maxlength') != undefined && campo.attr('maxlength') != 'undefined' && campo.attr('maxlength') != '' ? new Number(campo.attr('maxlength')) : 0;
		if((vr != null && vr != '' && vr != undefined && vr != 'undefined') && (maxLength != null && maxLength != 0 && vr.length <= maxLength)){
	        vr = vr.replace( '.', '' );
	        vr = vr.replace( '/', '' );
	        vr = vr.replace( '/', '' );
	        vr = vr.replace( '/', '' );
	        
	        var tam = vr.length;
			
	        if ( tam > 2 && tam < 5 ){
	    		vr = vr.substr( 0, 2 ) + '/' + vr.substr(2, tam );
	        }else if ( tam >= 5 && tam <= 10 ){
	            vr = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 3 );
	        }
			
			campo.val(vr);
		}
	}
	
	return false;
}