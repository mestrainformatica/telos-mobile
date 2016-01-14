
/*
    Addons
 */

/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
( function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ "../widgets/datepicker" ], factory );
    } else {

        // Browser globals
        factory( jQuery.datepicker );
    }
}( function( datepicker ) {

datepicker.regional[ "pt-BR" ] = {
    closeText: "Fechar",
    prevText: "&#x3C;Anterior",
    nextText: "Pr&oacute;ximo&#x3E;",
    currentText: "Hoje",
    monthNames: [ "Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez" ],
    dayNames: [ "Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado" ],
    dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sab" ],
    dayNamesMin: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sab" ],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "" };
datepicker.setDefaults( datepicker.regional[ "pt-BR" ] );

return datepicker.regional[ "pt-BR" ];

} ) );


$(function(){

	$('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    $(".datepicker").blur(function(){
        val = $(this).val();
        val1 = Date.parse(val);
        if (isNaN(val1)==true && (val!='' && val != '__/__/____')){
        	alert("Data Inv\341lida !");
           $(this).val('');
        }
    });
	$('input.datepicker').parent().addClass('right-addon').addClass('inner-addon');

})