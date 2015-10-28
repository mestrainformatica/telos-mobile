/**
 * Arquivo geral de fun??es javascript do jCompany.
 * @author Rodrigo Magno
 * @author Cl?udia Seara
 * @version 1.0
 * @since jCompany 1.5 
 * @lastmodified
 */

/**
* Vari?veis globais de utiliza??o geral
* @deprecated NNav Vari?vel que indica o browser como Netscape. Utilizada para
* compatibiliza??o com c?digos antigos [Boolean]
* @variable debugNav Utiliza para ligar/desligar debug de vari?veis globais [Boolean]
* @variable AgntUsr  Define qual o browser utilizado [String]
* @variable AppVer Define qual vers?o do browser utilizado [String]
* @variable DomYes Define se o browser utilizado aceita a fun??o "getElementById" [Boolean]
* @variable NavYes Define se o browser ? compat?vel com engine Mozilla [Boolean]
* @variable ExpYes Define se o browser ? compat?vel com Internet Explorer [Boolean]
* @variable Opr Define se o browser ? compat?vel com Opera[Boolean]
* @variable interval Utilizada para intervalos de tempo [Object]
*/
var NNav = ((navigator.appName == "Netscape"));
var debugNav = false;
var AgntUsr	= navigator.userAgent.toLowerCase();
var AppVer	= navigator.appVersion.toLowerCase();
var DomYes	= document.getElementById ? 1:0;
var NavYes	= AgntUsr.indexOf('mozilla') != -1 && AgntUsr.indexOf('compatible') == -1 ? 1:0;
var ExpYes	= AgntUsr.indexOf('msie') != -1 ? 1:0;
var Opr		= AgntUsr.indexOf('opera')!= -1 ? 1:0;
var interval;
var strResulText;
if(debugNav){
	alert("Agente: "+AgntUsr+" - Versao: "+AppVer+"\n"+
	"Netscape/Mozilla: "+NavYes+"\n"+
	"Internet Explorer: "+ExpYes+"\n"+
	"Opera: "+Opr);
}

var habilita_enter = 0;

function manipulaENTER(valor,e){

	habilita_enter = valor;
	
	if(NavYes)
		document.onkeydown = keyDown(e);

}

function keyDown(e) {

	//alert('eee');

	if(!e)
		e = event;

	if (NNav){
		var nKey=e.which; var ieKey=0;
	} else {
		var ieKey=e.keyCode; var nKey=0;
	}	
	
	if(nKey==13){
		//return false;
		//alert("nKey:"+nKey+" ieKey:" + ieKey)
	}
	
	if(ieKey==13) {
		if (habilita_enter == 1) {
			return true;
		} else {
			return false;
		}
	}
}

document.onkeydown = keyDown;
/**
 * Fun??o para executar fun??es no onload da p?gina
 * @see setFocus
 * @see testaAvisoOnline
 */
function iniciarPagina()
{
	if(campoFocus == "")
		testaCampos();
	else
	{
		setFocus(campoFocus);	
		campoFocus = "";
	}
	testaAvisoOnline();
}

/**
 * Fun??o posicionar foco em campo espec?fico
 * @param campo Campo a ser focado [String]
 * @variable campoFocus Vari?vel que identifica campo a ser posicionado
 */
var campoFocus = "";
function setCampoFocus(nomeCampo)
{
	campoFocus = nomeCampo;
}

function getForm(form)
{
	if(form == "" || form == 0 || ""+form == "undefined")	
		form = eval("document.forms[0]");
	else	
		form = eval("document.forms['"+form+"']");
	return form;	
}

/**
 * Fun??o para envia mensagem de confirma??o para  exclus?o de registro e dispara
 * bot?o associado ? exclus?o
 * @param acao A??o que determina bot?o de exclus?o a ser disparado [String]
 * @see disparaBotaoAcao
 */
function confirmaExclusao(acao)
{
	if (confirm('Confirma a Exclus?o do Registro?')) 
		disparaBotaoAcao(acao);
}

/*
function confirmaExclusao(destino)
{
	if (confirm('Confirma a Exclus?o do Registro?')) {
		document.location = destino;
		return true;
	} else {
		return false;
	}
}
*/

/**
 * Fun??o dispara clique em um bot?o da p?gina conforme acao passada
 * @param acao A??o que determina bot?o de exclus?o a ser disparado [String]
 * @return disparou Tipo boolean que informa se o bot?o foi disparado ou n?o
 */
function disparaBotaoAcao(acao, id)
{
	if (id == "" || ""+id == "undefined")
		id = "botao_menu";

	var numElements;
	var elementValue;
	var disparou = false;
	var form = getForm(form);
	var elements;
	
	if(form.elements[id].length)
		elements = form.elements[id];
	else
		elements = form.elements;	
	
	if (form) 
	{
		numElements = elements.length;
		if(numElements > 0)
		{
			for(i=0; i < numElements; i++)
			{
				elementValue = elements[i].value;
				if(elementValue == acao)
				{
					elements[i].click();
					i =numElements;
					disparou = true;
				}
			}
		}
	}
	else if (eval(form.elements[acao]))
		form.elements[acao].click();		

	return disparou;
}

/**
 * Fun??o de alerta em janela com mensagem<br>
 * Passo 1: Colar as linha abaixo no fim da p?gina:<br><dd>
 *	<blockquote><code>&lt;!-- IN?CIO DIV DE ALERTA --&gt;<br>
 *		<blockquote>&lt;div  ID=ALERTA class="janela_msg" style="visibility='hidden'"&gt;<br>
 *  		<blockquote>&lt;table width="250" height="100%"  border="0" cellpadding="0" cellspacing="0"&gt;<br>
 * 				<blockquote>&lt;tr\&gt;<br>
 *  						&lt;td width="239" class="janelaMsgTit" ID=TITULO&gt;&nbsp;&lt;/td&gt;<br>
 *  						&lt;td width="11" align="center" valign="middle" class="janelaMsgTit"&gt;<br>
 *  						<blockquote>&lt;a href="#" onclick="showDiv('ALERTA', false); return false;"&gt;<br>
 *  									&lt;img align="ABSMIDDLE" alt="Clique para fechar esta janela" border="0" height="11" hspace="0" src="&lt;%=request.getContextPath()%&gt;/midia/g_ico_fechar.gif" vspace="0" width="11"&gt;<br>
 *  									&lt;a&gt;
 * 							</blockquote><br>
 *							&lt;/td&gt;&lt;/tr&gt;<br>
 *  						&lt;tr&gt;<br>
 *							&lt;td colspan="2" class="janelaMsgSubtit" ID=SUBTITULO&gt;&lt;/td&gt;<br>
 * 							&lt;/tr&gt;<br>
 * 							&lt;tr&gt;<br>
 *  						&lt;td colspan="2" valign="top" class="janelaMsgConteudo" ID=CONTEUDO&gt;&nbsp;&lt;/td&gt;
 * 							&lt;/tr&gt;
 * 			</blockquote>
 *			&lt;/table&gt;<br>
 *		</blockquote>
 *	&lt;/div&gt;<br>
 *	</blockquote>
 *	<blockquote>&lt;!-- FIM DIV DE ALERTA --&gt;</blockquote></code><><br>
 *  Chamada: <br><dd><code>&lt;a href="#" onClick="janelaMsg('ALERTA','MEU TITULO','MEU SUBTITULO','MEU CONTEUDO'); return false;"&gt;Link&lt;/a&gt;<code>
 *  @param div Div onde a mensagem vai ser mostrada [String]
 *  @param titulo Titulo da janela de mensagem [String]
 *  @param subtitulo Sub-Titulo da janela de mensagem [String]
 *  @param conteudo Conteudo da mensagem [String]
 *  @param evt N?o utilizado (RETIRAR)
 *  @see showDiv
 */
function janelaMsg(div, titulo, subtitulo, conteudo, evt)
{
	showDiv(div, true,evt);
	var sufix = "";
	var i = div.indexOf("_");
	if(i >= 0)
		sufix = div.substring(i,div.length);
	var tit 	= eval("TITULO"+sufix);
	var subtit 	= eval("SUBTITULO"+sufix);
	var cont 	= eval("CONTEUDO"+sufix);
	
	tit.innerHTML = titulo;
	subtit.innerHTML = subtitulo;
	cont.innerHTML = conteudo;
}

/**
* Fun??o que chama janela de ajuda
* @param ajuda Objeto que representa a janela de ajuda
* @see showFormSelect
*/
function janelaAjuda(ajuda)
{
	if (ajuda.style.visibility =='hidden')
	{
		ajuda.style.visibility = 'visible';
		hideFormSelect();
	}
	else
	{
		ajuda.style.visibility = 'hidden';
		showFormSelect();
	}
}

/**
* Fun??o para esconder / mostrar qualquer elemento da tela que contenha um id
* @param idObj Objeto para esconder / mostrar
* @param visible Define se o objeto vai ser escondido ou mostrado
*/
function setVisible(idObj, visibilidade)
{
	var obj = eval("document.all['"+idObj+"']");
	if(obj)
		obj.style.visibility = visibilidade;
}

/**
 * Fun??o que mostra/esconde div de mensagem
 *  @param div Nome do div onde a mensagem vai ser mostrada [String]
 *  @param show Vari?vel que indica define se o div ser? mostrado ou escondido [boolean] 
 */
function showDiv(div, show)
{
	var wDiv = 200; //Largura do div declarada no CSS CLASS = janelaMsg
	var hDiv = 200; //Altura do div declarada no CSS CLASS = janelaMsg
    var ie4=document.all && navigator.userAgent.indexOf("Opera")==-1;
    var ns6=document.getElementById&&!document.all;
    var ns4=document.layers;
    var eventX=ie4? event.clientX : ns6? e.clientX : e.x;
    var eventY=ie4? event.clientY : ns6? e.clientY : e.y;
	var menuobj = eval(div);
	menuobj.contentwidth = wDiv;
	menuobj.contentheight = hDiv;
	menuobj.thestyle=(ie4||ns6)? menuobj.style : menuobj;
	
	if(show)
	{
			menuobj.style.visibility='visible';
           //Find out how close the mouse is to the corner of the window
           var rightedge=ie4? document.body.clientWidth-eventX : window.innerWidth-eventX;
           var bottomedge=ie4? document.body.clientHeight-eventY : window.innerHeight-eventY;
           
           //if the horizontal distance isn't enough to accomodate the width of the context menu
           if (rightedge<menuobj.contentwidth)
           //move the horizontal position of the menu to the left by it's width
	           menuobj.thestyle.left=ie4? document.body.scrollLeft+eventX-menuobj.contentwidth : ns6? window.pageXOffset+eventX-menuobj.contentwidth : eventX-menuobj.contentwidth;
           else
           //position the horizontal position of the menu where the mouse was clicked
        	   menuobj.thestyle.left=ie4? document.body.scrollLeft+eventX : ns6? window.pageXOffset+eventX : eventX;
           
           //same concept with the vertical position
           if (bottomedge<menuobj.contentheight)
    	       menuobj.thestyle.top=ie4? document.body.scrollTop+eventY-menuobj.contentheight : ns6? window.pageYOffset+eventY-menuobj.contentheight : eventY-menuobj.contentheight;
           else
	           menuobj.thestyle.top=ie4? document.body.scrollTop+event.clientY : ns6? window.pageYOffset+eventY : eventY;
           menuobj.thestyle.visibility="visible";
           return false;
	}
	else{
		menuobj.style.visibility='hidden';
	}
}


/**
* Fun??o para colocar foco no primeiro campo v?lido da p?gina.
* Funcionamento:
* Fun??o de foco no primeiro campo existente na p?gina.
* Ap?s o onload da p?gina a fun??o procura nos campos da p?gina que n?o s?o readonly
* o primeiro campo para foco da seguinte forma:
* campos text, password e textarea que n?o estejam preenchidos
* campos combobox e listbox que n?o estejam vazios e nem com algum valor selecionado
*/
function testaCampos()
{
	window.focus();
	var numForms = document.forms.length;
	var numElements = 0;
	
	for(i=0; i < numForms; i++)
	{
		numElements = document.forms[i].elements.length;
		window.focus();

		for(j=0; j < numElements; j++)
		{
			if((document.forms[i].elements[j].type=="text" || 
				document.forms[i].elements[j].type=="password" ||
				document.forms[i].elements[j].type=="file" ||
				document.forms[i].elements[j].type=="textarea") && 
				!document.forms[i].elements[j].readOnly &&
				!document.forms[i].elements[j].disabled)
			{
				if(document.forms[i].elements[j].value == "")
				{
					try
					{
						document.forms[i].elements[j].focus();
					}catch (e)
					{}
					i = numForms;
					j = numElements;
				}
			}
			else if(document.forms[i].elements[j].type == "select-one" && 
				document.forms[i].elements[j].options.length > 0 &&
				document.forms[i].elements[j].options.selectedIndex == -1 &&
				!document.forms[i].elements[j].readOnly &&
				!document.forms[i].elements[j].disabled)
			{
				document.forms[i].elements[j].focus();
				document.forms[i].elements[j].options[0].selected = true;
				i = numForms;
				j = numElements;
			}
		}
	}
}

/**
* Fun??o de registro de avisos on-line
* @variable avisoArray Array que guarda dados do aviso on-line
*/
var avisoArray = new Array();
function regAvisoOnline(url, props)
{
	this.url	= url;
	this.props	= props; 
}

/**
* Fun??o para testar se existe mensagem online
* @variable avisoArray Array onde s?o guardados os dados do aviso on-line
*/
function setAvisoOnline(url, props)
{
	avisoArray[avisoArray.length] = new regAvisoOnline(url, props);
}

/**
* Fun??o para testar se existe mensagem online
* @variable avisoArray Array de onde s?o retiradas os dados do aviso on-line
* @see janela
*/
function testaAvisoOnline()
{
	if(avisoArray.length > 0)
		janela(avisoArray[0].url,"","",avisoArray[0].props);
}


/**
* Fun??o que altera o CLASS de um elemento
* Colar dentro do elemento: styleId="botao_menu" onmouseover="animar(event , \'2\')"  onmouseout="animar(event, \'\')"
*/
function animar(e, classe) 
{
 if(navigator.appName != "Netscape"){
	var obj = e.srcElement;
	var originalClass = obj.id;
	if(originalClass.indexOf("2") != -1)
		originalClass = originalClass.substring(0, originalClass.length-1);

	classe = originalClass+classe;
	if (document.all) 
	{ 
		obj.id = classe;janelaMsg;
	}
 }
}

/**
* Fun??o para abrir um janela do tipo POP-UP
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","width","height","props"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela
* @param wa Largura da janela. [String, Opcional]
* @param ha Altura da janela. [String, Opcional]
* @param props Propriedades da janela. Informar no lugar de <I>wa</I> e <I>ha</I> que devem ser informados como "" [String, Opcional]
*/
function janela(url,wa,ha,props,alvo) {
	var w = 720;
	var h = 350;
	var t = "";
	var p = "";
	var win;
		
	if (arguments[1]) //Largura
		w = wa;
	if (arguments[2]) //Altura
		h = ha;

	if (arguments[4]) //Alvo
	t = alvo;
	
	
	if(url.indexOf("http") == -1 && (props == "" || ""+props == "undefined"))
	{
		var moveX = 0;
		var moveY = 0;
		//Centralizar janela popup
		if(NNav)
		{
			moveX = window.screenX + ((window.outerWidth - w) / 2);
			moveY = window.screenY + ((window.outerHeight - h) / 2);
			//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
			//win.moveTo(moveX,moveY);
		}
		else
		{
			moveX = (screen.availWidth/2);
			moveX = moveX - (w/2); 
			moveY = (screen.availHeight/2);
			moveY = moveY - (h/2); 
			//win.moveTo(moveX,moveY);
		}
	}
		p = "resizable=yes,scrollbars=yes,width="+w+",height="+h+",top="+moveY+",left="+moveX;	
		if (arguments[3]) //Propriedades
			p = props;
			
		win = window.open(url,t,p);
		
	return win;
}

/**
* Fun??o para abrir um janela do tipo POP-UP em uma mesma instancia passada
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","alvo"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela [String]
* @param alvo Inst?ncia para abertura. [String]
*/
function janelaComAlvo(url,alvo,wa,ha,props) {
	return janela(url,wa,ha,props,alvo);
}

/**
* Fun??o para abrir um janela do tipo POP-UP em modo modal
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","alvo"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela [String]
* @param alvo Inst?ncia para abertura. [String]
*/
var modalWin = new Object();
modalWin.returnValue = false;
function janelaModal(url,wa,ha,props,alvo) {

	if(modalWin.returnValue)
	{
		modalWin.returnValue = false;
		return true
	}
	else if (!modalWin.win || (modalWin.win && modalWin.win.closed))
	{
		modalWin.win = janela(url,wa,ha,props,alvo); 
		modalWin.modalFocus = true;
		modalWin.win.focus();
		window.onfocus = checkModal;
		return false;
	}
	else 
	{
		checkModal();
		return false;	
	}
}

function checkModal() 
{
	if(modalWin.modalFocus)
	{
		if (modalWin.win && !modalWin.win.closed) 
			modalWin.win.focus();
	}else
		window.focus();
}
function setReturnValue(value) 
{
	window.onfocus 		= window.focus;
	modalWin.modalFocus 	= false;
	modalWin.returnValue = value;
	modalWin.win.close();		
	modalWin.win = null;		
}

/**
* Fun??o para guardar dados de impress?o
* @param url Endere?o para abertura da janela de impress?o
* @param titulo T?tulo da janela. [String]
* @param nome Nome da janela. [String]
* @param html Conte?do para impress?o. [String]
*/
var objImpressao;
function objetoImpressao (url, titulo, nome, html)
{
	this.titulo 	= titulo;
	this.nome	 	= nome;
	this.url 		= url;
	this.html 		= html;
}
/**
* Fun??o de chamada da impress?o
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","width","height","props"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela de impress?o
* @param titulo T?tulo da janela. [String]
* @param nome Nome da janela. [String]
* @variable objImpressao Objeto que cont?m dados para impress?o
* @see objetoImpressao
* @see htmlImpressao
*/
function chamarImpressao(url,titulo,nome)
{
	titulo = "<h2>" + titulo + "</h2>";
	var x = hmtlImpressao(window);
	
	x= x.replaceAll('<textarea','<pre');
	x= x.replaceAll('</textarea>','</pre>');

	objImpressao = new objetoImpressao(url, titulo, nome,x );
	window.open(objImpressao.url,objImpressao.nome,'');
}
//######### Felipe Reis ##################
//######### metodo que extra? do 'google' com a funcao de varrer toda a string efetuando o replace nesta.
String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

/**
* Abrir uma janela tipo IMPRESSAO<br>
* Chamada: <code><br><dd>&lt;a href=# onClick="impressao()"; return=false;&gt;Link&lt;/a&gt;
* A fun??o retira do par?metro objeto uma parte do html entre as<br>
* tags de coment?rio e retorna este html para a p?gina que a chamou
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","width","height","props"); return false;'&gt;</code>
* @param window Objeto Window
* @return textoImpressao Conteudo final para janela de impress?o
*/
function hmtlImpressao(window)
{
	//Objeto => par?metro que representa uma p?gina

	var html = window.document.body.innerHTML;
	var textoInicioImpressao = new String("<!-- INI -->");
	var textoTerminoImpressao = new String("<!-- FIM -->");
	var posIni = html.search(textoInicioImpressao);
	var posFim = html.search(textoTerminoImpressao);
	var posTer;
	var conteudoImpressao = "";
	if (posIni >= 0 && posFim > posIni ) 
	{
		posTer = posFim - posIni + textoTerminoImpressao.length;
		conteudoImpressao = html.substr(posIni, posTer);
	}
	return conteudoImpressao;
}

/**
* Fun??o que redireciona p?gina est?tica fora do projeto (abrindo em nova inst?ncia)
* Chamada: &lt;body onLoad=redireciona("URL_DA_P?GINA");&gt;
* @param url Endere?o para redirecionamento
*/
function redireciona(url){
	var win;
	win = window.open(url,"win","");
	history.back();		
}


/**
* Fun??o para exibir uma mensagem de texto como alerta
* Chamada: &lt;a href='#' onclick='janela("url_janela"); return false;'&gt;
* @param texto Conte?do da mensagem
*/
function exibeMsg(texto) {
	alert(texto);
}

/**
* Fun??es para registro de bot?es que respondem a eventos
* @param nomeBotao Nome do bot?o que atender? ao evento
* @param evento Evento associado ao bot?o
* @variable botaoArray Array que cont?m dados do evento/bot?o
* @see regBotao
*/
var botaoArray = new Array();
function regBotaoEvento(nomeBotao, evento)
{
	botaoArray[botaoArray.length] = new regBotaoEvt(nomeBotao, evento);
}

/**
* Fun??es que guarda dados do evento/bot?o no array
* @param nomeBotao Nome do bot?o que atender? ao evento
* @param evento Evento associado ao bot?o
*/
function regBotaoEvt(nomeBotao, evento)
{
		this.nomeBotao	= nomeBotao;
		this.evento 	= evento;
}

/**
* Fun??es que recupera o bot?o associado ao evento
* @param nomeBotao Nome do bot?o que atender? ao evento
* @param evento Evento associado ao bot?o
* @variable botaoArray Array que cont?m dados do evento/bot?o
* @return Retorna nome do bot?o ou valor "FALSE" se bot?o n?o encontrado
*/
function getBotaoArray(evento)
{
	for(i = 0; i < botaoArray.length; i++)
	{
		if(botaoArray[i].evento == evento)
			return botaoArray[i].nomeBotao;
	}
	return "FALSE";
}

/**
* Fun??es para capturar tecla pressionada e executar a??o associada ? tecla
* @param nomeBotao Nome do bot?o que atender? ao evento
* @param evento Evento associado ao bot?o
* @variable disparouBotao Indicador de bot?o disparado
* @variable disparouEnter Indicador de tecla ENTER pressionada
* @variable interval Intervalo de tempo utilizado para execu??o de a??o<br> 
*			associada ? tecla ENTER
* @see testaEventoFuncoes
* @see executarAcaoFuncoes
* @see executarEventoAplicacao
* @see selBotao
* @see getBotaoArray
* @see disparaBotao
*/
var disparouBotao = false;
var disparouEnter = false;
var interval;
function executarAcaoFuncoes(evt)
{
	clearInterval(interval);
	var acao = "";
	var objSrc;
	if(evt){
		if(NavYes)
			objSrc = evt.target;
		else	
			objSrc = evt.srcElement;
	}
	var botaoAcaoAux = botaoAcao;
	botaoAcao = "";
	

		if (botaoAcaoAux == "")
			acao = testaEventoFuncoes(evt);
		else
			acao = botaoAcaoAux;
			
		if(acao == "TAB" || acao == "ERRO" || acao == "ESCAPE")
			return true;
		if(acao == "ENTER" && botaoAcaoEnter != "")
		{
			
			if(objSrc.type != "textarea"){
				botaoAcao = botaoAcaoEnter;
				interval = setInterval("executarAcaoFuncoes()",100);
				return false;
			}
			
		}
		if(!disparouBotao && !executarEventoAplicacao(acao))
			return false;
		else
			disparouBotao = false;		
		var botao = eval(selBotao(acao));
		if(botao != null)
		{
			disparouBotao = true;
			disparaBotao(botao);
		}
}

/**
* Fun??es para identificar a tecla pressionada
* @param evt Objeto Event
* @param evento Evento associado ao bot?o
* @see getBotaoArray
* @return getBotaoArray Retorna o resultado da chamada da fun??o
*/
function testaEventoFuncoes(evt)
{
   NS = (document.layers) ? true : false;
   var key;
   var keychar;
	
   if (!NS)
        	key = evt.keyCode;
   else 
	key = evt.which;

   keychar = String.fromCharCode(key);
   if ((key==null) || (key==0) || (key==8) || (key==9))
		return "ERRO";
 	else if ((key==13))
		return "ENTER";
   else if ((key == 113))
			return "TAB";
   else if ((key == 27))
			return "ESCAPE";
   else if(key == "v".charCodeAt(0))
			return getBotaoArray("INCLUIR");
   else if(key == "w".charCodeAt(0))
			return getBotaoArray("ABRIR");
   else if(key == "x".charCodeAt(0))
			return getBotaoArray("PESQUISAR");
   else if(key == "y".charCodeAt(0))
			return getBotaoArray("GRAVAR");
   else if(key == "{".charCodeAt(0))
			return getBotaoArray("IMPRIMIR");
}

/**
* Fun??es que seleciona o bot?o associado ? fun??o da tecla
* @param acao A??o ? qual o bot?o est? associado
* @return botao Objeto Button representando o bot?o associado ? a??o
*/

//FUN??O QUE SELECIONA O BOT?O ASSOCIADO ? FUN??O DA TECLA
function selBotao(acao)
{
	var numElements;
	var elementValue;
	var retorno = false;
	var botao = null;
	
	if (document.forms && document.forms.length > 0)
	{
		if (document.forms[0]+"" != "undefined" && document.forms[0].elements["evento"]+"" != "undefined") 
		{
			numElements = document.forms[0].elements["evento"].length;
			for(i=0; i < numElements; i++)
			{
				elementValue = document.forms[0].elements["evento"][i].value;
				if(elementValue == acao)
				{
					botao = eval(document.forms[0].elements["evento"][i]);
					i = numElements;
				}
			}
		} 
		else if (eval(document.forms[0].elements[acao]))
			botao = eval(document.forms[0].elements[acao]);
	}	
	return botao;
}

/**
* Fun??es para simular um clique no bot?o informado
* @param botao Nome do bot?o que ser? clicado
*/
function disparaBotao(botao)
{
	botao.click();
}
// 2003.11.22 - fun??o j? existe!
//

/**
* Fun??es para associar a??o a um bot?o
* @param acao A??o a ser associada ao bot?o
* @variable botaoAcao Armazena a a??o associada ao bot?o
*/
//FUN??O PARA SETAR A??O DO BOT?O PRESSIONADO
var botaoAcao = "";
function setBotaoAcao(acao)
{
	botaoAcao = acao;
}

/**
* Fun??es para associar a??o a um bot?o ao pressionar a telca ENTER
* @param acao A??o a ser associada ao bot?o
* @variable botaoAcaoEnter Armazena a a??o associada ao bot?o
*/
//FUN??O PARA SETAR A??O DO BOT?O AO PRESSIONAR ENTER
var botaoAcaoEnter = "";
function setBotaoAcaoEnter(acao)
{
	botaoAcaoEnter = acao;
}

/**
* JCompany: Devolve os valores selecionados em uma janela de sele??o popup.
* Os par?metros devem ser passados para este fun??o aos pares e na seguinte ordem: nome e valor do 
* atributo.
* @see recebeSelecao
* @author: Rodrigo Magno - Powerlogic 2003 (c)
*/
 
function devolveSelecaoPopup(listaValores)
{
	//Compatibiliza??o
	if(arguments.length > 1)
		devolveSelecao(arguments);
	else	
	{
		opener.recebeSelecaoPopup(listaValores);
		window.close();
	}
}

/**
 * JCompany: Devolve os valores selecionados em uma janela de sele??o popup.
 * Os par?metros devem ser passados para este fun??o aos pares e na seguinte ordem: nome e valor do 
 * atributo.
 * @author: Claudia Seara - Powerlogic 2003 (c)
 */
function devolveSelecao()
{
	//Compatibiliza??o
	if(arguments.length == 1)
		devolveSelecaoPopup(arguments[0])
	else
	{	
		// Verifica se o n?mero de argumentos ? par
		if ((arguments.length % 2) != 0 ) {
			alert("ERRO! \n\nFun??o: devolveSelecao(). \n\nErro: A quantidade de parametros passados para esta fun??o n?o ? um n?mero par." );
			return;
		}
	
		// Monta os vetores de nome e valor para os atributos selecionados
		var nome = new Array();
		var valor = new Array();
		var j = 0;
		
		for(var i = 0; i < arguments.length;) {
			nome[j] = arguments[i++];
			valor[j++] = arguments[i++];
		}
		
		// Passa os vetores para a janela que acionou a janela de sele??o
		window.opener.recebeSelecao(nome, valor);
		
		// Fecha a janela de sele??o
		window.close();
	}
}

/**
 * JCompany: Recebe os valores selecionados em uma janela de sele??o popup e procura por atributos 
 * do mesmo nome no form corrente. Caso encontre, atribui o valor selecionado ao atributo do form.
 * @author: Claudia Seara - Powerlogic 2003 (c)
 */
function recebeSelecao()
{
	//Compatibiliza??o
	if(arguments.length == 1)
		recebeSelecaoPopup(arguments[0])
	else
	{	
		// Recebe os vetores de nome e valor dos atributos selecionados
		var nome 	= arguments[0];
		var valor 	= arguments[1];
		
		// Procura no form corrente por atributos de mesmo nome. Se achar, atribui o valor passado 
		// do atributo ao atributo de mesmo nome no form.
		for(var j = 0; j < nome.length; j++) {
			for(var i = 0; i < document.forms[0].length; i++) {
			
				if (document.forms[0].elements[i].name == nome[j]) {
					document.forms[0].elements[i].value = valor[j];
					break;
				}
			}
		}
		eval("executarEventoAplicacao('TESTAR_NIVEL')");
	}
}


function recebeSelecaoPopup(listaValores)
{
	//Compatibiliza??o
	if(arguments.length > 1)
		recebeSelecao(arguments)
	else
	{	
		var campo		= "";
		var nome		= "";
		var idRetorno 	= "";
		var id 			= "";
		var separador 	= "";
		
		var retornoArray= registrarCamposRetorno (listaValores , "id,valor", "#");
	
		for(i = 0; i < retornoArray.length; i++)
		{
			idRetorno	= retornoArray[i].id;
			valRetorno	= retornoArray[i].valor;
			for(j = 0; j < camposRetorno.length; j++)
			{
				nome		= camposRetorno[j].nome;
				id			= camposRetorno[j].id;
				separador	= camposRetorno[j].separador;
				if(nome == idRetorno || idRetorno == id)
				{	
					if(setValorCampo(nome, valRetorno, separador))
						break;	
				}
			}
		}
		eval("executarEventoAplicacao('TESTAR_NIVEL')");
	}
}



var bgImage = new Image();
bgImage.src = "./plc/midia/linha_exclui.gif";

var divs = new Array();
function setID(checkName, id)
{
	this.id = id;
	this.checkName = checkName;
}

function getID(chkName)
{
	for(i=0; i < divs.length; i++)
	{
		if(divs[i].checkName == chkName)
			return divs[i].id;
	}
	return "";
}

function setPortlet(idPortlet)
{
	if (document.forms[0].elements["pIdPlc"])
		document.forms[0].elements["pIdPlc"].value=idPortlet;	
}

function abrirArquivo(info)
{		
	var arquivo = info.substr(info.indexOf(';', 0)+1);
	var path = info.substr(0, info.indexOf(';', 0));
		
    var win = window.open(path, 'downloadArquivo', ''); 	
	win.location = path + '&filename=' + '/' + arquivo;
}


function recuperaCodigo(url, msg1, msg2, campo)
{
	 var codigo = document.forms[0].elements[campo].value;
	 if (codigo == "")
	 {
		 alert(msg1); 
		 document.forms[0].elements[campo].focus();
	 }
	 else if(isNaN(codigo)) 
	 {
		 alert(msg2); 
		 document.forms[0].elements[campo].select();
	 }
	 else
		 document.location.href = url+codigo;
	 
 }      

function getKeyCode(evt){
	var key;
	if (ExpYes)
		key = evt.keyCode;
	else
		key = evt.which;
	return key;
}

/******************************************************************************
*	FUN??O QUE BLOQUEIA DIGITA??O DE CARACTERES N?O PERMITIDOS	
* 
* ------------------------------------------------
* Fun??o:		validaCaracter(evt, tipo)
* ------------------------------------------------
*
*=> campo  =	Tipo: String
*		Nome do campo atual
*=> tipo   =	Tipo: String
*		Tipo do valor no campo [D=Data; V=Valor ; H=Hora]
*=> evt    =	[event]
*		O evento disparado para chamar a fun??o 
*		(tecla pressionada, por exemplo)
*
*<Chamar no ONKEYPRESS do campo testando seu retorno>
*
*Exemplo:	return validaCaracter(event, "V");
*
******************************************************************************/
function validaCaracter(evt, tipo)
{
	//Contribui??o Dionatan Almeida
   var key;
   var keychar;
	key = getKeyCode(evt);	
   /**
   * C?digos de teclas do teclado num?rico
	de 96 ? 105 =  0 - 9
        106 = *
        107 = +
        109 = -
        110 = ,
        111 = /
        194 = .
      */

   // array das setas
   var keyseta = new Array(37,39);

   // array dos numeros + setas + home + end
   var keynum = new Array(36,35,96,97,98,99,100,101,102,103,104,105,37,39);

   // array de data + numeros
   var keynumD = new Array(36,35,96,97,98,99,100,101,102,103,104,105,37,39,111);

   // array dos numeros
   var keydigit = new Array(96,97,98,99,100,101,102,103,104,105);

   keychar = String.fromCharCode(key);

   if ((key==null) || (key==0) || (key==8) || (key==9)|| (key==27) ||
		(key==46))
      return true;
   else if (tipo=="V" && ((("0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynum)))
   		return true;
   else if (tipo=="D" && ((("/0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynumD)))
	    return true;
   else if (tipo=="DT" && (((" :/0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynumD)))
	    return true;
   else if (tipo=="H" && (((":0123456789").indexOf(keychar) > -1) ||
		validaKeyArray(key,keynum)))
   		return true;
   else if (tipo=="A" && (("0123456789").indexOf(keychar) == -1 || 
   			validaKeyArray(key,keyseta)))
		return true;
		
   return false;
}

/************************************************************************
* 			L?GICAS PARA REGISTRO E EXECU??O DE EVENTOS GEN?RICOS
*
*
* Registrar eventos da aplica??o
* FORMATO: 	regEvento ("Evento","A??o Executada","Funcao Associada ? A??o");
* AC?ES:		TESTE:		Executa alguma fun??o (deve-se informar uma fun??o para teste)
*				MENSAGEM:	Envia uma mensagem
*
* EVENTOS:  Evento podem ser padr?es (definidos pelas a??es dos bot?es de a??o) ou definidos
*				pelo programador.
* Ex.: 
*		Evento 'F10-Gravar':  ocorre quando o usu?rio executa grava??o de algum registro
*		Evento 'TESTAR':  	 deve ser executado pela chamada da fun??o 
*									 "executarEventoAplicacao(<evento>)"
*
************************************************************************/

//Array que guarda eventos da aplica??o
var evtArray = new Array();

//Fun??es para registro de eventos
function regEvento(evento, tipoAcao, funcao)
{
	evtArray[evtArray.length] = new regEvt(evento, tipoAcao, funcao);
}

function regEvt(evento, tipoAcao, funcao)
{
		this.evento 	= evento;
		this.tipoAcao 	= tipoAcao;
		this.funcao 	= funcao;
}

//Fun??o para teste dos eventos da aplica??o
function executarEventoAplicacao(acao)
{
	var retorno = true;
	var i = 0;
	if(acao == "")
		acao = botaoAcao;
	
	while(i < evtArray.length)
	{
		if(evtArray[i].evento == acao)
		{
			if(evtArray[i].tipoAcao == "MENSAGEM")
			{
				retorno = enviarMensagem(evtArray[i].evento);
				break;
			}
			else if(evtArray[i].tipoAcao == "TESTE")
			{
				if (!eval(evtArray[i].funcao))
				{
					retorno = enviarMensagem(evtArray[i].evento);
					break;
				}
			}
			else if(evtArray[i].tipoAcao == "FUNCAO")
			{
					retorno = eval(evtArray[i].funcao);
					break;
			}
		}
		i++;
	}
	
	return retorno;
}

/************************************************************************
* 		L?GICAS PARA REGISTRO E ENVIO DE MENSAGENS DE ALERTA GEN?RICAS
*
* Registrar mensagens alertas da aplica??o
* FORMATO: regMensagem ("Evento","Tipo Mensagem","Texto Mensagem");
* EVENTO:  Deve ser um dos eventos registrados acima   	
* TIPOS:	  CONFIRMACAO:	Mostra janela para confirma??o
*  		  ALERTA:		Envia mensagem de alerta. (Retorna true)
*  		  ALERTA_ERRO:	Envia mensagem de alerta. (Retorna false)
*
************************************************************************/
//Array que guarda mensagens da aplica??o
var msgArray 	= new Array();

function regMensagem(evento, tipo, msg)
{
	msgArray[msgArray.length] = new regMsg(evento, tipo, msg);
}

function regMsg(evento, tipo, msg)
{
	this.evento	= evento;
	this.tipo 	= tipo;
	this.msg	 	= msg;
}

function getMsgArray(evento)
{
	for(j = 0; j < msgArray.length; j++)
	{
		if(msgArray[j].evento == evento)
			return msgArray[j];
	}
	return null;
}

function enviarMensagem(evento)
{
	auxArray = getMsgArray(evento);
	if (auxArray != null)
	{
		if(auxArray.tipo == "CONFIRMACAO")
			return confirm(auxArray.msg);
		else if (auxArray.tipo == "ALERTA")
			alert(auxArray.msg);
		else if (auxArray.tipo == "ALERTA_ERRO")
		{
			alert(auxArray.msg);
			return false;
		}	
	}
	return true;
} /*
//Fun??o que seta os valores retornados nos campos registrados para retorno
function retornaValorCampos()
{
	var campo 		= "";
	var separador 	= "";

	for(i = 0; i < camposRetorno.length; i++)
	{
		nomeCampo	= camposRetorno[i].nomeCampo;
		separador	= camposRetorno[i].separador;
		campo 		= document.forms[0].elements[nomeCampo];
		if(campo)
		{
			if(separador != "" && separador != "undefined")
				campo.value = concatenar(retornaValorCampo("",nomeCampo), arguments[i], ",");					
			else	
				campo.value = arguments[i];
		}
	}
}
*/
/******************************************************************************
* L?GICAS PARA MONTAR ARRAY DE CAMPOS E RETORNAR VALORES NESTES CAMPOS
******************************************************************************/
//Fun??o que registra os campos de retorno no array
//Array para conter os campos para l?gicas de retorno de valores
var camposRetorno = new Array();

function registrarCamposRetorno (listaRetorno, props, separador) 
{

	var termosRetorno	= listaRetorno.split(";");
	var propsCampo 	= props.split(",");
	var propsRetorno;
	var arrayRetorno 	= new Array();
	var separadorCampos = listaRetorno.indexOf("#") >= 0 ? "#" : "=";
	for( i = 0; i < termosRetorno.length; i++)
	{
		propsRetorno 	= termosRetorno[i].split(separadorCampos);
		arrayRetorno[i] = new regProps(propsCampo, propsRetorno, separador);
	}
	return arrayRetorno;	
}


function regProps(propsCampo, propsRetorno, separador)
{
	for(j = 0; j < propsCampo.length; j++)
		eval("this."+propsCampo[j]+" = '"+propsRetorno[j]+"'");
	this.separador = separador;
}

/************************************************************************
* 			FUN??ES PARA SETAR VALOR EM CAMPO INFORMADO
************************************************************************/
function setValorCampo(nomeCampo, valor, separador)
{
	var campo = document.forms[0].elements[nomeCampo];
	if(campo)
	{
		if(arguments[2])
			campo.value = concatenar(retornaValorCampo(nomeCampo), valor, separador);
		else	
			campo.value = valor;
		return true;
	}
	return false;	
}

/************************************************************************
* 			FUN??O PARA SETAR FOCUS EM UM CAMPO INFORMADO
************************************************************************/
var botao;
function setFocus(nomeCampo)
{
	var campo 	= document.forms[0].elements[nomeCampo];
	if(campo)
	{
			if((campo.type == "text" || campo.type=="password" ||
				campo.type=="textarea" || campo.type == "hidden") && !campo.readOnly)
					campo.focus();
			else if(campo.type == "select-one")
			{
			  if(campo.options.length > 0 &&
				campo.options.selectedIndex == -1 && !campo.readOnly)
				{
					campo.focus();
					campo.options[0].selected = true;
				}
			}
	}
}
 
/************************************************************************
* 			FUN??ES PARA TRATAMENTO DE RETORNO DE DATA DO CALEND?RIO
************************************************************************/
//Campo para retorno de data
var campoData;
//Fun??o para abertura do calend?rio
function abrirCalendario(url, nomeCampo, wa, ha, props)
{
	var w = 720;
	var h = 350;
	
	if (arguments[1])
		w = wa;
	if (arguments[2])
		h = ha;

	nomeCampo = nomeCampo+"=data";
	camposRetorno = registrarCamposRetorno (nomeCampo, "nome,id"); 
	
	if(props != "" && ""+props != "undefined"){
		janela(url, "","", props);
	}
	else if(isNaN(w) || isNaN(h)){
		janela(url, "","", "width=260, height=250, resizable=no");
	}
	else{
		janela(url, w,h);
	}
}

//Fun??o para retorno da data no campo indicado
function retData(data)
{
	campoData.value = data;
	campoData.focus();
}


function setFocusFim (campo) {
	if (campo.createTextRange) {
		var r = campo.createTextRange();
		r.moveStart('character', campo.value.length);
		r.collapse();
		r.select();
	}
	else
		setFocus(campo.name);
} 

/**********************************************************************************
* 					FUN??O PARA RETORNAR UM VALOR EM UM CAMPO
**********************************************************************************/
function retornaValorCampo(field, form) 
{
	var campo = "";
	if(form == "" || form == 0 || ""+form == "undefined")	
		campo = eval("document.forms[0].elements['"+field+"']");
	else	
		campo = eval("document.forms['"+form+"'].elements['"+field+"']");
	if(campo)
	{
		if(campo.type == "text" || campo.type == "hidden" || campo.type == "textarea")
		{
			return campo.value;
		}
		else if (campo.type == "checkbox")
		{
			return campo.checked;
		}
		else if (campo.type == "select-one" || campo.type == "select-multiple")
		{
			return campo.options[campo.selectedIndex].value;
		}
	}
	
	return "";
}

/**********************************************************************************
* 					FUN??O PARA INSERIR UM VALOR EM UM CAMPO
**********************************************************************************/
function insereValorCampo(field,value,form) 
{
	var campo = "";
	if(form == "" || form == 0 || ""+form == "undefined")	
		campo = eval("document.forms[0].elements['"+field+"']");
	else	
		campo = eval("document.forms['"+form+"'].elements['"+field+"']");
	if(campo)
	{
		if(campo.type == "text" || campo.type == "hidden")
			campo.value = value;
		else if (campo.type == "select-one")
		{	for(i = 0; i < campo.options.length; i++)
			{
				if(campo.options[i].value == value)
				{
					campo.options[i].selected = true;
					i = campo.options.length;
				}
			}
		}
	}
}

/**********************************************************************************
* 					FUN??O PARA REDIRECIONAMENTO DE ENDERE?O
**********************************************************************************/
function redirect(url)
{
	document.location=url;
}

/**********************************************************************************
* 						FUN??ES PARA AVALIA??O DE EXPRESS?ES
**********************************************************************************/

/******************AVALIA??O DE EXPRESS?ES COM REPETI??O DE CAMPOS ***************
=> Avalia a express?o passada
=> Se informado um campo para retorno este ir? receber o valor da expresss?o 
avaliada.
=> Sintaxe: avaliaExpressao(expressao, campoRetorno)
=> Par?metros ( O = Obrigat?rio)
	expressao 	= express?o para ser avaliada
		Para a composi??o da express?o podem ser utilizado algarismos, operadores,
		par?nteses e campos da aplica??o.
		Quando for utilizar campos informar o nome do campo entre "#". 
		Exemplo: ((10-20)*5+#campo1#)/campo2
	campoRetorno= campo para onde ser? enviado o valor da express?o avaliada 
*********************************************************************************/

function avaliaExpressao(expressao, campoRetorno)
{
	var debug = false;
	//Parsing de express?o
	var expAux 		= "";
	var campo 		= "";
	var valCampo 	= 0;
	var expEval 	= "";
	var index 		= 0;
	var resultado	= 0;
	if(expressao.indexOf(" ") > -1)
	{
		alert("Express?o n?o pode conter espa?os.");
		return;
	}
	else
	{
		index 	= expressao.indexOf("#");
		while(index > -1)
		{
			expEval += expressao.substring(0,index);
			expressao = expressao.substring(index+1,expressao.length);
			index = expressao.indexOf("#");
			campo = expressao.substring(0,index);
			expressao = expressao.substring(index+1,expressao.length);
			valCampo = retornaValorCampo("",campo);
			expEval += valCampo;
			index = expressao.indexOf("#");
		}
		expEval += expressao;
		expressao = expEval;
	}	
	if(eval(expressao))
	{	
		resultado = eval(expressao);
		campo = eval("document.forms[0].elements['"+campoRetorno+"']");
		if(campo)
			campo.value = resultado;
		return resultado;
	}
	else
		alert("Express?o inv?lida.");
} 
/**
* 				FUN??ES PARA TORNAR VIS?VEIS/INVIS?VEIS CAMPOS DO FORM
*/
function alteraEstadoCampo(tipo, estado)
{
  if (!document.all)
  {
    return; // only Internet Explorer is affected by the bug
  }
  var numForms 	= document.forms.length;
  var numCampos	= ""; 
  var numTipos		= separaListaTermos(tipo,",");
  var find 			= false;
  for (var i = 0; i < numForms; i++)
  {
    numCampos = document.forms[i].elements.length;
    for (var j = 0; j < numCampos; j++)
    {
	    for (var k = 0; k < numTipos || find; k++)
	    {
	      if (document.forms[i].elements[j].type == numTipos[k])
	      {
	        document.forms[i].elements[j].style.visibility = estado;
	        find = true;
	      }
	    }
    }
  }
}

/**********************************************************************************
* 			FUN??O PARA CONCATENAR DOIS VALORES COM O SEPARADOR INFORMADO
**********************************************************************************/
function concatenar(oldValue, newValue, separator)
{
	var valRetorno = oldValue;
	if(newValue != "")
	{
		if(oldValue == "")
			valRetorno = newValue;
		else if (oldValue.indexOf(newValue) == -1)
			valRetorno = oldValue + separator + newValue;
	}
	return valRetorno;
}


/**
* 			FUN??O PARA SEPARAR UM LISTA DE TERMOS EM ARRAY
*/
function separaListaTermos (str, separador) 
{
	var termos = new Array();
	termos = str.split(separador);
	return termos;	
}
	
/**********************************************************************************
* 					FUN??O PARA C?LCULO DE VALORES
**********************************************************************************/
function retornaCalculo(oper, incremento, maximo, minimo, campoRetorno)
{
	var format = "00";
	var campo = eval("document.forms[0].elements['"+campoRetorno+"']");
	var resultado;
	var val = parseFloat(campo.value);
	resultado = eval(val + oper + incremento);
	if(!isNaN(resultado) && (resultado <= maximo && resultado >= minimo))	
	{
		var auxResultado = "";
		var resultado = new String(resultado);
		if(format.length > resultado.length)
		{
			var posRes = 0;
			for(i = (format.length - 1); i >= 0; i--)
			{
				if(i <= resultado.length - 1)
				{
					auxResultado += parseFloat(format.charAt(i))+parseFloat(resultado.charAt(posRes));  
					posRes++;
				}
				else	
					auxResultado += parseFloat(format.charAt(i));
			}
			if(campo)
				campo.value = auxResultado;
			else
				return auxResultado;	
		}
		else
		{
			if(campo)
				campo.value = resultado;
			else
				return resultado;
		}
	}
}

function selecaoPopup(url, listaCampos, separador)
{
	camposRetorno = registrarCamposRetorno(listaCampos, "nome,id", separador);
	janela(url);
}

/******************************************************************************
* FUN??O QUE RETORNA UMA STRING PARA USO EM URL, CONTENDO O NOME DO CAMPO+VALOR DO CAMPO,
* CONCATENANDO TODOS OS CAMPOS PASSADOS POR ARGUMENTO.
* 
* Recebe: Nome do Form + Nomes dos Campos
*
* Devolve: URL no formato exemplo: campo1=<valor1>&campo2=<valor2>...
*
******************************************************************************/
function geraLink()
{
   var form = arguments[0];
   var link = "";
   var arrayTermos;
   for (i=1;i<arguments.length;i++) {
		if (i > 1) link+="&";
	
		if(arguments[i].indexOf(",") >= 0)
		{
			arrayTermos = separaListaTermos(arguments[i],",");
			link+=arrayTermos[1]+"="+retornaValorCampo(arrayTermos[0],form);	   
		}
		link+=arguments[i]+"="+retornaValorCampo(arguments[i],form);	   
   }
   return link;
}


/******************************************************************************
* FUN??O PARA DIFERENCIAR LINHA PARA EXCLUS?O EM L?GICAS TABULARES
******************************************************************************/

function marcarExclusao(checkbox, evt)
{
	checarUm(checkbox);
}

function manterMarcaExc(val, frm){
	frm 		= getForm(frm);
	if(frm)
	{
		var EL	= frm.elements;
		for (var i = 0; i < EL.length; i++)
		{
			var e = EL[i];
			if ((e.name.indexOf("indExcPlc") >= 0) && (e.type == 'checkbox'))
			{
				if(e.checked || e.value == "S")
				{	e.click(); e.click();}
				else
					setClasse(e, "TR", "");
					
			}
		}
	}
}

function checarTodos(CT, CBID, nomeChk, frm){
	frm  = getForm(frm);
	CT   = getCheckTodos(CT, frm);
	CBID = getCheckExc(CBID, frm);
	nomeChk 	= getNomeChk(nomeChk);
	for (var i = 0; i < CBID.length; i++)
	{
		var e=CBID[i];
		if ((e.name.indexOf(nomeChk) >= 0) && (e.type=='checkbox'))
		{
			e.checked = CT.checked;
			testarChekbox(e);
		}
	}
}

function checarUm(CB, CT, nomeChk, CBID, frm)
{
	frm  		= getForm(frm);
	CT	  		= getCheckTodos(CT, frm);
	CBID 		= getCheckExc(CBID, frm);
	nomeChk 	= getNomeChk(nomeChk);
	testarChekbox(CB);
	var TB=TO=0;
	for (var i=0;i < CBID.length;i++)
	{
		var e = CBID[i];
		if(e.type=='checkbox'){
			if (e.name.indexOf(nomeChk) >= 0){
				TO++;
				if (e.checked)	TB++;
			}
		}
	}
	CT.checked=(TO==TB)?true:false;
}

function testarChekbox(CHK)
{
	var tag = "TR";
	if (CHK.checked) setClasse(CHK, tag, "linhapar");
	else setClasse(CHK, tag, "");
}

function setClasse(E, tag, classe)
{
	var Etag = E.tagName;
	while (Etag != tag)	
	{
		if(ExpYes)
			E = E.parentElement;
		else	
			E = E.parentNode;
		Etag = E.tagName;
	}
	E.className = classe;
	E.marcado 	= true;
	
}
function getCheckTodos(CT, frm)
{
	if(""+CT != "undefined" && CT != "") 	return CT;
	else if(frm.cbTodos)
		return frm.cbTodos;
	else	
		return frm;
}

function getCheckExc(CBID, frm)
{
	if(""+CBID != "undefined" && CBID != "") 
	{
		if(frm.CBID)
			return frm.CBID;
	}
	return frm.elements;	
}

function getNomeChk(nomeChk)
{
	if(""+nomeChk != "undefined" && nomeChk != "") 
			return nomeChk;
	return "indExcPlc";	
}

/* ---------------------------------------------------------------------- *\
  Function    : setGlobalVar
  Description : set a variable with a global scope
  Usage       : setGlobalVar(varName, value);
  Arguments   : varName - name of the global variable to set
                value - value of the global variable to set
\* ---------------------------------------------------------------------- */
function setVarGlobal(nome, valor) {
   if (this.cache == null) {this.cache = new Object();} 
   this.cache[nome] = valor;
}
/* ---------------------------------------------------------------------- *\
  Function    : getGlobalVar
  Description : get a variable in a global scope
  Usage       : value = getGlobalVar(varName);
  Arguments   : varName - name of the global variable to get
                value - value of the global variable to get
\* ---------------------------------------------------------------------- */
function getVarGlobal(nome, valor) {
   if (this.cache == null) {
     return null;
   } else {
     return this.cache[nome]; 
   }
}

/* ---------------------------------------------------------------------- *\
	FUN??O PARA TRATAMENTO DE ERROS 
\* ---------------------------------------------------------------------- */
function stoperror(){ 

	var strErro = 	"ALERTA DE ERRO\n";
	alert(strErro+"Mensagem: "+arguments[0]+"\n"+arguments[1]+" [Linha: "+arguments[2]+"]");
	return true; 
} 
window.onerror=stoperror; 


function hideFormSelect()
{
  if (!document.all)
  {
    return; // only Internet Explorer is affected by the bug
  }
  var dfl = document.forms.length;
  for (var i = 0; i < dfl; i++)
  {
    var dfle = document.forms[i].elements.length;
    for (var j = 0; j < dfle; j++)
    {
      if (document.forms[i].elements[j].type.indexOf('sel') != -1)
      {
        document.forms[i].elements[j].style.visibility = 'hidden'
      }
    }
  }
}


function showFormSelect()
{
  if (!document.all)
  {
    return; // only Internet Explorer is affected by the bug
  }
  var dfl = document.forms.length;
  for (var i = 0; i < dfl; i++)
  {
    var dfle = document.forms[i].elements.length;
    for (var j = 0; j < dfle; j++)
    {
      if (document.forms[i].elements[j].type.indexOf('sel') != -1)
      {
        document.forms[i].elements[j].style.visibility = 'visible';
      }
    }
  }
}
	
function hideIframe()
{
	for(i = 0; i < document.frames.length; i++)
	{
		setVisible(document.frames[i].name, "hidden")	
	}	
}
	
function showIframe()
{
	for(i = 0; i < document.frames.length; i++)
	{
		setVisible(document.frames[i].name, "visible")	
	}	
	
//arendonda numeros
function arredonda(number,X) {
 
	//por chaves
	X = (!X ? 2 : X);
	return Math.round(number*Math.pow(10,X))/Math.pow(10,X);
}	
}

function concatena(e,objeto,tamanho) {	
	var ieKey=(e.which) ? e.which :event.keyCode; 
	if(ieKey==13){
		ajustaZerosEsquerda(objeto,tamanho)
	}		
}

function mascaraCpf(src, mask, teclapres) {

 if(navigator.appName.indexOf("Netscape")!= -1) 
    tecla= teclapres.which; 
  else 
    tecla= teclapres.keyCode; 
	
key = String.fromCharCode( tecla); 

	var strValidos = "0123456789"   
	if ( strValidos.indexOf( key ) == -1 && tecla!= 8 &&  tecla!= 0){
		return false;   
	}


  var i = src.value.length;
  var saida = mask.substring(0,1);
  var texto = mask.substring(i)
if (tecla != 8 && texto.substring(0,1) != saida) 
  {
	src.value += texto.substring(0,1);
  }
}

function checkMail(obj)
{
  var txt = obj.value;
  var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$/i;
  
while (txt.indexOf(" ") != -1) {
  txt = txt.replace(" ", "");

}

  obj.value = txt;

  if (!filtro.test(txt))
  {
    alert('E-mail incorreto!');
    obj.value = '';
	obj.focus();
  }
}
