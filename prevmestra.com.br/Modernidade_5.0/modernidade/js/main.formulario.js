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

    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' }).change(function () {
         val = $(this).val();
         date = val.split('/');
         setTimeout(function () { 
            
            val1 = Date.parse(date[2]+'-'+date[1]+'-'+date[0]);
            if ((isNaN(val1)==true && (val!='' && val != '__/__/____')) || (val.length < 10)) {
               swal("Data inválida");
               $(this).val('');
            }
        })
    });
    $('.chosen').chosen({width: '100%'});

    $("#menuDiv .menu-title").click(function () {
        $(this).parents('#conteudo, body').toggleClass("menu-collapsed");
    });
    /*
        Tooltipster
     */
    $('input.input-icon, .menu_acoes button').tooltipster({
        'hideOnClick': true,
        'position': 'bottom',
        'speed':100,
        'touchdevices':false,
        'theme':'tooltipster-light'
    });
    $('input.datepicker').parent().addClass('right-addon').addClass('inner-addon').append('<i class="icon icon-calendar3"></i>');
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