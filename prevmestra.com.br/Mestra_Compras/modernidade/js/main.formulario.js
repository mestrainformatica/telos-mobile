$(document).ready(function()
{
    var secao_text = $('.secao').eq(0).text();
    $('#menuImpressaoDiv').prepend('<p>'+secao_text+'</p>')
    
    var menu_width = $('#menuDiv').width();
    
    $('.logo-div').width(menu_width);
    
    $(window).resize(function()
    {
        menu_width = $('#menuDiv').width();
        $('.logo-div').width(menu_width);
    });
});