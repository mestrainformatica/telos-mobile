var framekiller = true;

$(document).ready(function()
{
    var secao_text = $('.secao').first().text();
    var titulo_first = $('.titulo').first();
    
    titulo_first.addClass('first');
    titulo_first.children('strong').children('font').text(secao_text);
    titulo_first.parent().css({"border-bottom": "1px solid #e0e0e0"});
    
    $('.secao').first().css({"display": "none"});
    
    var menu_width = $('#menuDiv').width();
    
    $('.logo-div').width(menu_width);
    
    $(window).resize(function()
    {
        menu_width = $('#menuDiv').width();
        $('.logo-div').width(menu_width);
    });

    $( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
    });

    //Impede que a pagina seja chamada por um iframe
    if (framekiller && top != self) {
    	alert("Framekiller");
    	top.location = self.location;
    }
    /**
     * Alterações de 1 e 2 de fevereiro de 2018
     * Ajustes no comportamento do menu para ficar Fixed e Stickyheader
     * Author: Richard Barros @homemmaquina;
     */

    /*
        Elementos relevantes:
        
     */    
    $thisStickyTitle = $('#layout_col_principal .titulo.first').parent().parent().parent();
    $thisStickyTitle.addClass('stickyTitle');
    $thisStickyTitle.parent().prepend('<div class="stickyTitleClone"></div>');

    if ($('#DIV_MENSAGEM_FLUTUANTE').is(':visible')){
        $('#botaoRecuperaParticipante').addClass('bigger-margin')
    }
    if($('#botaoRecuperaParticipante')) {
        $('#idTemMenssagemExibida').on('click', function(){
            $('#DIV_MENSAGEM_FLUTUANTE').remove();
            $('#botaoRecuperaParticipante').removeClass('bigger-margin');
            // $('#botaoRecuperaParticipante').addClass('smaller-margin');
    });
    }
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:first-child > img').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > img').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1)').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2)').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(1)').remove();
    $('#DIV_MENSAGEM_FLUTUANTE > table > tbody > tr > td:nth-child(2)').addClass('close-btn');
});