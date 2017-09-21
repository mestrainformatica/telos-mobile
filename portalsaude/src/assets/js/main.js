(function($) {

	"use strict";	

  	$(".main-menu a").click(function(){
		var id =  $(this).attr('class');
		id = id.split('-');
		$('a.active').removeClass('active');
    	$(this).addClass('active');
		$("#menu-container .content").slideUp('slow');
		$("#menu-container #menu-"+id[1]).slideDown('slow');		
		$("#menu-container .homepage").slideUp('slow');
		return false;
	});


	$(".logo-holder a").click(function(){
		$("#nav").animate({marginTop:'56%'}, "slow");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .homepage").slideDown('slow');
		$(".logo-top-margin").animate({marginLeft:'45%'}, "slow");
		$(".logo-top-margin").animate({marginTop:'120px'}, "slow");
		document.getElementById("btn_limpar").click();
		return false;
	});
	$(".main-menu a.homebutton").click(function(){
		$("#nav").animate({marginTop:'62%'}, "slow");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .consulte-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		document.getElementById("btn_limpar1").click();		
		return false;
	});

	$(".main-menu a.aboutbutton").click(function(){
		$("#nav").animate({marginTop:'62%'}, "slow");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .email-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		document.getElementById("btn_limpar2").click();
		return false;
	});

	$(".main-menu a.projectbutton").click(function(){
		$("#nav").animate({marginTop:'62%'}, "slow");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .gallery-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		document.getElementById("btn_limpar3").click();
		return false;
	});

	$(".main-menu a.contactbutton").click(function(){
		$("#nav").animate({marginTop:'62%'}, "slow");
		$("#menu-container .content").fadeOut();
		$("#menu-container .contact-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
		return false;
	});

	$('.toggle-menu').click(function(){
        $('.show-menu').stop(true,true).slideToggle();
        return false;
    });

    $('.show-menu a').click(function() {
    	$('.show-menu').fadeOut('slow');
    });


})(jQuery);