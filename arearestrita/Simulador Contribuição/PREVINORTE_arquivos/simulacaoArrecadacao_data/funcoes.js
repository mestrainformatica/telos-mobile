
var valida_cpf = function(cpf){
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11)
            return false;
      for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1))
                  {
                  digitos_iguais = 0;
                  break;
                  }
      if (!digitos_iguais)
            {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                  soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                  return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                  soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                  return false;
            return true;
            }
      else
            return false;
}

$(document).ready(function(){

	var flag = 0;	
	$("#menu > ul > li").mouseover(function(){
		$(".children").hide();
		if (flag == 0){
		$(this).children(".children").show();
		}
	});
	$("#menu ul li").has('ul').addClass("hasmenu");
	$("#menu > ul > li.hasmenu > a").click(function(){
			return false;
	});
	
	$("#menu > ul ").click(function(){
		//return false;
	});
	
	$("#navid a").mouseover(function(){
		$(".children").hide();
	});
	
	$("#navid a").click(function(){
		$("#login").show();
		flag = 1;
		$(".cpf").focus();
	});
	
	$("#login a.fechar").click(function(){
		$("#login").hide();
		flag = 0;
	});
	
	$("#menurestrito > li").mouseover(function(){
		$(".children").hide();
		$(this).children(".children").show();
		
	});
	$("#menurestrito li").has('ul').addClass("hasmenu");
	
	$("#menurestrito > li.hasmenu > a").click(function(){
		return false;
	});
	
	$("#menurestrito").click(function(){
		//return false;
	});
	
var meuintervalo;
 $('.children, #menu ul li, #menurestrito ul li').mouseout(function(){
 
  clearInterval(meuintervalo);
  meuintervalo = setTimeout(function(){
   
   $(".children").hide();
  
  }, 400);
 
 });
 $('#menu a, #menurestrito a').mouseover(function(){
  clearInterval(meuintervalo);
 });
	$('.obrigatorio').append('<i> *</i>');
	
	
	$("table tbody tr:nth-child(2n) td, table tbody tr:nth-child(2n) th").addClass("linhaPar");
	
		if ($('.campocpf').length > 0){
	
		$('.campocpf').mask('99999999999',{completed:function(){ $('.senha').focus(); }});
	$('.offline form').submit(function(){
 if (!valida_cpf($('.campocpf').val())) {
  alert('Por favor preencha um CPF valido.');
  return false;
  void(0);
 }
});
$('.campocpf').blur(function(){
 if (!valida_cpf($('.campocpf').val())) {
  alert('Por favor preencha um CPF valido.');
  
  return false;
 }
});
	}
});