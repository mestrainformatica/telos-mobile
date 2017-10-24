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


});

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