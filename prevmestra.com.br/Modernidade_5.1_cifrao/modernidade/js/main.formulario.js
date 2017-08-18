$(document).ready(function()
{   

	iniciarMenu();

    $('input.datepicker').parent().addClass('right-addon').addClass('inner-addon').append('<i class="icon icon-calendar3"></i>');

});
// fim do document.ready()

$(document).scroll(function () {
    $("#conteudo.menu-collapsed #left-column .menu-title").affix({offset: 80});
});

function iniciarMenu() {
    if($(window).width() < 991){
        $('.header-modernidade .navbar-right span.txt').hide();
    }

    var appendLogout;
    var logoutHtml =  $('.header-modernidade .navbar-right').html();

    if($(window).width() < 767){
        $('#conteudo').addClass('menu-collapsed');
        $('body').addClass('menu-collapsed');

        $('#menuList').append('<li class="logout menubar">'+logoutHtml+'</li>');

        appendLogout = 1;

    }

    $(window).resize(function(){
        if($(window).width() < 767){

            $('#conteudo').addClass('menu-collapsed');
            $('body').addClass('menu-collapsed');

            if(appendLogout == 1){

                $('#menuList li.logout.menubar').remove();
                appendLogout = 0;

            }else{

                $('#menuList').append('<li class="logout menubar">'+logoutHtml+'</li>');

                appendLogout = 1;
            }

            if($('#menuList li.logout.menubar').length == 0){
                  $('#menuList').append('<li class="logout menubar">'+logoutHtml+'</li>');
                  appendLogout = 1;
            }

        }else{
            $('#menuList li.logout.menubar').remove();
            appendLogout = 0;
        }

        if($(window).width() < 991){

            $('.header-modernidade .navbar-right span.txt').hide();

            logoutHtml =  $('.header-modernidade .navbar-right').html();

        }else{
            $('.header-modernidade .navbar-right span.txt').show();

            logoutHtml =  $('.header-modernidade .navbar-right').html();
        }

    });

    


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

        //alterações responsivo
        if($(window).width() < 767){


            if(!($('body').hasClass('menu-collapsed') && $('#conteudo').hasClass('menu-collapsed'))){
                
                $(document).mouseup(function (e)
                {
                    var container = $("#menuDiv");

                    if (!container.is(e.target) 
                        && container.has(e.target).length === 0) 
                    {
                        container.parents('#conteudo, body').addClass("menu-collapsed");

                    }
                });
            }
        }


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