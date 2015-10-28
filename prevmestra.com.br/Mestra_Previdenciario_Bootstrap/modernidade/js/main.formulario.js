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
});