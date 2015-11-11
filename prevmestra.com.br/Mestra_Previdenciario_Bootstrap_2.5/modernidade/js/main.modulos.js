$(document).ready(function()
{
    $('.menu-modulos > li > a').hover(function()
    {
        $('.active').removeClass('active');
        $(this).addClass('active');
    });
    $('.sub-menu').each(function(){

	var qtdModulos = $(this).find('li').length;
	var newWidth = (qtdModulos*92)+2;
	newWidth = (newWidth > 370) ? 370 : newWidth;
	//console.log("w: "+newWidth);
	$(this).css('width', newWidth+"px");

    })
});