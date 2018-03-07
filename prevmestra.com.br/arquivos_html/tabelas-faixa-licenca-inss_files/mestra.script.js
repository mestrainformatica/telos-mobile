$(document).ready(function() {

    $(".numerico").keyup(function () { 
        this.value = this.value.replace(/[^0-9]/g,'');
    });
    
    $('.valor').priceFormat({
		prefix: '',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
/*
    $(".datepicker")
    .mask(
       '99/99/9999',
       { validate: function (fld,cur) {
             // 0 == month; 1 == day; 2 == year
             var mm = parseInt(fld[1]),
                 dd = parseInt(fld[0]),
                 yy = parseInt(fld[2]),
                 vl = true;

             if (!(mm >= 0 && mm < 13) && cur == 0) {
                fld[0] = '12';
                vl = false;
             }

             if (!(dd >= 0 && dd < 31) && cur == 1) {
                fld[1] = '01';
                vl = false;
             }

             if (!(yy >= 1976 && yy < 2199) && cur == 2 && fld[2].replace('_','').length == 4) {
                fld[2] = '2012';
                vl = false;
             }

             return vl;
          }
       });
*/
});