// JavaScript Document

mostrarAnimaAjax = function(obj)
{
	//mestraAjaxLog.addMsg('ENTROU NA FUNCAO mostrarAnimaAjax');
	
	if (window.AnimaAjax_Mestra_mostrarAnimacao)
	{   
		AnimaAjax_Mestra_iniciar();
	}
	
	AnimaAjax_Mestra_mostrarAnimacao(obj);
}
//#############################
//### Esconde objeto animado.
//#############################
esconderAnimaAjax = function()
{
	if (window.AnimaAjax_Mestra_mostrarAnimacao)
	{   
		AnimaAjax_Mestra_iniciar();
	}
	AnimaAjax_Mestra_esconderAnimacao();
}

//Caminho da imagem que representa o ?cone do ajax
var hostdogifanimado_AnimaAjax = '/arearestrita/participantes/includes/indicator.gif';
var ns = document.layers;
var ie = document.all;
var ns6 = (document.getElementById && !document.all);
var block;

//#####################################
//M?todo que inicia a animacao do ajax
//#####################################
function AnimaAjax_Mestra_iniciar(){
	objDiv = document.body.appendChild(document.createElement("div"));
	objimg = objDiv.appendChild(document.createElement("img"));
	objDiv.id = "ball";
	objDiv.style.position = "absolute";
	objDiv.style.visibility = "hidden";
	if (window.hostdogifanimado_AnimaAjax)
		hostdogifanimado_AnimaAjax = window.hostdogifanimado_AnimaAjax;
	   	objimg.src = hostdogifanimado_AnimaAjax;
		
	if(ie) {	
	  block = document.getElementById('ball').style;
	} else if(ns) {
		block = document.layers['ball'];
		document.captureEvents(Event.MOUSEMOVE);
	} else {	
  	  block = document.getElementById('ball').style;
	}
}
//###########################	
// ######## Felipe Reis #####
// Mostra ?cone ajax da tela	
// obj = campo da tela (this)
//###########################
function AnimaAjax_Mestra_mostrarAnimacao(obj){
	
	var objClicado = getPosicaoElemento(obj);
	posWidth = objClicado.width+5;
	posx = objClicado.left+posWidth;
	posy = objClicado.top;

    block.left = posx;
	block.top = posy;
			
	block.visibility = "visible";
			 
}

//############################
// ######## Felipe Reis
// Esconte ?cone ajax da tela	
//############################	
function AnimaAjax_Mestra_esconderAnimacao(){
	block.visibility = "hidden";
}
	
//############################################################################################
// ######## Felipe Reis ######################################################################
// Recupera a posicao do campo na tela, para que o ?cone do ajax seja mostrado ao lado deste.
// obj = campo da tela (this)
//############################################################################################
function getPosicaoElemento(obj){
   var offsetTrail = obj;
   var offsetLeft = 0;
   var offsetTop = 0;
   var offsetWidth = 0;
   offsetWidth = offsetTrail.offsetWidth;
   while (offsetTrail) {
       offsetLeft += offsetTrail.offsetLeft;
       offsetTop += offsetTrail.offsetTop;
       offsetTrail = offsetTrail.offsetParent;
   }
   if (navigator.userAgent.indexOf("Mac") != -1 && 
       typeof document.body.leftMargin != "undefined") {
       offsetLeft += document.body.leftMargin;
       offsetTop += document.body.topMargin;
   }
   return {left:offsetLeft, top:offsetTop, width:offsetWidth};
}
///############################################################
// ######## Fim Anima??o do ajax #############
///############################################################

//-->