/**
 * Arquivo geral de fun??es javascript do jCompany.
 * @author Rodrigo Magno
 * @author Cl?udia Seara
 * @version 1.0
 * @since jCompany 1.5 
 * @lastmodified
 */

// Global for brower version branching.
var NNav = ((navigator.appName == "Netscape"));
var debugNav = false;

var AgntUsr	= navigator.userAgent.toLowerCase();
var AppVer	= navigator.appVersion.toLowerCase();
var DomYes	= document.getElementById ? 1:0;
var NavYes	= AgntUsr.indexOf('mozilla') != -1 && AgntUsr.indexOf('compatible') == -1 ? 1:0;
var ExpYes	= AgntUsr.indexOf('msie') != -1 ? 1:0;
var Opr		= AgntUsr.indexOf('opera')!= -1 ? 1:0;
if(debugNav){
	alert("Agente: "+AgntUsr+" - Versao: "+AppVer+"\n"+
	"Netscape/Mozilla: "+NavYes+"\n"+
	"Internet Explorer: "+ExpYes+"\n"+
	"Opera: "+Opr);
}

// Vari?vel utilizada para intervalos de tempo
var interval;

/**
 * Fun??o para executar fun??es no onload da p?gina
 * @see setFocus
 * @see testaAvisoOnline
 */
function iniciarPagina()
{

	if(campoFocus == "" && get("detCorrPlc") == "") {
		//testaCampos();
	} else {
		clearInterval(interval);
		interval = setInterval("setFocus('"+campoFocus+"')",800);
	}
	testaAvisoOnline();
	//manterMarcaExc("S");
	
	// Alvim - N?o inicializa sempre, para logica nova de tab-folder.
	//	setValorCampo("detCorrPlc", "");
	
	setUpOnFocusHandlers(); 
		
	executarFuncaoOnLoad();

	initializeMenus();
}

function iniciarPaginaPopup()
{

	if(campoFocus == "" && get("detCorrPlc") == "")
		testaCampos();
	else
	{
		clearInterval(interval);
		interval = setInterval("setFocus('"+campoFocus+"')",800);
	}
	testaAvisoOnline();
	//manterMarcaExc("S");
	
	// Alvim - N?o inicializa sempre, para logica nova de tab-folder.
	//	setValorCampo("detCorrPlc", "");
	
	setUpOnFocusHandlers(); 
		
	executarFuncaoOnLoad();
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

/**
 * Fun??o para retornar um objeto que representa um form da p?gina
 * @param form Nome do form [String]
 */
function getForm(form)
{
	var sessForm = getVarGlobal("form");
	
	if(form != "" && form != 0 && ""+form != "undefined")	
		form = eval("document.forms['"+form+"']");
	else if(sessForm != "" && sessForm != 0 && ""+sessForm != "undefined" && ""+sessForm != "null")	
		form = eval("document.forms['"+sessForm+"']");
	else	
		form = eval("document.forms[0]");
	return form;	
}

/**
 * Fun??o para retornar um objeto que representa um campo da p?gina
 * @param form Nome do form [String]
 */
function getCampo(campo, form)
{
	form = getForm(form);
	if(form)	
		campo = form.elements[campo];
	return campo;	
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
 * Dispara a a??o de um bot?o.ada
 * A fun??o abaixo ? a original do 2.5
 * mantemos a versao antiga da 1.5
 */

function disparaAcaoBotao(nomeBotao) {
      document.forms[0].elements[nomeBotao].click();
}

function disparaAcaoBotaoCritica(nomeBotao) {
	msg = document.forms[0].mensagemConfirmacao.value;
	//alert(msg);
	if(msg != "null"){
		msg = msg.replace('\\n','\n');
		msg = msg.replace('\\n','\n');
		msg = msg.replace('\\n','\n');
		msg = msg.replace('\\n','\n');
	 	var conf = confirm(msg)
			 if(conf){
		        document.forms[0].elements[nomeBotao].click();
			 }else{
		      	return false;
			 }
	}else{	
		 document.forms[0].elements[nomeBotao].click();
	}
}

/**
 * Fun??o dispara clique em um bot?o da p?gina conforme acao passada
 * @param acao A??o que determina bot?o de exclus?o a ser disparado [String]
 * @return disparou Tipo boolean que informa se o bot?o foi disparado ou n?o
 
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
*/


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
				try{
				document.forms[i].elements[j].focus();
				
					document.forms[i].elements[j].options[0].selected = true;
				}catch (e){}
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
	var obj;
	if(NavYes)
		obj = e.target;
	else	
		obj = e.srcElement;
	var originalClass = obj.id;
	if(originalClass){
		if(originalClass.indexOf("2") != -1)
			originalClass = originalClass.substring(0, originalClass.length-1);
	
		classe = originalClass+classe;
		//if (DomExp) 
			obj.id = classe;
	}
}

/**
* Fun??o para abrir um janela do tipo POP-UP
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","width","height","props"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela
* @param wa Largura da janela. [String, Opcional]
* @param ha Altura da janela. [String, Opcional]
* @param props Propriedades da janela. Informar no lugar de <I>wa</I> e <I>ha</I> que devem ser informados como "" [String, Opcional]
* @param alvo Inst?ncia para abertura. [String]
* @param max Indica que a janela deve abrir maximizada. [String]
* @param posX posi??o x onde a janela deve ser criada. [String, Opcional]
* @param posY posi??o y onde a janela deve ser criada. [String, Opcional]
*/
function janela(url,wa,ha,props,alvo,max,posX,posY) {
	var w = 720;
	var h = 350;
	var t = "";
	var p = "";
	var win;
		
	if (arguments[1] && arguments[1] != "") //Largura
		w = wa;
	if (arguments[2] && arguments[2] != "") //Altura
		h = ha;
	p = "resizable=yes,scrollbars=yes,width="+w+",height="+h;	
	if (arguments[3] && arguments[3] != "") //Propriedades
		p = props;
	if (arguments[4] && arguments[4] != "") //Alvo
		t = alvo;
		
	win = window.open(url,t,p);
	
	if (arguments[5] && arguments[5] != "" && arguments[5] != "N") //Redimensiona
	{
		redimensiona(win);
	}	
	else if(url.indexOf("http") == -1 && (props == "" || ""+props == "undefined"))
	{
		var moveX = 0;
		var moveY = 0;
		
		
		if( (posX && posX != "") || (posY && posY != "") ) {
			if(posX && posX != "")
				moveX = posX;
			if(posY && posY != "")
				moveY = posY;
		}	
		else {
			//Centralizar janela popup
			if(NNav)
			{
			
				moveX = window.screenX + ((window.outerWidth - w) / 2);
				moveY = window.screenY + ((window.outerHeight - h) / 2);
				//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
			}
			else
			{
				moveX = (screen.availWidth/2);
				moveX = moveX - (w/2); 
				moveY = (screen.availHeight/2);
				moveY = moveY - (h/2); 
			}
		}
		win.moveTo(moveX,moveY);
	}
	
	return win;
}

/**
* Fun??o redimensionar janela para ocupar toda a tela do browser
*/
function redimensiona(win)
{
	if(NNav)
	{
		netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
		if (win.outerHeight < screen.availHeight || win.outerWidth < screen.availWidth)
		{
			win.outerHeight = screen.availHeight;
			win.outerWidth = screen.availWidth;
		}
	}
	else
	{
		win.resizeTo(screen.availWidth,screen.availHeight);
	}
	win.moveTo(0,0);
}

/**
* Fun??o para abrir um janela do tipo POP-UP em uma mesma instancia passada
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","alvo"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela
* @param wa Largura da janela. [String, Opcional]
* @param ha Altura da janela. [String, Opcional]
* @param props Propriedades da janela. Informar no lugar de <I>wa</I> e <I>ha</I> que devem ser informados como "" [String, Opcional]
*/
function janelaComAlvo(url,alvo,wa,ha,props,max) {
	return janela(url,wa,ha,props,alvo,max);
}

/**
* Fun??o para abrir um janela do tipo POP-UP redimensionada para tamanho m?ximo da resolu??o
* Chamada: <br><dd><code>&lt;a href='#' onclick='janela("url_janela","alvo","props"); return false;'&gt;</code>
* @param url Endere?o para abertura da janela [String]
* @param alvo Inst?ncia para abertura. [String]
* @param props Propriedades da janela. Informar no lugar de <I>wa</I> e <I>ha</I> que devem ser informados como "" [String, Opcional]
*/
function janelaMaximizada(url,w,h,alvo,props) {
	return janela(url,w,h,props,alvo,"S");
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
	objImpressao = new objetoImpressao(url, titulo, nome, hmtlImpressao(window));
	window.open(objImpressao.url,objImpressao.nome,'');
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
function executarAcaoFuncoes(evt)
{
	clearInterval(interval);
	var elementoOrigem;
	if(evt){
		if(NavYes)
			elementoOrigem = evt.target;
		else	
			elementoOrigem = evt.srcElement;
	}
	
	var acao = "";
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
		if(elementoOrigem.type != "textarea")
		{
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
   else if ((key == 9))
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
	if(botao)
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
	if(arguments.length == 1){
		recebeSelecaoPopup(arguments[0])
	}else
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
		var separador	= "";
		
		var retornoArray= registrarCamposRetorno (listaValores , "id,valor", "#");
	
		for(i = 0; i < retornoArray.length; i++)
		{
			idRetorno	= retornoArray[i].id;
			valRetorno	= unescape(retornoArray[i].valor);
			//valRetorno	= retornoArray[i].valor;
			for(j = 0; j < camposRetorno.length; j++)
			{
				nome		= unescape(camposRetorno[j].nome);
				id			= camposRetorno[j].id;
				separador	= camposRetorno[j].separador;
				if(nome == idRetorno || idRetorno == id)
				{	
					if(setValorCampo(nome, valRetorno, separador)){
						if(document.forms[0][nome].onchange!=null){
							document.forms[0][nome].onchange();
						}
							break;
					}
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
   var key;
   var keychar;
   if (!NS)
        key = evt.keyCode;
   else 
   	key = evt.which;

   keychar = String.fromCharCode(key);
   if ((key==null) || (key==0) || (key==8) || (key==9)|| (key==27))// ||  (key==13))
      return true;
   else if (tipo=="V" && (("0123456789").indexOf(keychar) > -1))
	   return true;
   else if (tipo=="D" && (("/0123456789").indexOf(keychar) > -1))
	   return true;
   else if (tipo=="H" && ((":0123456789").indexOf(keychar) > -1))
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
function regMensagem(evento, tipo, msg) {
   if (this.msgArray == null) {this.msgArray = new Object();} 
   this.msgArray[evento] = new regMsg(evento, tipo, msg);
}

function regMsg(evento, tipo, msg)
{
	this.evento	= evento;
	this.tipo 	= tipo;
	this.msg	= msg;
}

function getMsgArray(evento)
{
	return this.msgArray[evento];
}

function enviarMensagem(evento)
{
	auxArray = getMsgArray(evento);
	if (auxArray != null)
	{
		if(auxArray.tipo == "CONFIRMACAO"){
		
		//Corrigindo bug do loading padr?o do projeto, para que este n?o continue rodando quando o usu?rio clicar em 'Cancelar'
		var validadeResposta = confirm(auxArray.msg);

		if(!validadeResposta && window.__loadEsconde())
			__loadEsconde();
			
			return validadeResposta;
		}else if (auxArray.tipo == "ALERTA")
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

function getCampoRetornoById(id)
{
	for(i = 0; i < camposRetorno.length; i++)
	{
		if(camposRetorno[i].id == id)
			return camposRetorno[i].nome;
	}
	return "";
}

function registrarCamposRetorno (listaRetorno, props, separador) 
{
	var termosRetorno	= listaRetorno.split(";");
	var propsCampo 		= props.split(",");
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
		eval("this."+propsCampo[j]+" = '"+escape(propsRetorno[j])+"'");
	this.separador = separador;
}


/*----------------------------------------------------------------*\
 			FUN??ES PARA SETAR VALOR EM CAMPO INFORMADO
\*----------------------------------------------------------------*/
function set(nomeCampo, valor, separador, form) {
    setValorCampo(nomeCampo, valor, separador, form);
}

function setValorCampo(nomeCampo, valor, separador, form)
{
	var campo = getCampo(nomeCampo,form);
	if(campo)
	{
		if(arguments[2])
			campo.value = concatenar("", valor, separador);
		else	
			campo.value = valor;
		return true;
	}
	return false;	
}

function setValorCampoAtualizacao(nomeCampo, valorReplace, valorNovo, separador, form)
{
	atualizaValorCampo(nomeCampo, valorReplace, valorNovo, separador, form);
	setValorCampo(nomeCampo, valorNovo, separador, form);
}

function atualizaValorCampo(nomeCampo, valorReplace, valorNovo, separador, form)
{
	var campo 	= getCampo(nomeCampo,form);
	var valor 	= "";
	var exp 	= "";
	var sepAux	= "";
	if(valorNovo == "")
		sepAux = "";
	else
		sepAux = separador;	
	if(campo)
	{
		valor = campo.value;
		if(valor.indexOf(separador) < 0)
		{
			exp = new RegExp(valorReplace);
			if(valor != "")
				valor = replaceString(exp, valor, valorNovo);
		}else
		{
			exp = new RegExp(valorReplace+"\\"+separador);
			valor = replaceString(exp, valor, valorNovo+sepAux);
			exp = new RegExp("\\"+separador+valorReplace);
			valor = replaceString(exp, valor, sepAux+valorNovo);
		}
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
	clearInterval(interval);
	campoFocus = "";
	var campo 	= document.forms[0].elements[nomeCampo];

	if(campo)
	{		// || campo.type == "hidden"
			if((campo.type == "text" || campo.type=="password" ||
				campo.type=="textarea") && !campo.readOnly){
					campo.focus();
			}
			else if(campo.type == "select-one" || campo.type == "select-multiple")
			{
			  if(campo.options.length > 0 &&
				campo.options.selectedIndex <= 0 && !campo.disabled)
				{
					//campo.focus();
					setTimeout("document.forms[0].elements['"+nomeCampo+"'].focus()",0);
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
function get(field, form)  {
   return retornaValorCampo(field, form); 
}
function retornaValorCampo(field, form) 
{
	var campo = "";
	if(form == "" || form == 0 || ""+form == "undefined"){	
		if(document.forms && document.forms[0] && document.forms[0].elements)	
			campo = eval("document.forms[0].elements['"+field+"']");
	}
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

function selecaoPopup(url, listaCampos, separador, larg, alt, posX, posY)
{
	camposRetorno = registrarCamposRetorno(listaCampos, "nome,id", separador);
	janela(url,larg,alt,"","","",posX, posY);

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
        else
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
	frm  		= getForm(frm);
	CT   		= getCheckTodos(CT, frm);
	CBID 		= getCheckExc(CBID, frm);
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
	if(document.frames){
		for(i = 0; i < document.frames.length; i++)
		{
			setVisible(document.frames[i].name, "hidden")	
		}	
	}	
}
	
function showIframe()
{
	if(document.frames){
		for(i = 0; i < document.frames.length; i++)
		{
			setVisible(document.frames[i].name, "visible")	
		}	
	}
}

/*
* Fecha a janela
*/
function fecharJanela()
{
	window.close();
}



/*
* Abre janela utilizando a resolu??o dispon?vel.
*/
function janelaMax(url) {
    var win;
    var w = screen.availWidth -3;
    var h = screen.availHeight -25;
    
    win = window.open(url,"","resizable=yes,scrollbars=yes,left=0,top=0,width="+w+",height="+h);
}



/**********************************************************
Formatar a data digitada
--------------------------------------------
Fun??o:     formataData(Campo,Prox,tammax,teclapres)
-------------------------------------------- 

=> Campo =  Tipo: String
        Nome do campo de data
=> prox  =  Tipo: String 
        Nome do pr?ximo campo
=> tammax = Tipo: int [8]
        Tamanho m?ximo permitido 
=> teclapres =  Tipo: event [event]
        O evento disparado para chamar a fun??o 
        (tecla pressionada, por exemplo)

<Chamar no ONKEYPRESS do campo>

Exemplo:    formataData('fldData',event);

Obs.: A data digitada aparecer? no formato: dd/mm/aaaa

**********************************************************/


function formataData(campo,evt) 
{
    if(NNav)
        var tecla = evt.which;
    else
        var tecla = evt.keyCode;

    vr = retornaValorCampo(campo);

    if(NNav)
    {
        var ult = vr.substring(0,1);
        vr = vr.substring(1,vr.length)+ult;
        vr = filtraCampo(vr);
    }   
    if(!NNav)
    {
        vr = vr.replace( ".", "" );
        vr = vr.replace( "/", "" );
        vr = vr.replace( "/", "" );
        vr = vr.replace( "/", "" );
    }

    tam = vr.length +1;
    if ( tecla != 9 && tecla != 8 )
    {
		  if ( tam > 2 && tam < 5 )
				vr = vr.substr( 0, 2 ) + '/' + vr.substr(2, tam );
        if ( tam >= 5 && tam <= 10 )
            vr = vr.substr( 0, 2 ) + '/' + vr.substr( 2, 2 ) + '/' + vr.substr( 4, 3 ); 
		  setValorCampo(campo, vr);
        return false;
    }
} 

/****************************************************************
Bloqueia digita??o de caracter n?o permitido pelo tipo
------------------------------------------------
Fun??o:		validaCaracter(campo, evt, tipo)
------------------------------------------------

=> campo  =	Tipo: String
		Nome do campo atual
=> tipo   =	Tipo: String
		Tipo do valor no campo [D=Data; V=Valor ; H=Hora]
=> evt    =	[event]
		O evento disparado para chamar a fun??o 
		(tecla pressionada, por exemplo)

<Chamar no ONKEYDOWN do campo testando seu retorno>

Exemplo:	return validaCaracter('fldCPF',event, "V");

****************************************************************/
function validaCaracter(evt, tipo)
{
   var key;
   var keychar;
   if (!NNav)
        key = evt.keyCode;
   else 
    key = evt.which;
   keychar = String.fromCharCode(key);
   if ((key==null) || (key==0) || (key==8) || (key==9)|| (key==27))// ||  (key==13))
      return true;
   else if (tipo=="V" && (("0123456789").indexOf(keychar) > -1))
       return true;
   else if (tipo=="D" && (("/0123456789abcdefghio`").indexOf(keychar) > -1))
       return true;
   else if (tipo=="H" && ((":0123456789").indexOf(keychar) > -1))
       return true;
   	else if (tipo=="F" && (("0123456789").indexOf(keychar) > -1 || (key==188)) )
	   return true;
   
   return false;      
}

/***********************************************************************************
Filtra dados do campo - Utilizado apenas pelo Netscape
***********************************************************************************/
function filtraCampo(valor){
	var s = "";
	var cp = "";
	vr = valor;
	tam = vr.length;

	for (i = 0; i < tam ; i++) 
	{  
		if (vr.substring(i,i + 1) != "/" && vr.substring(i,i + 1) != "-" && 			vr.substring(i,i + 1) != "."  && vr.substring(i,i + 1) != "," )
		{
		 	s = s + vr.substring(i,i + 1);
		}
	}
	return s
}

/************************************************************
Saltar para o pr?ximo campo
--------------------------------------------------------
Fun??o:		saltaCampo (campo,prox,tammax,teclapres)
--------------------------------------------------------

=> campo =	Tipo: String
		Nome do campo atual
=> prox  =	Tipo: String 
		Nome do pr?ximo campo
=> tammax =	Tipo: int
		Tamanho m?ximo do campo atual
=> teclapres =	[event]
		O evento disparado para chamar a fun??o 
		(tecla pressionada, por exemplo)

<Chamar no ONKEYUP do campo>

Exemplo:	saltaCampo('fldatual','fldprox',5,event);

************************************************************/

function saltaCampo (campo,prox,tammax,teclapres,form)
{
    if(NNav)
        var tecla = teclapres.which;
    else
        var tecla = teclapres.keyCode;

	var ssProx 	= getCampo(prox, form);
	var vr = retornaValorCampo(campo,form);
 	var tam = vr.length;	

 	if (tecla != 0 && tecla != 9 && tecla != 16)
	{
		if(tecla == 13)
			ssProx.focus();
		else if ( tam == tammax )	
		{
			ssProx.focus() ;	
		}
	}
}

function setFuncaoOnLoad(decFunction) {
   if (this.cacheFunction == null) {this.cacheFunction = new Array();} 
   this.cacheFunction[this.cacheFunction.length] = decFunction;
}

function executarFuncaoOnLoad()
{
	if(this.cacheFunction != null)
	{
		for(i = 0; i < this.cacheFunction.length; i++)
			eval(this.cacheFunction[i]);
	}
}

function replaceString(exp, str, repl)
{
	var strRepl = new String(str);
	strRepl = strRepl.replace(exp,repl);
	return strRepl;	
}

/*-------------------------------------*\
	INICIO FUN??ES PARA TRATAMENTO URL
\*-------------------------------------*/

function limparUrl(url,str)
{
	var pos = url.indexOf(str);
	if(pos >= 0)
		return url.substring(0,pos);
	else
		return url;	
}

function incluirIdSessao(url, id)
{
	var exp = new RegExp("\\.do");
	url = replaceString(exp, url, ".do;jsessionid="+id);
	return url;	
}

//FIM FUN??ES PARA TRATAMENTO URL


/*----------------------------------------*\
	INICIO FUN??ES PARA TRATAMENTO IMAGENS
\*----------------------------------------*/
var images = new Array();
function regImg(nome, src, alt)
{
	this.nome = nome;
	this.src  = src;
	this.alt  = alt;
}

function getImagem(nome)
{
	for(i = 0; i < images.length; i++)
	{
		if(images[i].nome == nome)
			return images[i];
	}
	return false;
}

function getImagemById(id)
{
	return document.images[id];
}

function alteraImagem(id, src, alt)
{
	var img = getImagemById(id);
	if(img)
	{
		img.src = src;
		img.alt = alt;
	}
}

function alteraImagems(id, src, alt)
{
	for(i=0; i<document.images.length; i++)
	{	
		if(document.images[i].id == id) {
			document.images[i].src = src;
			document.images[i].alt = alt;	
		}
	}
}

/**
 * Fun??o para retornar multiplos valores.<b> 
 * adiciona o valor no campo registrado para a chave idsPlc e descPlc
 * no idsPlc ser? adicionado os valos do campo com id idsPlc da p?gina de sele??o
 * no descPlc ser? adicionado os valos do campo com id descPlc da p?gina de sele??o
 */
function retornarMultiSel() 
{
	var checks 	= getCampo("indExcPlc");	//checkbox
	var idsPlc 	= getCampo("idsPlc");	// ids de todas as linhas
	var descPlc = getCampo("descPlc");	// descri??o de todas as linhas
	
	//se encontrou o objeto	
	if(checks){
		if(!checks.length){	//se for apenas 1 check, o javascript trava n?o como array e sim como apenas umc campo
			if (checks.checked){
				opener.setValorCampo(opener.getCampoRetornoById('idsPlc'),idsPlc.value,",");
				opener.setValorCampo(opener.getCampoRetornoById('descPlc'),descPlc.value,"\n");
			}
		}
		
		//para cada check marcado, seta o valor nos campos. n?o adiciona valores repetidos
		for (var i = 0; i < checks.length; i++){
			var e = checks[i];
			if (e.checked){
				opener.setValorCampo(opener.getCampoRetornoById('idsPlc'),idsPlc[i].value,",");
				opener.setValorCampo(opener.getCampoRetornoById('descPlc'),descPlc[i].value,"\n");
			}
		}
	
		window.close();
	}
}

/*-----------------------------------------------------*\
	INICIO FUN??ES PARA TRATAMENTO CRITERIO ORDENACAO
	-------------------------------------------------
	
 	Utiliza??o:
 	<a href="#" onclick="setValorCampoAtualizacao('saida', 'obj.id '+getCriterioOrdenacao('id'), montaCriterioNovo('id', 'obj'), ','); 
 	substituirImagem('id')">C?digo</a>
\*-----------------------------------------------------*/

function atualizaCriterio(nomeCampo, valorReplace, valorNovo, separador, form)
{
	atualizaValorCampo(nomeCampo, valorReplace, valorNovo, separador, form);
	setValorCampo(nomeCampo, valorNovo, separador, form);
	setValorCampo(nomeCampo, ordenaCriterio (nomeCampo, retornaValorCampo(nomeCampo), separador));
}

var ordem = new Array();
function ordenaCriterio (campo, listaCampos, separador)
{
	listaOrdenada = "";
	for (i = 0; i < ordem.length; i++)
	{
		if(listaCampos.indexOf(ordem[i]) >= 0)
		{
			if(listaOrdenada != "")
				listaOrdenada += separador;
			listaOrdenada += ordem[i]+" "+getCriterioOrdenacao(ordem[i]);
		}
	} 
	return listaOrdenada;
}

function atualizaCriterioOrdenacao(chave)
{
	var criterio = getVarGlobal(chave);
	if(criterio == "desc")
		setVarGlobal(chave, "");
	else if(criterio == "asc")	
		setVarGlobal(chave, "desc");
	else if(criterio == null || criterio == "")
	{
		setVarGlobal(chave, "asc");
		criterio = "asc";
	}
	return getVarGlobal(chave);
}

function getCriterioOrdenacao(chave)
{
	var criterio = getVarGlobal(chave);
	return criterio;	
}

function setCriterioOrdenacao(chave, criterio)
{
	setVarGlobal(chave,criterio);
}

function mantemEstadoCriterio(listaCampos, chave, separador)
{
	var campos = listaCampos.split(separador);
	for (k=0; k < campos.length; k++)
	{
		var dadosCampo = campos[k].split(" ");
		if(dadosCampo[0] == chave){
			setCriterioOrdenacao(dadosCampo[0],dadosCampo[1]);
			substituirImagems(dadosCampo[0]);
			break;
		}
	}
}

function montaCriterioNovo(campo, alias)
{
	var criterio = atualizaCriterioOrdenacao(campo);
	// if(""+alias == "undefined" || alias == "")
	// alias = "obj";
	if(criterio == null || criterio == "" || ""+criterio == "undefined")
		return "";
	else
		return campo+" "+criterio; 
	// return alias+"."+campo+" "+criterio; 
}

function substituirImagem(campo)
{
	var criterio = getCriterioOrdenacao(campo);
	var imgArray = getImagem(criterio);
	alteraImagem("IMAGEM_"+campo, imgArray.src, imgArray.alt);	
}

function substituirImagems(campo)
{
	var criterio = getCriterioOrdenacao(campo);
	var imgArray = getImagem(criterio);
	alteraImagems("IMAGEM_"+campo, imgArray.src, imgArray.alt);	
}

//FIM FUN??ES JCOMPANY

/*********************************
* Switch Content script- ? Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use. Last updated Mar 23rd, 2004.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

/********************************************************************************
IMPORTANTE: ESTE PAR?METRO DEVE ESTAR COM VALOR "off" PARA EVITAR PROBLEMA DE
QUEDA DE SESS?O PELA SUBSTITUI??O DO COOKIE DE SESS?O
********************************************************************************/
var enablepersist="off" //Enable saving state of content structure using session cookies? (on/off)
/********************************************************************************/

var collapseprevious="no" //Collapse previously open content when opening present? (yes/no)

if (document.getElementById){
document.write('<style type="text/css">')
document.write('.expandeRetraiPlc{display:none;}')
document.write('</style>')
}

function getElementbyClass(classname){
ccollect=new Array()
var inc=0
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++){
if (alltags[i].className==classname)
ccollect[inc++]=alltags[i]
}
}

function contractcontent(omit){
var inc=0
while (ccollect[inc]){
if (ccollect[inc].id!=omit)
ccollect[inc].style.display="none"
inc++
}
}

function expandcontent(cid){
if (typeof ccollect!="undefined"){
if (collapseprevious=="yes")
contractcontent(cid)
document.getElementById(cid).style.display=(document.getElementById(cid).style.display!="block")? "block" : "none"
}
}

function revivecontent(){
contractcontent("omitnothing")
selectedItem=getselectedItem()
selectedComponents=selectedItem.split("|")
for (i=0; i<selectedComponents.length-1; i++)
document.getElementById(selectedComponents[i]).style.display="block"
}

function get_cookie(Name) { 
var search = Name + "="
var returnvalue = "";
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search)
if (offset != -1) { 
offset += search.length
end = document.cookie.indexOf(";", offset);
if (end == -1) end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset, end))
}
}
return returnvalue;
}

function getselectedItem(){
if (get_cookie(window.location.pathname) != ""){
selectedItem=get_cookie(window.location.pathname)
return selectedItem
}
else
return ""
}

function saveswitchstate(){
var inc=0, selectedItem=""
while (ccollect[inc]){
if (ccollect[inc].style.display=="block")
selectedItem+=ccollect[inc].id+"|"
inc++
}

document.cookie=window.location.pathname+"="+selectedItem
}

function do_onload(){
uniqueidn=window.location.pathname+"firsttimeload"
getElementbyClass("switchcontent")
if (enablepersist=="on" && typeof ccollect!="undefined"){
document.cookie=(get_cookie(uniqueidn)=="")? uniqueidn+"=1" : uniqueidn+"=0" 
firsttimeload=(get_cookie(uniqueidn)==1)? 1 : 0 //check if this is 1st page load
if (!firsttimeload)
revivecontent()
}
}


if (window.addEventListener)
window.addEventListener("load", do_onload, false)
else if (window.attachEvent)
window.attachEvent("onload", do_onload)
else if (document.getElementById)
window.onload=do_onload

if (enablepersist=="on" && document.getElementById)
window.onunload=saveswitchstate

/*********************************
* Fim Switch Content
**********************************/
/*-----------------------------------------------------*\
   INICIO FUN??ES PARA ABA ?GIL
\*-----------------------------------------------------*/
var layers    = new Array();
function showHideAba(aba,ancora){
	for( var i=0; i<layers.length; i++){
		if(layers[i] == aba){
			document.getElementById(layers[i]).className = "tab_ativada";
			document.getElementById("td_borda_esq_"+layers[i]).className = "tab_ativada";
			document.getElementById("td_borda_dir_"+layers[i]).className = "tab_ativada";
			document.getElementById("td_borda_"+layers[i]).className = "tab_ativada";			
		   	document.getElementById(layers[i]+"_corpo").className = "tabVisivel";
			if(ancora != null && ancora != "");
			   	document.location.hash=ancora;
		   	setValorCampo('tabCorrenteDinamicoPlc',aba);
		}else{
			document.getElementById("td_borda_esq_"+layers[i]).className = "tab_desativada";
			document.getElementById("td_borda_dir_"+layers[i]).className = "tab_desativada";
			document.getElementById("td_borda_"+layers[i]).className = "tab_desativada";						
		   	document.getElementById(layers[i]).className = "tab_desativada";
		   	document.getElementById(layers[i]+"_corpo").className = "tabOculta";
		}
  	}

}
 
/*--------------------------------------------------------------*\
   jCompany 2.5. Guarda objeto do foco para facilitar cria??o de novos detalhes
\*--------------------------------------------------------------*/ 
 function trataOnFocus (evt) {
	// Pega nome do detalhe, se campo contiver, ou esvazia o "detCorrPlc"
	var nomeCampo = this.name;
	if (nomeCampo.indexOf(".")==-1)
	   set("detCorrPlc","");
	else {
		var nomeDet = nomeCampo.substring(0,nomeCampo.indexOf("["));
	//   alert (nomeDet);
	   set("detCorrPlc",nomeDet);	
	}
	// Compatibiliza com evento de onfocus existente
	if (this.oldOnFocus){
      this.oldOnFocus(evt);
	}
 } 

/*---------------------------------------------------------------------------*\
  jCompany 2.5. Acrescenta evento chamada ? fun??o onFocus para logica de registro do objeto
\*---------------------------------------------------------------------------*/ 
 function setUpOnFocusHandlers () {
 	if(document.forms) {
	    for (var f = 0; f < document.forms.length; f++) {
 			if(document.forms[f].elements) {
		      for (var e = 0; e < document.forms[f].elements.length; e++) {
		        if (document.forms[f].elements[e] && 
		          (document.forms[f].elements[e].type == 'text' 
		           || document.forms[f].elements[e].type == 'textarea'
		           || document.forms[f].elements[e].type == 'select-one' 
		           || document.forms[f].elements[e].type == 'select-multiple' 
		           || document.forms[f].elements[e].type == 'password'
		           || document.forms[f].elements[e].type == 'checkbox'
		           || document.forms[f].elements[e].type == 'radio' 
		           || document.forms[f].elements[e].type == 'fileupload')) {
		          document.forms[f].elements[e].oldOnFocus = 
		            document.forms[f].elements[e].onfocus;
		          document.forms[f].elements[e].onfocus = trataOnFocus;
		        }
		      }
		   }
	    }
	 } 
  }
  
  
function verificaNumero(campo, e){

	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
		case 13: //Enter
			return true; //sai da funcao, validando a tecla
	}
	
	var key = String.fromCharCode(code); //Transforma codigo em caracter
	if (isNaN(key)) return false;  //N?o ? numero, sai da funcao
	return true;
}
  
function formataNumero(campo, e, milSep, decSep, casas){
	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
		case 13: //Enter
			return true; //sai da funcao, validando a tecla
	}
	
	var key = String.fromCharCode(code); //Transforma codigo em caracter
	if (isNaN(key) || code == 32) return false;  //N?o ? numero, sai da funcao
	if(campo.maxLength <= campo.value.length) return false;//trata erro de casas
	
	var i = j = 0;
	var len = campo.value.length;
	var len2 = 0;
	var aux = aux2 = '';
	
	milSep = typeof milSep != "undefined" ? milSep : "."; //se separadores forem nulos,
	decSep = typeof decSep != "undefined" ? decSep : ",";//especifica separadores padr?es
	
	for(i = 0; i < len; i++)
		if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != decSep))
			break;
	
	for(; i < len; i++){
		if (!isNaN(campo.value.charAt(i))) //se for numero
			aux += campo.value.charAt(i);	//adiciona a variavel auxiliar
	}
	
	aux += key; 		//adiciona tecla digitada
	len = aux.length;
	
	if (len == 0) campo.value = '';
	
	//se o numero do campo for menor q a quantidade de casas decimais
	if(len > 0 && len <= casas){ //insere os zeros necessarios antes do mesmo
		campo.value = '0' + decSep;
		
		for(i = 1; i < casas - len; i++)
			campo.value += '0';
			
		campo.value += aux;
	}
	
	if (len > casas ) {
		aux2 = '';
		
		for (j = 0, i = len - (casas + 1); i >= 0; i--) {
			if (milSep != "" && j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		campo.value = '';
		len2 = aux2.length;
		
		for (i = len2-1  ; i >= 0; i--) //coloca numero com ou sem separadores no campo
			campo.value += aux2.charAt(i);
		
		//adiciona numeros decimais
		campo.value += decSep + aux.substr(len - casas, len);
	}
	
	campo.value = campo.value.substr(0, campo.value.length - 1);
	

	return true;
}
function formataNumero2(campo, e, milSep, decSep, casas){
	var code = (window.Event) ? e.which : e.keyCode; //pega codigo da tecla digitada
	
	switch(code){ //caso seja...
		case 0: //Delete
		case 8: //backspace
		case 13: //Enter
			return true; //sai da funcao, validando a tecla
	}
	
	var key = String.fromCharCode(code); //Transforma codigo em caracter
	if (isNaN(key) || code == 32) return false;  //N?o ? numero, sai da funcao
	if(campo.maxLength <= campo.value.length) return false;//trata erro de casas
	
	var i = j = 0;
	var len = campo.value.length;
	var len2 = 0;
	var aux = aux2 = '';
	
	milSep = typeof milSep != "undefined" ? milSep : "."; //se separadores forem nulos,
	decSep = typeof decSep != "undefined" ? decSep : ",";//especifica separadores padr?es
	
	for(i = 0; i < len; i++)
		if ((campo.value.charAt(i) != decSep))
			break;
	
	for(; i < len; i++){
		if (!isNaN(campo.value.charAt(i))) //se for numero
			aux += campo.value.charAt(i);	//adiciona a variavel auxiliar
	}
	
	aux += key; 		//adiciona tecla digitada
	len = aux.length;
	
	if (len == 0) campo.value = '';
	
	//se o numero do campo for menor q a quantidade de casas decimais
	if(len > 0 && len <= casas){ //insere os zeros necessarios antes do mesmo
		campo.value = campo.value.toString().substring(0,campo.value.indexOf(',')) + decSep;

		//for(i = 1; i < casas - len; i++)
			//campo.value += '0';
			
		campo.value += aux;
	}
	
	if (len > casas ) {
		aux2 = '';
		
		for (j = 0, i = len - (casas + 1); i >= 0; i--) {
			if (milSep != "" && j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		campo.value = '';
		len2 = aux2.length;
		
		for (i = len2-1  ; i >= 0; i--) //coloca numero com ou sem separadores no campo
			campo.value += aux2.charAt(i);
		
		//adiciona numeros decimais
		campo.value += decSep + aux.substr(len - casas, len);
	}
	
	campo.value = campo.value.substr(0, campo.value.length - 1);
	

	return true;
}

//funcao para validar o cpf
function Verifica_campo_CPF(src) {

var CPF = src.value; // Recebe o valor digitado no campo
//retirando os digitos invalidos do CPF passado
    CPF = CPF.toString().replace( "-", "" );
    CPF = CPF.toString().replace( ".", "" );
    CPF=  CPF.toString().replace( ".", "" );
    CPF = CPF.toString().replace( "/", "" );

// Aqui comeca a checagem do CPF
var POSICAO, I, SOMA, DV, DV_INFORMADO;
var DIGITO = new Array(10);
DV_INFORMADO = CPF.substr(9, 2); // Retira os dois ultimos digitos do no. informado


if (CPF == "00000000000" || CPF == "11111111111" || CPF == "22222222222" || CPF == "33333333333" || CPF == "44444444444" || CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" || CPF == "88888888888" || CPF =="99999999999"){
   alert("Numero de CPF Invalido ! ");
   return {validade:'N'};  
   src.value = '';
   src.focus(); 
}

// Desmembra o no. do CPF na array DIGITO
   for (I=0; I<=8; I++) {
     DIGITO[I] = CPF.substr( I, 1);
}

// Calcula o valor do 10o. digito da verificacao
   POSICAO = 10;
   SOMA = 0;
   for (I=0; I<=8; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[9] = SOMA % 11;
   if (DIGITO[9] < 2) {
        DIGITO[9] = 0;
}
   else{
       DIGITO[9] = 11 - DIGITO[9];
}

// Calcula o valor do 11o. digito da verificacao
   POSICAO = 11;
   SOMA = 0;
   for (I=0; I<=9; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
   DIGITO[10] = SOMA % 11;
   if (DIGITO[10] < 2) {
        DIGITO[10] = 0;
   }
   else {
        DIGITO[10] = 11 - DIGITO[10];
   }

// Verifica se os valores dos digitos verificadores conferem
   DV = DIGITO[9] * 10 + DIGITO[10];
   if (DV != DV_INFORMADO) {
      alert("Numero de CPF invalido");  
      return {validade:'N'};
      src.value = '';
      src.focus(); 
   } 
   
   return {validade:'S'};
}

function validar_PIS(objeto) {

var valorDigitado = objeto.value;


//	if(valorDigitado == '') {
//		alert("Digite o n?mero do PIS/PASEP");
//		objeto.focus();
//		return;
//	}
	
	if ((!validaPIS(eval("'" + valorDigitado.substring(0,14) + "'"), eval("'" + valorDigitado.substring(14,15) + "'")))){
		alert("O PIS/PASEP: " + valorDigitado + " e invalido");
		objeto.value = '';
//		objeto.focus();
		return;
//	} else {
//		alert("O PIS/PASEP: " + valorDigitado + " ? v?lido");
//		objeto.focus();
//		return;
//    }
	}
}

function validaPIS(Numero,Digito) {
	for (i=0; i<Numero.length; i++)
	{
		Numero = Numero.toString().replace("-","");
		Numero = Numero.toString().replace(".","");	
		Numero = Numero.toString().replace(".","");
		Numero = Numero.toString().replace(".","");
		Numero = Numero.toString().replace("/","");
	}

	var PASEP = Numero
	var peso1 = '3298765432';
	var soma1 = 0;
	var digito1 = 0;

	for (i = 1; i < 10 - Numero.length+1; i++) {
		PASEP = eval("'" + 0 + PASEP + "'")
	}
	
	for (i = 1; i < PASEP.length+1; i++) {
		soma1 += PASEP.substring(i, i-1) * peso1.substring(i, i-1);
	}
	
	soma1 %= 11;

	if (soma1 < 2) {
		digito1 = 0;
	} else {
		digito1 = 11 - soma1; 
	}

	if (eval("'" + digito1 +"'") != Digito) {
		return false;
		alert("false");
	} else {
		return true;
		alert("true");
	}	
}

function mascara_pis(campo) {
	if (campo.value.length == 1) { campo.value += "."; }
	if (campo.value.length == 5) { campo.value += "."; }
	if (campo.value.length == 9) { campo.value += "."; }
	if (campo.value.length == 13) { campo.value += "-"; }
}

//valida CEP
function validaCEP(cep){
	exp = /\d{2}\.\d{3}\-\d{3}/
	if(!exp.test(cep.value)){
		alert('Numero de Cep Invalido!');
		cep.value = '';
	}
}

function FormataCNPJ(Campo, teclapres){

 var vr = new String(Campo.value);
if(navigator.appName.indexOf("Netscape")!= -1) 

tecla= teclapres.which; 
  
else 
  
tecla= teclapres.keyCode; 
 
key = String.fromCharCode( tecla); 

	var strValidos = "0123456789"   
	if ( strValidos.indexOf( key ) == -1 && tecla!= 8 &&  tecla!= 0){
		return false;   
	}

   if(window.event){
    var tecla = teclapres.keyCode;
   }else  tecla = teclapres.which;
  
   vr = vr.replace(".", "");
   vr = vr.replace(".", "");
   vr = vr.replace("/", "");
   vr = vr.replace("-", "");

   tam = vr.length + 1;

   
   if (tecla != 9 && tecla != 8){
      if (tam > 2 && tam < 6)
         Campo.value = vr.substr(0, 2) + '.' + vr.substr(2, tam);
      if (tam >= 6 && tam < 9)
         Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,tam-5);
      if (tam >= 9 && tam < 13)
         Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,3) + '/' + vr.substr(8,tam-8);
      if (tam >= 13 && tam < 15)
         Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,3) + '/' + vr.substr(8,4)+ '-' + vr.substr(12,tam-12);
      }
	  return true;
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

//######### Felipe Reis #################
//######### metodo que extra? do 'google' com a funcao de retirar espacos de uma string.
function Trim(str){
	if(str != null)
		return str.replace(/^\s+|\s+$/g,"");
	else 
		return "";
}

/**
 ######### Felipe Reis #################
 ######### metodo que extra? do 'google' com a funcao de formatar/desformatar/arredondar valores monet?rios
 * moeda
 * 
 * Classe que formata de desformata valores monet?rios em float e formata valores 
 * de float em moeda.
 * 
 **/
 var moeda = {
 	
	/**
	 * retiraFormatacao
	 * 
	 * Remove a formata??o de uma string de moeda e retorna um float
	 * 
	 * @param {Object} num
	 */
	 desformatar: function(num){
	   num = num.replaceAll(".","");
	
	   num = num.replaceAll(",",".");

	   return parseFloat(num);
	},

	/**
	 * formatar
	 * 
	 * Deixar um valor float no formato monet?rio
	 * 
	 * @param {Object} num
	 */
	formatar: function(num){
	   x = 0;
	
	   if(num<0){
	      num = Math.abs(num);
	      x = 1;
	   }
	
	   if(isNaN(num)) num = "0";
	      cents = Math.floor((num*100+0.5)%100);

	   num = Math.floor((num*100+0.5)/100).toString();
	
	   if(cents < 10) cents = "0" + cents;
	      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	         num = num.substring(0,num.length-(4*i+3))+'.'
	               +num.substring(num.length-(4*i+3));
	
	   ret = num + ',' + cents;
	
	   if (x == 1) ret = ' - ' + ret;return ret;
	},
	
	/**
	 * arredondar
	 * 
	 * @abstract Arredonda um valor quebrado para duas casas decimais.
	 * 
	 * @param {Object} num
	 */
	arredondar: function(num){
		return Math.round(num*Math.pow(10,2))/Math.pow(10,2);
	}
}

function validaNumero(obj){
	//verificador de caracter num?rico.
	var reDigits = /^\d+$/;
	if (!reDigits.test(Trim(obj.value))){
		obj.value = '';
		return false;
	}
	return true;
}

function ancora(a){
	if (a != '') {
		document.location.hash=a;
	}
}

//Marca/Desmarca todos os checkboxes para ser ultilizado com v?rios checks no mesmo Form //Felipe Reis
function checkUncheckAllParaVariosChecks(theForm, campo, nomeCheck) { 
	for (i = 0; i < theForm.elements.length; i++) {
	    	if (theForm[i].type == 'checkbox' && theForm[i].name.indexOf(nomeCheck) > -1) {
		    	theForm[i].checked = campo.checked; 
	    	}
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

function mascaraCep(objeto, teclapres){

 if(navigator.appName.indexOf("Netscape")!= -1) 
    tecla= teclapres.which; 
  else 
    tecla= teclapres.keyCode; 
	
	key = String.fromCharCode(tecla); 

	var strValidos = "0123456789"   
	if (strValidos.indexOf(key) == -1 && tecla != 8 &&  tecla != 0){
		return false;   
	}

    //if (objeto.value.indexOf("-") == -1 && objeto.value.length > 5){ objeto.value = ""; }
	if (objeto.value.length == 5){
		objeto.value += "-";
	}
}