$(document).ready(function() {

    $(".numerico").keyup(function () { 
        this.value = this.value.replace(/[^0-9]/g,'');
    });
    
    $('.valor').priceFormat({
		prefix: '',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
    
    $('.valor').css("text-align", "right");    
    $(".datepicker").mask('99/99/9999');
    $(".mascaraCEP").mask('99999-999');    
    $(".mascaraCPF").mask('999.999.999-99');
    $(".mascaraRG").mask('99.999.999-9');
    $(".mascaraCNPJ").mask("99.999.999/9999-99");
    $(".mascaraPIS").mask('999.9999.999-9');
    $(".mascaraHORA").mask('99:99');
});

function checkUncheckAlmostAll(theElement, nomeSemPrefixo) {
	var theForm = theElement.form;
	
	for (i = 0; i < theForm.length; i++) {
		if (theForm[i].type == 'checkbox' && (theForm[i].name.indexOf(nomeSemPrefixo) >= 0)) {
			theForm[i].checked = theElement.checked;
	   	}
	}
}


function serializarForm() {
    var controls = document.forms[0].elements;

    var url = '';
    for (var i=0, iLen=controls.length; i<iLen; i++) {
    	url += controls[i].name + '=' + controls[i].value + '&';
    }

    return url;
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
	} else if( (month==04) || (month==06) || (month==09) || (month==11) ){
		if( (day < 01) || (day > 30) ){
			swal('Data inválida!');
			dataForm.value = '';
		}
	} else if( (month==02) ){
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

String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
        str = str.replace(de, para);
        pos = str.indexOf(de);
    }
    return (str);
} 

replaceAll = function(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
        str = str.replace(de, para);
        pos = str.indexOf(de);
    }
    return (str);
} 

/**

######### Felipe Reis #################

######### metodo que extra? do 'google' com a funcao de formatar/desformatar/arredondar valores monet?rios moeda
Classe que formata de desformata valores monet?rios em float e formata valores de float em moeda. **/

var moeda = {
   /**
	retiraFormatacao
	Remove a formata??o de uma string de moeda e retorna um float
	@param {Object} num
    */
    desformatar: function(num){

      num = replaceAll(num, ".","");
      num = replaceAll(num, ",",".");
      return parseFloat(num);

   },



   /**

    * formatar

    *

    * Deixar um valor float no formato monet?rio

    *

    * @param {Object} num

    */

   formatar: function(num){

      x = 0;



      if(num<0){

         num = Math.abs(num);

         x = 1;

      }



      if(isNaN(num)) num = "0";

         cents = Math.floor((num*100+0.5)%100);



      num = Math.floor((num*100+0.5)/100).toString();



      if(cents < 10) cents = "0" + cents;

         for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)

            num = num.substring(0,num.length-(4*i+3))+'.'

                  +num.substring(num.length-(4*i+3));



      ret = num + ',' + cents;



      if (x == 1) ret = ' - ' + ret;return ret;

   },



   /**

    * arredondar

    *

    * @abstract Arredonda um valor quebrado para duas casas decimais.

    *

    * @param {Object} num

    */

   arredondar: function(num){

       return Math.round(num*Math.pow(10,2))/Math.pow(10,2);

   }

}