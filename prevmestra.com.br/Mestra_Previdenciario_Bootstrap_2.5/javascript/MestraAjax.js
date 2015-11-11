/// ############################################################################
/// ########################## IN?CIO AJAX #####################################
/// ############################################################################
///             **** Criado por Felipe Reis Data: 04/09/2008 ****
/// ############################################################################

/// ############################################################
/// ########## IN?CIO LOG AJAX #################################
/// ############################################################
/// ############ Felipe Reis 02/10/2008 ########################
function MestraAjaxLog (){
	
	//isEnabledClienteDebug = chave para abilitar/desabilitar debug com alert
	this.isEnabledClienteDebug = false;
	
	//isEnabledClienteExcessao = chave para abilitar/desabilitar excessao com alert
	this.isEnabledClienteExcessao = true;
	
	//isEnabledServidor = chave para abilitar/desabilitar debug do console
	this.isEnabledServidor = false;
	
	this.msgDebug = '';
	this.contador = 0;
	
	//determina a quantidade limite para que os debus sejam impressos no console, mas este s? funcionar? se isEnabledServidor = true
	this.limiteMsg = 5;
}
var mestraAjaxLog = new MestraAjaxLog();
var xmlhttp = null;
var ARxmlhttp = new Array();
var ARxmlhttpMR = new Array();
var ARexecutarAjaxOutrosEventos = new Array();
var ARexecutarAjaxCampoDependente = new Array();

///################################################################################
/// m?todo que efetua requisicao via ajax para logar no console#### Felipe Reis ###
// - msg = Mensagem que sera enviada para console do tomcat
//#################################################################################
function debugConsole(msg){


	strhostComp = document.forms[0].action;
	strCompletaEvento = 'Evento Debug Ajax';
	strparamestros = '&strDebug='+msg;

	mestraAjaxLog.contador = 0;

	alert(strparamestros);
	disparaAjax(strhostComp,strCompletaEvento,strparamestros, 'trataResultadoDebugAjax');

}

///###############################################################
/// m?todo que efetua o debug com alert ######### Felipe Reis ####
// - ex = excessao
// - msg = mensagem que ser? exibida para usuario
// - tipo = tipo de mensagem (E = Excessao / D = Debug)
//################################################################
MestraAjaxLog.prototype.alertaMestraAjax = function (ex, msg,tipo){

	if(tipo == 'D'){
		if(mestraAjaxLog.isEnabledClienteDebug){
			mensagem = "Debug:" + "\n" + msg;
			alert("########## "+mensagem+" ##########");
		}
	}else if(tipo == 'E'){
		if(mestraAjaxLog.isEnabledClienteExcessao){
			mensagem = "Erro inesperado no processo. Comunique o Analista de Sistemas Responsavel. \nMensagem do Sistema: " +  msg + "\n << " + ex.message + " >> ";
			alert(mensagem);
		}
	}
}

///############################################################
///m?todo que efetua o debug via console ###### Felipe Reis ###
// - msg = Mensagem que sera exibida no console do tomcat
//#############################################################
MestraAjaxLog.prototype.addMsg = function(msg){

	if(mestraAjaxLog.isEnabledServidor){
		mestraAjaxLog.msgDebug += msg + "#";
		mestraAjaxLog.contador++;
		
		mestraAjaxLog.alertaMestraAjax('','NUMERO DE MENSAGENS LIMITE PARA DEBUG DE CONSOLE: '+mestraAjaxLog.limiteMsg+'\nNUMERO DE MENSAGEN ACUMULADAS: '+mestraAjaxLog.contador,'D');

		if(mestraAjaxLog.contador >= mestraAjaxLog.limiteMsg){
			mestraAjaxLog.alertaMestraAjax('','VAI IMPRIMIR LOG NO CONSOLE COM MestraAjaxLog ','D');
			
			debugConsole(mestraAjaxLog.msgDebug.replaceAll("&","_"));	
		}
	}
}

///###################################################################################################
///m?todo que trata o resultado da requisicao feita pelo debug via console ####### Felipe Reis #######
// - resultado = Resultado retornado do metodo que efetua o debug no console do tomcat (OK = sucesso)
//####################################################################################################
trataResultadoDebugAjax = function(resultado){
	if(resultado == 'OK'){
		mestraAjaxLog.msgDebug = '';
		mestraAjaxLog.contador = 0;
	}
	
	mestraAjaxLog.contador = 0;
}
/// ############################################################
/// ########## FIM LOG AJAX ####################################
/// ############################################################

//##########################################
//####### cria OBJETO HttpRequest ##########
//##########################################
function eventoTimeout()
{
    alert("Desculpe,a requisi??o expirou ! Tente novamente.");
}

function criarHttpRequest()
{   
    var len = 0;
    var i = 0

    try 
    {
       xmlhttp = new XMLHttpRequest();
       //xmlhttp.timeout = 10800000;
       //xmlhttp.ontimeout = eventoTimeout;
            
    } catch(e) 
    {
      var msxml = ['Microsoft.XMLHTTP','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'];
      for (i=0, len = msxml.length; i < len; ++i ) 
      {
         try 
         {
           xmlhttp = new ActiveXObject(msxml[i]);
           break;
         } catch(e) {
	       	mestraAjaxLog.alertaMestraAjax(e,'Erro Ajax','E');
	       	exconderAnimaAjax();
         }
      }
     }
     mestraAjaxLog.alertaMestraAjax('','CRIOU OBJETO XMLHttpRequest','D');
        
     if (xmlhttp == null)
       return false;
        
  return true;
}

//####### disparaAjax #########################################################################################################################################################
// M?todo que iniia o ajax disparado de acordo com os parametros passados
/* - strhostComp = host/nome do ActionMapping da rotina vigente 
   - strCompletaEvento = nome do evento a ser disparado 
   - strparamestros = string de parametros a ser passado (ex:&codigoFundo = documento.forms[0].codigoFundo + &codigoPatrocinadora = documento.forms[0].codigoPatrocinadora ...)
   - metodoRespota = nome do m?todo em que ser? tratado a resposta obtida via ajax */
//#############################################################################################################################################################################
function disparaAjax(strhostComp,strCompletaEvento,strparamestros, metodoRespota){
		criarHttpRequest();
		var hostCompleto = strhostComp;

		//Armazena xmlhttp em um array para que mais de uma requisicao ajax possa ser efetuada sem ser perdida.
		ARxmlhttp[ARxmlhttp.length + 1] = xmlhttp;
		
		//Armazena metodoRespota em um array para que mais de uma requisicao ajax possa ser efetuada sem ser perdida.
		ARxmlhttpMR[ARxmlhttpMR.length + 1] = metodoRespota;
		
		parametros = "evento=" + strCompletaEvento;
		parametros = parametros + strparamestros;
		
		mestraAjaxLog.alertaMestraAjax('','PARAMETROS: '+parametros,'D');
		mestraAjaxLog.alertaMestraAjax('','TAMANHO PARAMETROS: '+parametros.length,'D');
		mestraAjaxLog.alertaMestraAjax('','METODO DE RESPOSTA: '+metodoRespota,'D');

		xmlhttp.onreadystatechange = function(){ processaRespostaAjax(metodoRespota, xmlhttp); };
      	xmlhttp.open("post", hostCompleto, true);
                              
      	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
     	xmlhttp.setRequestHeader("Content-Length", parametros.length);
    	xmlhttp.setRequestHeader("Connection", "close");

	    xmlhttp.send(parametros);	    
}

//####### processaRespostaAjax ######################################################################################
// M?todo que obtem a resposta do servidor,processa e redireciona para o m?todo de tratamento informado por parametro
/* - metodoRespota = nome do m?todo em que ser? tratado a resposta obtida via ajax */ 
//###################################################################################################################
function processaRespostaAjax(metodoRespota, objhttp)
{
   /*for (var i = 0; i < ARxmlhttpMR.length;i++)  {
   		if(ARxmlhttpMR[i] == metodoRespota)
   			xmlhttp = ARxmlhttp[i];
   }*/	

   var xmlhttp = objhttp;

   if (xmlhttp.readyState == 4) // Completo 
   {    
	   	if (xmlhttp.status == 200) // resposta do servidor OK
	    {
	    	mestraAjaxLog.alertaMestraAjax('','readyState: '+xmlhttp.readyState,'D');
	    	mestraAjaxLog.alertaMestraAjax('','status: '+xmlhttp.status,'D');

			try{
				exconderAnimaAjax();
			}catch(e){
				mestraAjaxLog.alertaMestraAjax(e,'ERRO AO ESCONDER ANIMACAO AJAX :','E');
			}
			try{
				mestraAjaxLog.alertaMestraAjax('','M?TODO DE RESPOSTA: '+metodoRespota,'D');
				
				if(metodoRespota != ''){
		         	eval('window.' + metodoRespota + '(xmlhttp.responseText)');
		         	mestraAjaxLog.alertaMestraAjax('','RESULTADO: '+xmlhttp.responseText,'D');
	         	}
	        }catch(e){
	        	mestraAjaxLog.alertaMestraAjax(e,'ERRO NO METODO DE TRATAMENTO DE RESPOSTA DO AJAX :'+metodoRespota+'Resultado Ajax: '+xmlhttp.responseText,'E');
	        }
	        
		}
	    else{
	    	if(xmlhttp.status != 12030){
	    		mestraAjaxLog.alertaMestraAjax('','Erro Ajax: ' + xmlhttp.status + ' - ' + xmlhttp.statusText + '; '+metodoRespota,'E');
	    		exconderAnimaAjax();
	    	}
	     }
	}
}

//####### eventoExecutaAjax ###########################################################################################################################################
//M?todo que chama o disparaAjax e recebe como parametros as informa??es necess?rias para executar a opera??o em ajax
/* - id = chave em que ser? passados as propriedade do evento que ser? executa via ajax (ex: recuperaPlano.nomeAction,recuperaPlano.nomeAction,recuperaPlano.parametros
   - metodoRespota = nome do m?todo em que ser? tratado a resposta obtida via ajax 
   - campo = objeto campo vigente (this)*/ 
//#####################################################################################################################################################################
function eventoExecutaAjax(id, metodoRespota,campo){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO eventoExecutaAjax');
	
	try{
		if(campo != null)
			mostrarAnimaAjax(campo);
	}catch(e){
		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO MOSTRAR ANIMACAO AJAX : ','E');
	}
	eval(id + ' = new Object()');
	
	try{
		executarAjax(id);
	}catch(e){
		mestraAjaxLog.alertaMestraAjax(e,'FUNCAO executarAjax NAO ENCONTRADA OU POSSUI ERROS ','E');
	}

	if (eval(id + '.nomeAction') && eval(id + '.nomeEvento') && eval(id + '.parametros'))
		disparaAjax(eval(id + '.nomeAction'), eval(id + '.nomeEvento'), eval(id + '.parametros'), metodoRespota);
	else{
		mestraAjaxLog.alertaMestraAjax('',"Nao foram informados todos os parametros necessarios ! \nPARAMETROS: "+eval(id + '.nomeAction')+eval(id + '.nomeEvento')+eval(id + '.parametros'),'D');
	}
}

//###################################################################################################################################
//M?todo inicial do ajax onde ir? comecar tudo, este que ser? chamado onde for preciso inserir ajax ######### Felipe Reis ###########
// campo = passe o objeto (this)
// id = identificador unico do evento a ser executado (ex: eventoDisparadoPeloFundo)
// metodoRespota = metodo em que o ajax retornara o resultado requisitado, ou seja, onde haver? o tratamento da string de resultados
//##################################################################################################################################

function iniciaAjax(campo,id, metodoRespota){
	if(campo == null || (campo.value != '' && (campo.value != '0' || campo.type != 'select-one'))) {
		eventoExecutaAjax(id,metodoRespota,campo);
	}
	else
		trataCampoDependente(campo.name);
}
//####################################################################################################################################
//M?todo que axecuta todos os metodos de tratamento de campo dependente que foram adicionados no array ARexecutarAjaxCampoDependente
// nomeCampo = funciona como o id, onde e dados o proprio nome do metodo para futuras comparacoes ####### Felipe Reis ################
//####################################################################################################################################
function trataCampoDependente(nomeCampo){
	//Executa M?todos ARexecutarAjaxCampoDependente
	for(p = 1; p < ARexecutarAjaxCampoDependente.length; p++){
		if(ARexecutarAjaxCampoDependente[p])
			eval("window."+ARexecutarAjaxCampoDependente[p]+"(nomeCampo)");
	}
}
//########################################################################################################
//M?todo que executa todas as chamadas de ajax adicionadas no array ARexecutarAjaxOutrosEventos
// id = identificador do metodo que sera executado, ou seja, o proprio nome do metodo ### Felipe Reis ####
//########################################################################################################
function executarAjax(id){

	//Executa M?todos ARexecutarAjaxOutrosEventos
	for(i = 1; i < ARexecutarAjaxOutrosEventos.length; i++){
		if(ARexecutarAjaxOutrosEventos[i])
			eval("window."+ARexecutarAjaxOutrosEventos[i]+"(id)");
	}
}	

//###########################################################################################################################################################################
//M?todo que adiciona funcoes para serem executadas dentro de executarAjax ########## Felipe Reis ###########################################################################
// nomeFuncaoRecuperaParametros = nome da funcao para ser adicionada no bloco de fun??es que sao responsaveis por inicializar os parametros necessario de uma chamada de ajax
//###########################################################################################################################################################################
function adicionaFuncaoRecuperaParametros(nomeFuncaoRecuperaParametros){
	if(nomeFuncaoRecuperaParametros != '')
		ARexecutarAjaxOutrosEventos[ARexecutarAjaxOutrosEventos.length+1] = nomeFuncaoRecuperaParametros;
}
//################################################################################################################################
//M?todo que adiciona funcoes para serem executadas dentro de trataCampoDependente ############# Felipe Reis #####################
// trataCampoDependente = nome da funcao para ser adicionada no bloco de fun??es que sao responsaveis tratar os campos dependentes
//################################################################################################################################
function adicionaFuncaoCampoDependente(nomeFuncaoCampoDependente){
	if(nomeFuncaoCampoDependente != '')
		ARexecutarAjaxCampoDependente[ARexecutarAjaxCampoDependente.length+1] = nomeFuncaoCampoDependente;
}	

///#########################################################################
// ######## Anima??o do ajax ###############################################
// ## Por Juscelino e Alexandre         ####################################
// ## em 14 de abril de 2008            ####################################
// ## Criar a seguinte vari?vel a p?gina de utiliza??o do ajax:
// ## hostdogifanimado_AnimaAjax com o host da gif animada.
// ## Exemplo: hostdogifanimado_AnimaAjax = 'plc/midia/indicator.gif';
// ## Mostra objeto animado no lado direito inferior do mouse
// ## Exemplo para chamada do m?todo no onclick='mostrarAnimaAjax(event);' 
// ## @Updated Felipe Reis
///#########################################################################
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
//### Esconde objetto animado.
//#############################
exconderAnimaAjax = function()
{
	if (window.AnimaAjax_Mestra_mostrarAnimacao)
	{   
		AnimaAjax_Mestra_iniciar();
	}
	AnimaAjax_Mestra_exconderAnimacao();
}

//Caminho da imagem que representa o ?cone do ajax
var hostdogifanimado_AnimaAjax = 'plc/midia/indicator.gif';
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
function AnimaAjax_Mestra_exconderAnimacao(){
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

//########################################################################################################################################################################
// ######## Felipe Reis 12/09/2008 12:58:30
	/* M?todo gen?rico para popular combos simples com c?digo+descricao por ajax.
	Par?metros:
	
	- resultado = informe o resulta obtido via AJAX, ou seja, a string contendo todos os dados recuperados.
	- campoPai = informe o campos pai, ou seja, o campo em que a combo que deseja popular depende para ser populada ( ex: Combo de Patrocinadora depende de codigoFundo).
	- campo = informe o nome dado no FORM para esta combo.
	- idValue = informe qual a posicao das strings inseridas na lista de resultados que ser? o VALUE da combo.
	- idCodigo = informe qual a posicao das strings inseridas na lista de resultados que ser? o C?DIGO DE VISUALIZA??O ( CD - DC ) da combo.
	- idDescricao = informe qual a posicao das strings inseridas na lista de resultados que ser? o DESCRI??O DE VISUALIZA??O ( CD - DC ) da combo.*/
//##########################################################################################################################################################################
function populaComboSimples(resultado,campoPai,campo,idValue,idCodigo,idDescricao){

   mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaComboSimples = Combo: '+campo);
   mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaComboSimples = Combo: '+campo,'D');
   
   try{
	   if (eval('document.forms[0].'+ campo + '.valorIdCampoPai') != eval('document.forms[0].' + campoPai + '.value'))
	   {
	        	if (eval('document.forms[0].'+ campo +'.options.length') > 1)
	        	{	
	        		for (i = eval('document.forms[0].'+ campo +'.options.length') - 1; i > 0 ; i--)
		           	{
		           		eval('document.forms[0].'+ campo +'.remove('+i+')');
		           	}
		           	mestraAjaxLog.addMsg('ENTROU NO REMOVE COMBO SIMPLES = Combo: '+campo);
	        	}

	        	trataCampoDependente(campo);

	            arResposta = resultado.split("#");
	            mestraAjaxLog.addMsg('RESULTADO populaComboSimples: '+resultado);
	            mestraAjaxLog.alertaMestraAjax('','RESULTADO populaComboSimples: '+resultado,'D');

	            tamanhoLista = arResposta.length;

	            for (i = 0; i <  tamanhoLista -1; i++){

	            	arLinha = arResposta[i].split(";");
	            	var oOption = document.createElement("OPTION");
	            	eval('document.forms[0].'+campo+'.options.add(oOption)');
					oOption.value = eval('arLinha['+idValue+']');
						
					if(idDescricao != ''){
						oOption.text = eval('arLinha['+idCodigo+']')+ ' - ' + eval('arLinha['+idDescricao+']');
					}else{
						oOption.text = eval('arLinha['+idCodigo+']');
					}
						
	            }
            	
				eval('document.forms[0].'+ campo + '.valorIdCampoPai = document.forms[0].' + campoPai + '.value');
	   }
   }catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR COMBO SIMPLES \nCOMBO: '+campo,'E');
   }
}

function populaComboSimplesAutoCarregamentoDependentes(resultado,campoPai,campo,idValue,idCodigo,idDescricao,objeto,id,metodoResposta,tipoPesquisa){

   mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaComboSimplesAutoCarregamentoDependentes = Combo: '+campo);
   mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaComboSimplesAutoCarregamentoDependentes = Combo: '+campo,'D');

   try{
	   if (eval('document.forms[0].'+ campo + '.valorIdCampoPai') != eval('document.forms[0].' + campoPai + '.value'))
	   {
	        	if (eval('document.forms[0].'+ campo +'.options.length') > 1)
	        	{	
	        		for (i = eval('document.forms[0].'+ campo +'.options.length') - 1; i > 0 ; i--)
		           	{
		           		eval('document.forms[0].'+ campo +'.remove('+i+')');
		           	}
		           	mestraAjaxLog.addMsg('ENTROU NO REMOVE COMBO SIMPLES = Combo: '+campo);
	        	}

	        	trataCampoDependente(campo);
	        	
				var tamanhoLista = 0;
					
	            arResposta = resultado.split("#");
	            mestraAjaxLog.addMsg('RESULTADO populaComboSimplesAutoCarregamentoDependentes: '+resultado);
	            mestraAjaxLog.alertaMestraAjax('','RESULTADO populaComboSimplesAutoCarregamentoDependentes: '+resultado,'D');

	            tamanhoLista = arResposta.length;
	            for (i = 0; i <  tamanhoLista -1; i++){

	            	arLinha = arResposta[i].split(";");
	            	var oOption = document.createElement("OPTION");
	            	eval('document.forms[0].'+campo+'.options.add(oOption)');
					oOption.value = eval('arLinha['+idValue+']');
						
					if(idDescricao != ''){
						oOption.text = eval('arLinha['+idCodigo+']')+ ' - ' + eval('arLinha['+idDescricao+']');
					}else{
						oOption.text = eval('arLinha['+idCodigo+']');
					}
						
	            }

	            tam = tamanhoLista -1;
	            if(tam == 1){           	
	            	var arLinhaFirst = arResposta[0].split(";");
	            	value = eval('arLinhaFirst['+idValue+']');
	            	codigo = eval('arLinhaFirst['+idCodigo+']');

					if(tipoPesquisa == 'CD')
						eval('document.forms[0].'+campo).value = codigo;
					else
						eval('document.forms[0].'+campo).value = value;

					if(objeto != '' && id != '' && metodoResposta != '' && tipoPesquisa != '')
	            		iniciaAjax(objeto,id,metodoResposta);
	            }else if(tam < 1){
	            	trataCampoDependente(objeto.name);
	            }else{
	            	trataCampoDependente(campo);
	            }
            	
				eval('document.forms[0].'+ campo + '.valorIdCampoPai = document.forms[0].' + campoPai + '.value');
	   }
   }catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR COMBO SIMPLES COM AUTO CARREGAMENTO \nCOMBO: '+campo,'E');
   }
}

//########################################################################################################################################################################
// ######## Felipe Reis 12/09/2008 12:58:45
	/* M?todo gen?rico para popular combos simples com c?digo+descricao por ajax com detalhe.
	Par?metros:
	
	- resultado = informe o resulta obtido via AJAX, ou seja, a string contendo todos os dados recuperados.
	- nomeLista = informe o nome da lista dada no FORM (ex: itensPlc,detalhes_Plc).
	- campoPai = informe o campos pai, ou seja, o campo em que a combo que deseja popular depende para ser populada ( ex: Combo de Patrocinadora depende de codigoFundo).
	- campo = informe o nome dado no FORM para esta combo.
	- idValue = informe qual a posicao das strings inseridas na lista de resultados que ser? o VALUE da combo.
	- idCodigo = informe qual a posicao das strings inseridas na lista de resultados que ser? o C?DIGO DE VISUALIZA??O ( CD - DC ) da combo.
	- idDescricao = informe qual a posicao das strings inseridas na lista de resultados que ser? o DESCRI??O DE VISUALIZA??O ( CD - DC ) da combo.*/
//##########################################################################################################################################################################
function populaComboComDetalhe(resultado,nomeLista,campoPai,campo,idValue,idCodigo,idDescricao){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaComboComDetalhe = Combo: '+campo+' Lista: '+nomeLista);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaComboComDetalhe = Combo: '+campo+' Lista: '+nomeLista,'D');
	
	try{
		var i0 = 0;
		while(eval('window.document.all("'+nomeLista+'['+i0+'].'+ campo+'")')){
		   if (eval('window.document.all("'+nomeLista+'['+i0+'].'+ campo+'").valorIdCampoPai') != eval('document.forms[0].' + campoPai + '.value'))
		   {
		        	if (eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").options.length') > 1)
		        	{
		        		for (i = eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").options.length') - 1; i > 0 ; i--){
			           		eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").remove('+i+')');
			           	}
			           	mestraAjaxLog.addMsg('ENTROU NO REMOVE COMBO COM DETALHE = Combo: '+campo+' Lista: '+nomeLista);
		        	}
		           	arResposta = resultado.split("#");
		           	mestraAjaxLog.addMsg('RESULTADO populaComboComDetalhe: '+resultado);
		           	mestraAjaxLog.alertaMestraAjax('','RESULTADO populaComboComDetalhe: '+resultado,'D');
		           	
		           	tamanhoLista = arResposta.length;

		           	for (i = 0; i < tamanhoLista - 1; i++){
		           		arLinha = arResposta[i].split(";");
		           		var oOption = document.createElement("OPTION");
	
	            		eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").options.add(oOption)');
							oOption.value = eval('arLinha['+idValue+']');

							if(idDescricao != ''){
								oOption.text = eval('arLinha['+idCodigo+']')+ ' - ' + eval('arLinha['+idDescricao+']');
							}else{
								oOption.text = eval('arLinha['+idCodigo+']');
							}
					}
					eval('window.document.all("'+nomeLista+'['+i0+'].'+ campo+'").valorIdCampoPai = document.forms[0].' + campoPai + '.value');
	
		   }
		   i0++;
	   }
   }catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR COMBO COM DETALHE \nCOMBO: '+campo+'\nDETALHE: '+nomeLista,'E');
   }
}

//########################################################################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por associar os parametros necess?rios para o evento que deve ser executado via ajax
   - id = identificador do Evento
   - nomeAction = nome da action da rotina vigente
   - nomeEvento = nome do evento ? executar 
   - StrParametros = string completa de parametros*/
//#########################################################################################################
function recuperaParametros(id,nomeAction,nomeEvento,StrParametros){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO recuperaParametros = id: '+id+' nomeAction: '+nomeAction+' nomeEvento: '+nomeEvento+' StrParametros: '+StrParametros);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO recuperaParametros = id: '+id+' nomeAction: '+nomeAction+' nomeEvento: '+nomeEvento+' StrParametros: '+StrParametros,'D');
	
	eval(id+'.nomeAction = nomeAction');
	eval(id+'.nomeEvento = nomeEvento');
	eval(id+'.parametros = StrParametros');
}

//########################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por remover ?tens de combos simples
   - campo = nome da combo que deseja remov?-la */
//#########################################################
function removeItensComboSimples(campo){
	
	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeItensComboSimples = Combo: '+campo);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeItensComboSimples = Combo: '+campo,'D');

	try{
		eval("document.forms[0]."+ campo +".valorIdCampoPai = '' ");
		var tamanho = eval('document.forms[0].'+ campo +'.options.length');

			
		for (i = tamanho - 1; i >= 0 ; i--){
		    eval('document.forms[0].'+ campo +'.remove('+i+')');
	   	}
   	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ITENS COMBO SIMPLES: \nCOMBO: '+campo,'E');
   	}
}

//##################################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por remover ?tens de combos detro de detalhes
   - nomeLista = nome da lista em que a combo se encontra 
   - campo = nome da combo que deseja remov?-lo */
//##################################################################
function removeItensComboComDetalhe(nomeLista,campo){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeItensComboComDetalhe = Combo: '+campo+' Lista: '+nomeLista);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeItensComboComDetalhe = Combo: '+campo+' Lista: '+nomeLista,'D');
	
	try{
		var i0 = 0;
		while(eval('window.document.all("'+nomeLista+'['+i0+'].'+ campo+'")')){
			eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").valorIdCampoPai = "" ');
			for (i = eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").options.length') - 1; i > 0 ; i--){
		       eval('window.document.all("'+nomeLista+'['+i0+'].'+campo+'").remove('+i+')'); 
		    }
		 	i0++;
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ITENS COMBO COM DETALHE \nCOMBO: '+campo+'\nDETALHE: '+nomeLista,'E');
   	}
}

//##############################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por remover ?tens do form com lista 
   - nomeLista = nome da lista em que a combo se encontra 
   - nomeCampo = nome da combo que deseja remov?-lo 
   - posicaoNoForm = posic?o da lista em que deseja remov?-lo */
//###############################################################
function removeItemComLista(nomeLista,nomeCampo,posicaoNoForm){
	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeItemComLista = Campo: '+nomeCampo+' Lista: '+nomeLista+ ' posicaoNoForm : '+posicaoNoForm);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeItemComLista = Campo: '+nomeCampo+' Lista: '+nomeLista+ ' posicaoNoForm : '+posicaoNoForm,'D');
	
	try{
		eval('window.document.all("'+nomeLista+'['+posicaoNoForm+'].'+nomeCampo+'").value = "" ');
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ITEN NO DETALHE \nCAMPO: '+nomeCampo+'\nDETALHE: '+nomeLista,'E');
   	}
}

//######################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por remover ?tens do form simples
   - campo = nome do campo que deseja remov?-lo */
//######################################################
function removeItem(nomeCampo){
	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeItem = Campo: '+nomeCampo);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeItem = Campo: '+nomeCampo,'D');

	try{
		if(eval("document.forms[0]."+nomeCampo)){
			eval("document.forms[0]."+nomeCampo).value = '';
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ITEN \nCAMPO : '+nomeCampo,'E');
   	}
}

//#########################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por popular um campo do form simples
   - campo = nome do campo que deseja popula-lo 
   - valor = valor a ser preenchido*/
//##########################################################
function populaItem(nomeCampo,valor){
	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaItem = Campo: '+nomeCampo+' Valor: '+valor);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaItem = Campo: '+nomeCampo+' Valor: '+valor,'D');
	
	try{
		if(eval('document.forms[0].'+nomeCampo)){
			eval('document.forms[0].'+nomeCampo).value=valor;
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR ITEN \nCAMPO :'+nomeCampo,'E');
   	}
}

//############################################################
// ######## Felipe Reis 12/09/2008 12:58:45
/* M?todo respons?vel por popular um campo do form com lista
   - nomeLista = nome da lista em que a combo se encontra 
   - nomeCampo = nome da combo que deseja popula-lo
   - posicaoNoForm = posic?o da lista em que deseja remov?-lo 
   - valor = valor a ser preenchido */
//#############################################################
function populaItemComLista(nomeLista,nomeCampo,posicaoNoForm,valor){
	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaItemComLista = Campo: '+nomeCampo+' Valor: '+valor+' Lista: '+nomeLista);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaItemComLista = Campo: '+nomeCampo+' Valor: '+valor+' Lista: '+nomeLista,'D');
	
	try{
		eval('window.document.all("'+nomeLista+'['+posicaoNoForm+'].'+nomeCampo+'").value=valor');
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR ITEN NO DETALHE \nCAMPO:'+nomeCampo+'\nDETALHE: '+nomeLista,'E');
   	}
}

//##################################################################################################
// ######## Felipe Reis 21/10/2008 19:30:45
/** M?todo respons?vel por remover elementos de uma combo
   - combo = nome da combo que deseja remover o elemtento
   - posicao = posicao do elemento na combo (ex: 0 .. 1 ou 2 ..)
   - texto = texto para comparacao e verificacao se o elemento da posicao informada ? o desejado */
//##################################################################################################
function removeElementoComboSimples(combo,posicao,texto) {

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeElementoComboSimples \nCombo: '+combo+' texto: '+texto+' posicao: '+posicao);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeElementoComboSimples \nCombo: '+combo+' texto: '+texto+' posicao: '+posicao,'D');
	
	try{
	    var opts = eval('document.forms[0].'+combo).getElementsByTagName('OPTION');
	    
	    if(opts[posicao].text == texto)
	    	eval('document.forms[0].'+combo+'.removeChild(opts[posicao])');
    }catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ELEMENTOS EM COMBO SIMPLES \nCombo: '+combo+' texto: '+texto+' posicao: '+posicao,'E');
   	}	
}

//###############################################################################################
// ######## Felipe Reis 21/10/2008 19:36:45
/** M?todo respons?vel por remover elementos de uma combo
   - combo = nome da combo que deseja remover o elemtento
   - texto = texto para comparacao e verificacao se o elemento da posicao informada ? o desejado
   - value = value do novo item que deseja incluir na combo
   - posicao = posicao do elemento na combo (ex: 0 .. 1 ou 2 ..)*/
//###############################################################################################
function insereElementoComboSimples(combo,texto,value,posicao) {

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO insereElementoComboSimples \nCombo: '+combo+' texto: '+texto+' value: '+value+' posicao: '+posicao);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO insereElementoComboSimples \nCombo: '+combo+' texto: '+texto+' value: '+value+' posicao: '+posicao,'D');
	
	try{
	    var oOption = document.createElement("OPTION");
	    var opts = eval('document.forms[0].'+combo).getElementsByTagName('OPTION');
	
		oOption.value = value;
		oOption.text = texto;
	
		if(opts[posicao] != null){
	    	if(opts[posicao].text != texto)
				eval('document.forms[0].'+combo+'.options.add(oOption,posicao)');
		}else{
			eval('document.forms[0].'+combo+'.options.add(oOption,posicao)');
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO INSERIR ELEMENTO EM COMBO SIMPLES \nCombo: '+combo+' texto: '+texto+' value: '+value+' posicao: '+posicao,'E');
   	}
}

//###############################################################################################
// ######## Felipe Reis 14/12/2008 09:30:12
function populaListaDeItensSimples(listaCampos){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos,'D');
	
	try{
		array = listaCampos.split("%");
		for(i = 0; i < array.length-1; i++){
			campo = array[i].split("=");
			populaItem(campo[0],campo[1]);
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR LISTA DE ITENS COM COMBO \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}

//###############################################################################################
// ######## Felipe Reis 05/01/2009 15:58:12
function populaListaDeItensComDetalhe(listaCampos){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos,'D');
	
	try{
		array = listaCampos.split("%");
		for(i = 0; i < array.length-1; i++){
			campo = array[i].split("=");
			window.document.all(campo[0]).value = campo[1];
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR LISTA DE CAMPOS SIMPLES \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}

function populaListaDeItensComDetalheX(listaCampos,complemento){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos,'D');
	
	try{
		array = listaCampos.split("%");
		for(i = 0; i < array.length-1; i++){
			campo = array[i].split("=");
			if(document.getElementById(complemento+campo[0])){
				window.document.getElementById(complemento+campo[0]).value = campo[1];
			}
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR LISTA DE CAMPOS SIMPLES \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}


function populaVariosItensComDetalhe(listaCampos,nomeLista,posicaoNoForm){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaListaDeItensSimples \nLista de Campos a serem populados: '+listaCampos,'D');
	
	try{
		array = listaCampos.split("%");

		for(i = 0; i < array.length-1; i++){
			campo = array[i].split("=");
			populaItemComLista(nomeLista,campo[0],posicaoNoForm,campo[1]);
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR LISTA DE CAMPOS SIMPLES \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}


function removeListaDeItensSimples(listaCampos){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeListaDeItensSimples \nLista de Campos a serem removidos: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeListaDeItensSimples \nLista de Campos a serem removidos: '+listaCampos,'D');
	try{
		array = listaCampos.split("%");
	
		for(i = 0; i < array.length-1; i++){
			removeItem(array[i]);
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER LISTA DE CAMPOS SIMPLES \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}

function removeListaDeItensLista(listaCampos,lista,posicao){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeListaDeItensSimples \nLista de Campos a serem removidos: '+listaCampos);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeListaDeItensSimples \nLista de Campos a serem removidos: '+listaCampos,'D');
	try{
		array = listaCampos.split("%");
	
		for(i = 0; i < array.length-1; i++){
			removeItemComLista(lista,array[i],posicao);
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER LISTA DE CAMPOS SIMPLES \nLISTA DE CAMPOS:'+listaCampos,'E');
   	}
}

function removeLinhasTabela(idTable,retiraTitulos,texto){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO removeLinhasTabela \nTabela: '+idTable+' \nTexto a ser inserido ap?s a remocao: '+texto);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO removeLinhasTabela \nTabela: '+idTable+' \nTexto a ser inserido ap?s a remocao: '+texto,'D');
	var table = document.getElementById(idTable);
	var numOfRows = table.rows.length;
	var limite = 1;
	
	try{
		if(numOfRows > 0){
			if(retiraTitulos)
				limite = 0;
				
			for (j = table.rows.length-1; j >= limite; j--) {
				table.deleteRow(j);
			}
		}
		
		if(texto != ''){
			var newRow = table.insertRow(0);
			newCell1 = newRow.insertCell(0);
			newCell1.className = "titulo";
			
			newCell1.innerHTML = texto;
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO REMOVER ITENS DA TABELA \nID DA TABELA:'+idTabela,'E');
   	}

	return {objTable: table};
}

function populaTabela(resultado,idTable,nomeLista){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO populaTabela = Tabela: '+idTable+' \nNome da Lista: '+nomeLista+' \nString de Resultados: '+resultado);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO populaTabela = Tabela: '+idTable+' \nNome da Lista: '+nomeLista+' \nString de Resultados: '+resultado,'D');
	
	var table = removeLinhasTabela(idTable,true,'').objTable;
	arrayTR = resultado.split("%TR%");
	tamanho = arrayTR.length-1;
	var putTitulo = false;
	var count = 0;

	try{
		for(i1 = 0; i1 < tamanho; i1++){

			var newRow = table.insertRow(i1);
			arrayTD = arrayTR[i1].split("%TD%");
			count++;
			for(i2 = 0; i2 < arrayTD.length-1; i2++){
	
					obj = arrayTD[i2].split("#");
					newCell1 = newRow.insertCell(i2);
					
					if(obj[8])
						newCell1.className = obj[8];
					else{
						if(obj[0] == 'titulo')
							newCell1.className = "titulo";
						else
							newCell1.className = "campo";
					}

					/*	obj[0] = tipo do campo
						obj[1] = nome do campo
						obj[2] = style do campo
						obj[3] = value do campo
						obj[4] = size do campo
						obj[5] = readonly
						obj[6] = title
						obj[7] = evento default
						obj[8] = style do TD
						obj[9] = complemento style da DIV(no caso de  "c:out)"
					*/
	
					mestraAjaxLog.alertaMestraAjax('',obj[0]+' = tipo do campo','D');
					mestraAjaxLog.alertaMestraAjax('',obj[1]+' = nome do campo','D');
					mestraAjaxLog.alertaMestraAjax('',obj[2]+' = style do campo','D');
					mestraAjaxLog.alertaMestraAjax('',obj[3]+' = value do campo','D');
					mestraAjaxLog.alertaMestraAjax('',obj[4]+' = size do campo','D');
					mestraAjaxLog.alertaMestraAjax('',obj[5]+' = readonly','D');
					mestraAjaxLog.alertaMestraAjax('',obj[6]+' = title','D');
					mestraAjaxLog.alertaMestraAjax('',obj[7]+' = evento default');
					
					if(obj[8])
						mestraAjaxLog.alertaMestraAjax('',obj[8]+' = style do TD');
						
					if(obj[9])
						mestraAjaxLog.alertaMestraAjax('',obj[9]+' = complemento style da DIV(no caso de  "c:out" ');
					else
						obj[9] = '';
	
					if(obj[0] == 'titulo'){
						newCell1.innerHTML = obj[3];
						putTitulo = true;
						count -=1;
					}else if(obj[0] == 'contador'){
						if(putTitulo)
							newCell1.innerHTML = i1;
						else
							newCell1.innerHTML = i;
					}else if(obj[0] == 'hidden')
						newCell1.innerHTML = '<input type="hidden" name="'+nomeLista+'['+count+'].'+obj[1]+'" value="'+obj[3]+'">';
					else if(obj[0] == 'text')
						newCell1.innerHTML = '<input type="text" name="'+nomeLista+'['+count+'].'+obj[1]+'" onchange="'+obj[7]+'" size="'+obj[4]+'" value="'+obj[3]+'" readonly="'+obj[5]+'" class="'+obj[2]+'" title="'+obj[6]+'">';
					else if(obj[0] == 'checkbox')
						newCell1.innerHTML = '<input type="checkbox" name="'+nomeLista+'['+count+'].'+obj[1]+'" onclick="'+obj[7]+'" value="S" title="'+obj[6]+'">';
					else if(obj[0] == 'c:out')
						newCell1.innerHTML = '<div style="width:100%;'+obj[9]+'" onclick="'+obj[7]+'" onmouseover="CCA(this,1)" onmouseout="CCA(this,0)"> '+obj[3]+' </div>';
	
			}
			i++;
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO POPULAR TABELA \nID DA TABELA:'+idTabela+' NOME DA LISTA: '+nomeLista,'E');
   	}
	
}

function inicializaTableVazia(msg){

	mestraAjaxLog.addMsg('ENTROU NA FUNCAO inicializaTableVazia \nMensagem: '+msg);
	mestraAjaxLog.alertaMestraAjax('','ENTROU NA FUNCAO inicializaTableVazia \nMensagem: '+msg,'D');

	try{
		url = window.location.toString();
		tam = url.length;
		inicio = tam - 21;
	
		evento = url.substring(inicio,tam-13);
		
		if(evento == 'evento=x'){
			removeLinhasTabela("detalhePlc_Det1_Table",true,msg); 
		}
	}catch(e){
   		mestraAjaxLog.alertaMestraAjax(e,'ERRO AO INICIALIZAR TABELA \nMensagem: '+msg,'E');
   	}
}	

function recuperaInformacoesComboComDetalhe(posicao,nomeLista,campo){
	var indexSelect = document.all(nomeLista+"["+posicao+"]."+campo).selectedIndex;
	var textSelected = document.all(nomeLista+"["+posicao+"]."+campo).options[indexSelect].text;
	var valueSelected = document.all(nomeLista+"["+posicao+"]."+campo).options[indexSelect].text;
	
	return {textCombo:textSelected, valueCombo:valueSelected};
}


// recupera todos os campos da tela.
function recuperaCamposForm() {
 
 var arrayCampos = getCamposEntrada();
 var strPost = "";
 
 if (arrayCampos && arrayCampos.length > 0){
 
  var i = 0;
 
  while(i < arrayCampos.length) {
 
   var valCampo;
   if((arrayCampos[i].type == 'checkbox' && arrayCampos[i].checked) || arrayCampos[i].type != 'checkbox'){
  		if(arrayCampos[i].value != ''){
	  		valCampo  = arrayCampos[i].value;
	  	   valCampo = valCampo.replace("%",escape("%"));
		   strPost += arrayCampos[i].name+"=" + valCampo +"&";
  		}
   }
 	

   i++;
 
  }
 
 }
 return strPost;
 
}
 
function getCamposEntrada () {
 
	var arrayCamposEntrada = new Array();
	var form = document.forms[0];
	if (form) {
		var formElements = form.elements;
 		for(e = 0; e < formElements.length; e++ ){
 			if (formElements[e].value && formElements[e].value != ''){
 				arrayCamposEntrada[arrayCamposEntrada.length] = formElements[e];
 			}
		}
	}
 
 return arrayCamposEntrada;
 
}


/*
function populaListaDeCombosSimples(listaCampos){
	for(i = 0; i < listaCampos.length; i++){
		ARlistaCampos = listaCampos[i].split("=");
		populaComboSimples(ARlistaCampos[2],ARlistaCampos[0],ARlistaCampos[1],'0','0','1');
	}
}Felipe Reis 14-11-2008 ps.: ainda nao testado.*/

/// #########################################################################
/// ########################## FIM AJAX #####################################
/// #########################################################################