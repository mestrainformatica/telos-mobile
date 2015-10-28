//############################# LOADING ##########################################################
//############################ .js respons?vel pela manipula??o da anima??o do loading ###########
//############################ Felipe Reis 09-02-2009 09:30 ######################################

//###########inicializando vari?veis
var _loadTimer;
var _loadPos = 0;
var _loadDir = 0;
var _loadLen = 0;

//########## Anima a barra de progresso
function __loadAnima(){


	var elem = document.getElementById("barra_progresso");
	if(elem != null){
		if (_loadPos==0) _loadLen += _loadDir;
		if (_loadLen>32 || _loadPos>135) _loadPos += _loadDir;
		if (_loadPos>135) _loadLen -= _loadDir;
		if (_loadPos>135 && _loadLen==0) _loadPos=0;
		elem.style.left		= _loadPos;
		elem.style.width	= _loadLen;
	}
}

//########## Esconde o carregador
function __loadEsconde(){
	this.clearInterval(_loadTimer);
	var objLoader = document.getElementById("carregador_geral");
	
	if(objLoader){
		objLoader.style.display	="none";
		objLoader.style.visibility ="hidden";
	}
	
	var objLoader1 = document.getElementById("carregador_pai");
	
	if(objLoader1){
		objLoader1.style.display ="none";
		objLoader1.style.visibility ="hidden";
	}
}

//########## Inicializa Anima??o
function mostraLoading(){
		var objLoader = document.getElementById("carregador_geral");
		objLoader.style.display		="";
		objLoader.style.visibility	="visible";
		
		var objLoader1 = document.getElementById("carregador_pai");
		objLoader1.style.display		="";
		objLoader1.style.visibility	="visible";
		
		_loadPos	= 0;
		_loadDir	= 2;
		_loadLen	= 0;
		this.clearInterval(_loadTimer);
		_loadTimer = setInterval(__loadAnima,1);
}

//############## Controle de exibi??o ##############################
function iniciaEventos(form){
	
	if (window.addEventListener){
		window.addEventListener("submit", mostraLoading,true); 
		window.addEventListener("load", __loadEsconde, false);
	}else{
		if(form){
			form.attachEvent("onsubmit", mostraLoading);
		}
			
		window.attachEvent("onload", __loadEsconde);
	}
}

//############## Controle de exibi??o ##############################
function removeEventoLoading(form){
	if (window.addEventListener){
		window.addEventListener("submit", __loadEsconde,true); 
		window.addEventListener("load", __loadEsconde, false);
	}else{
		if(form)
			form.attachEvent("onsubmit", __loadEsconde);

		window.attachEvent("onload", __loadEsconde);
	}
}