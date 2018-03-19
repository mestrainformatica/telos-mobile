$(document).ready(function()
{   

    $( document ).on( 'focus', ':input', function(){

        $( this ).attr( 'autocomplete', 'off' );

    });

	iniciarMenu();


    // $('#DIV_MENSAGEM_FLUTUANTE').remove();
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

    $("#menuDiv .menu-title").click(function () {
        $(this).parents('#conteudo, body').toggleClass("menu-collapsed");

        //alterações responsivo
        if($(window).width() < 767){

            if(!($('body').hasClass('menu-collapsed') && $('#conteudo').hasClass('menu-collapsed'))){
                
                $(document).mouseup(function (e)
                {
                	if($(window).width() < 767){
	                    var container = $("#menuDiv");
	
	                    if (!container.is(e.target) 
	                        && container.has(e.target).length === 0) 
	                    {
	                        container.parents('#conteudo, body').addClass("menu-collapsed");
	
	                    }
                	}
                });
            }
        }
    });
}