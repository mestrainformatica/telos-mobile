$(document).ready(function()
{
    //var secao_text = $('.secao').first().text();
    var titulo_first = $('.titulo').first();
    
    titulo_first.addClass('first');
    titulo_first.children('strong').children('font').html('&nbsp;');
    titulo_first.parent().css({"border-bottom": "1px solid #e0e0e0"});
    
    var menu_width = $('#menuDiv').width();
    
    $('.logo-div').width(menu_width);
    
    $(window).resize(function()
    {
        menu_width = $('#menuDiv').width();
        $('.logo-div').width(menu_width);
    });

    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
    $('.chosen').chosen();

    $("#menuDiv .menu-title").click(function () {
        $(this).parents('#conteudo').toggleClass("menu-collapsed");
    });
});
// fim do document.ready()

$(document).scroll(function () {
    $("#conteudo.menu-collapsed #left-column .menu-title").affix({offset: 80});
});


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
    nextText: "Próximo&#x3E;",
    currentText: "Hoje",
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez" ],
    dayNames: [ "Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado" ],
    dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
    dayNamesMin: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "" };
datepicker.setDefaults( datepicker.regional[ "pt-BR" ] );

return datepicker.regional[ "pt-BR" ];

} ) );