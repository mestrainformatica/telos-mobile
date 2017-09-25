$(document).ready(function() {

    $(".numerico").keyup(function () { 
        this.value = this.value.replace(/[^0-9]/g,'');
    });
    
    $('.valor').priceFormat({
		prefix: '',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
    
    $(".datepicker").mask('99/99/9999');

});
