/*
	PlcTooltip - Ferramenta para cria??o de caixas de mensagens customizadas
  	by Rodrigo Magno

  	Para criar caixas de mensagens na aplica??o:
	1) incluir no cabe?alho da p?gina os estilos abaixo. Estes estilos ser?o utilizados para gerar uma caixa de mensagens
	padr?o e poder?o ser alterados posteriormente por comandos no par?metro
		<style type="text/css">
			div.tooltipdiv{position:absolute;width:80%;top:50px;left:50px;z-index:4;visibility:hidden;border:1px solid}
			table.tooltipcorpo{color:#000000;background:#EFEFEF;width:100%;padding:0 0 0 0;margin:0 0 0 0}
			td.tooltiptitulo{color:#000000;background:#EFEFEF;font:bold 12px Verdana,Arial,sans-serif}
			td.tooltipconteudo{color:#000000;background:#EFEFEF;font:11px Verdana,Arial,sans-serif}
			td.tooltipclose{color:#000000;background:#EFEFEF;font:11px Verdana,Arial,sans-serif;text-align:right}
		</style>
	2) criar no corpo da p?gina o div abaixo. O identificador deste div e sua classe poder?o ser alterados.
		<div id="ToolTip" class="tooltipdiv"></div>
	3) criar chamadas javascript para os eventos:
		onmousemove="verificar();" 
		onMouseover="criarTootip('ToolTip','Tooltip Content','TITULO','T?tulo','ONMOVE');" 
		onMouseout="desativar();"

	Observa??o: a) os par?metros obrigat?rios s?o o nome do div e o conte?do. 
				b) os outros par?metros devem ser informados aos pares ('TITULO','T?tulo da Mensagem'), exceto
				c) os par?metros come?ados com ON, que s?o ?nicos ('ONMOVE', 'ONCLOSE')
*/
var ie = document.all ? 1 : 0;
var ns = document.layers ? 1 : 0;
var Ex, Ey, doc, sty;
if(ns){doc = "document."; sty = "";}
if(ie){doc = "document.all."; sty = ".style"}
var initialize 	= 0;
var active		= 0;	

function iniciarVariaveis()
{
	if(ie){
		Ex = "event.x"
		Ey = "event.y"
	}
	if(ns){
		Ex = "e.pageX"
		Ey = "e.pageY"
		window.captureEvents(Event.MOUSEMOVE)
		window.onmousemove=verificar;
		window.captureEvents(Event.MOUSEOVER)
		window.onmouseover=criarTooltip;
		window.captureEvents(Event.MOUSEOUT)
		window.onmouseout=desativar;
		window.captureEvents(Event.CLICK)
		window.click=fechar;
	}

	this.DIVTOOLTIP = "";						//Nome do div utilizado para mostrar tooltip [obrigat?rio]
	this.CONTEUDO		= "";							//Conte?do do tooltip [obrigat?rio]
	this.TOPO			= 0;								//Posicionamento em rela??o ao topo [opcional]
	this.ESQUERDA		= 0;							//Posicionamento em rela??o ? esquerda [opcional]
	this.ALTURA			= 0;								//Altura do conte?do [opcional]
	this.LARGURA		= 0;							//Largura do conte?do [opcional]
	this.BORDA			= 0;							//Largura da borda do conte?do [opcional]
	this.TITULO			= "";							//T?tulo do tooltip [opcional]
	this.CLASSETITULO	= "subsecao";		//Classe utilizada para formatar o titulo do tooltip [opcional]
	this.CLASSECONTEUDO	= "tooltipconteudo";//Classe utilizada para formatar o cont?udo do tooltip [opcional]
	this.CLASSETOOLTIP	= "tooltipcorpo";		//Classe utilizada para formatar o box do tooltip [opcional]
	this.CLASSEONCLOSE	= "subsecao";				//Classe utilizada para formatar o box do tooltip [opcional]
	this.CLASSEONCONFIRM= "subsecao";				//Classe utilizada para formatar bot?es sim/n?o [opcional]
	this.ONMOVE			= 0;				//Indica que o tooltip deve se mover  [opcional]
	this.ONCLOSE		= 0;				//Indica que o tooltip deve esperar clique para fechar
	this.ONCONFIRM		= 0;				//Indica que o tooltip deve apresentar bot?es sim/n?o
	this.CONFIRM		= 0;				//Indica fun??o que deve ser executada ap?s clique do sim
	this.ONCENTER		= 0;				//Indica que o tooltip deve ser centralizado na tela
	this.ONMODAL		= 0;				//Indica que o tooltip deve ser modal
	this.LABELCLOSE		= "[X]";	//Indica que o tooltip deve esperar clique para fechar
	//Cont?udo que ser? utilizado para bot?o de fechamento [opcional]
	//Se for definido outro conte?do dever ser chamado do evento onclick a fun??o 'fechar()'
	this.CONTEUDOCLOSE	= "";
	this.CONTEUDOLIVRE	= 0; 				//Utiliza conte?do sem formata??o
}

function moverToolTip(layerName, FromTop, FromLeft,e){
	var deslocTop 	= window.event ? document.body.scrollTop : 0;
	var deslocLeft 	= window.event ? 15 : 0;
	if(this.ONMODAL)
		modal(e);
	if(ie){eval(doc + layerName + sty + ".top = "  + (eval(FromTop) + deslocTop))}
	if(ns){eval(doc + layerName + sty + ".top = "  + eval(FromTop))}
	eval(doc + layerName + sty + ".left = " + (eval(FromLeft) + deslocLeft))
}

function inserirConteudo(layerName){
	if(ie){document.all[layerName].innerHTML = this.CONTEUDO}
	if(ns){
		with(document.layers[layerName].document) 
		{ 
		   open(); 
		   write(this.CONTEUDO); 
		   close(); 
		}
	}
}

function ativar(){initialize=1; active = 1;}
function desativar(e){	
	initialize=0; 
	if(!this.ONCLOSE) 
		verificar(e);
}
function confirmar(confirm, e){	
	fechar(e);
	if(confirm)
		eval("executeConfirm()");
}
function fechar(e){this.ONCLOSE = 0; desativar(e);}
function verificar(e){
	if(active){
		if(initialize){
			if(this.ONMOVE){
				if(window.event)
					moverToolTip(this.DIVTOOLTIP, Ey, Ex,e)
				else	
					moverToolTip(this.DIVTOOLTIP, this.TOPO, this.ESQUERDA,e)
			}
			hideIframe();
			hideFormSelect();             
			eval(doc + this.DIVTOOLTIP + sty + ".visibility = 'visible';")
		}
		else{
			if(!this.ONCLOSE){
				if(this.ONMOVE)
					moverToolTip(this.DIVTOOLTIP, this.TOPO, this.ESQUERDA, e)
				eval(doc + this.DIVTOOLTIP + sty + ".visibility = 'hidden';")
				active=0; 
				showIframe();
				showFormSelect();             
			}
		}
	}
}

function criarTooltip(e)
{
	iniciarVariaveis();
	if(arguments && arguments.length > 0)
	{
		this.DIVTOOLTIP = arguments[0];
		this.CONTEUDO		= arguments[1]
		for(i = 2; i < arguments.length; i++)
		{
			if(arguments[i] == "TITULO")
				this.TITULO = arguments[++i];
			else if(arguments[i] == "CLASSETITULO")
				this.CLASSETITULO = arguments[++i];
			else if(arguments[i] == "CLASSECONTEUDO")
				this.CLASSECONTEUDO = arguments[++i];
			else if(arguments[i] == "CLASSETOOLTIP")
				this.CLASSETOOLTIP = arguments[++i];
			else if(arguments[i] == "ONMOVE")
				this.ONMOVE = 1;
			else if(arguments[i] == "ONCLOSE")
				this.ONCLOSE = 1;
			else if(arguments[i] == "ONCONFIRM"){
				this.ONCONFIRM = 1;
				this.CONFIRM = arguments[++i];
			}
			else if(arguments[i] == "ONCENTER")
				this.ONCENTER = 1;
			else if(arguments[i] == "ONMODAL")
				this.ONMODAL = 1;
			else if(arguments[i] == "CONTEUDOCLOSE")
				this.CONTEUDOCLOSE = arguments[++i];
			else if(arguments[i] == "CLASSEONCLOSE")
				this.CLASSEONCLOSE = arguments[++i];
			else if(arguments[i] == "LABELCLOSE")
				this.LABELCLOSE = arguments[++i];
			else if(arguments[i] == "TITULOCLOSE")
				this.LABELCLOSE = arguments[++i];
			else if(arguments[i] == "ESQUERDA")
				this.ESQUERDA = arguments[++i];
			else if(arguments[i] == "TOPO")
				this.TOPO = arguments[++i];
			else if(arguments[i] == "ALTURA")
				this.ALTURA = arguments[++i];
			else if(arguments[i] == "LARGURA")
				this.LARGURA = arguments[++i];
			else if(arguments[i] == "CONTEUDOLIVRE")
				this.CONTEUDOLIVRE = 1;
			else if(arguments[i] == "BORDA")
				this.BORDA = arguments[++i];
		}
	}
	else
		alert("ERRO - Argumentos inv?lidos para gera??o do tooltip.");

	if(!this.CONTEUDOLIVRE)
		this.CONTEUDO = criarConteudo()
	//alert(this.CONTEUDO)	
	inserirConteudo(this.DIVTOOLTIP);
	ativar();
	verificar(e);

	if(this.ONCENTER)
		centralizar();
	if(!window.event)
		moverToolTip(this.DIVTOOLTIP, this.TOPO, this.ESQUERDA);
}

function getOnClose(){
	if (this.ONCLOSE){
		if(this.CONTEUDOCLOSE != "" && this.CONTEUDOCLOSE != "#" && this.CONTEUDOCLOSE != "null")
			return this.CONTEUDOCLOSE;
		else if(this.LABELCLOSE != "" && this.LABELCLOSE != "#" && this.LABELCLOSE != "null")	
			return "&nbsp;&nbsp;<A href='#' onclick='fechar();'>"+this.LABELCLOSE+"</A>";
	}
	return "";
}

function getLargura(){
	if (this.LARGURA)
		return "WIDTH=\""+this.LARGURA+"\"";
	return "";
}

function getBorda(){
	if (this.BORDA)
		return "BORDER=\""+this.BORDA+"\"";
	return "";
}

function getAltura(){
	if (this.ALTURA)
		return "style=\"height:"+this.ALTURA+"px;\"";
	return "";
}

function getOnConfirm(){
	var confirm = "";
	if (this.ONCONFIRM)
	{
		confirm =  "<TABLE class=\""+this.CLASSONCONFIRM+"\" cellSpacing=\"1\" cellPadding=\"\"2 width=\"100%\" border=\"0\">" +
				   "<TR> <TD><P align=center><A onclick=\"confirmar(true);\" href=\"#\">Sim</A></TD>"+
				   "<TD><P align=center><A onclick=\"confirmar(false);\" href=\"#\">N?o</A></TD></TR>"+
				   "</TABLE>";
	}
	return confirm;
}

function getOnModal(){
	var modal = "";
	if (this.ONMODAL)
		modal =  " onmousemove='modal(event);' ";
	return modal;
}

function criarConteudo(){
	var close 	= getOnClose();
	var confirm = getOnConfirm();
	var modal 	= getOnModal();
	var altura	= getAltura();
	var largura	= getLargura();
	var borda	= getBorda();
	var colspan = close == "" && titulo != "" ? "" : 'colspan="2"'
	var classeTooltip 	= this.CLASSETOOLTIP == "null" 	|| this.CLASSETOOLTIP == "#" ? "" : "class=\""+this.CLASSETOOLTIP+"\"";
	var classeTitulo 	= this.CLASSETITULO == "null" 	|| this.CLASSETITULO == "#" ? "" : "class=\""+this.CLASSETITULO+"\"";
	var classeConteudo 	= this.CLASSECONTEUDO == "null" || this.CLASSECONTEUDO == "#" ? "" : "class\"="+this.CLASSECONTEUDO+"\"";
	var titulo 	= this.TITULO == "null" || this.TITULO == "#" ? "" : this.TITULO;
	
	var tooltip = 
	'<TABLE '+borda+' '+largura+' '+classeTooltip+' cellspacing="0" cellpadding="0" '+modal+'>';
	if(titulo != ""){
		tooltip += '\n<TR><TD '+classeTitulo+' >'+
		'\n'+ this.TITULO +'</TD>';
	}	
	if(close != ""){
		tooltip += '\n<TD '+classeTitulo+' style=\"text-align:right;border-left: 0;\">'+ close +
		'\n</TD>';
	}
	tooltip += '\n<TR><TD style=\"vertical-align:top;\" '+altura+' '+classeConteudo+' '+colspan+' >';
	tooltip += '\n'+this.CONTEUDO+
	'\n</TD></TR>';
	if(confirm != ""){
		tooltip += '\n<TR><TD>'+
		'\n'+confirm+
		'\n</TD></TR>';
	}
	tooltip += '\n</TABLE>';
	//document.execCommand('Copy', tooltip);
	return tooltip;
}

function centralizar(){
	var moveX = 0;
	var moveY = 0;
	var w = this.LARGURA;
	var h = this.ALTURA;

   //Centralizar tooltip
   if(ns)
   {
      moveX = window.screenX + ((window.outerWidth) / 2);
      moveY = window.screenY + ((window.outerHeight) / 2);
   }
   else
   {
      moveX = (screen.availWidth/2);
      moveX = moveX - (w/2); 
      moveY = (screen.availHeight/2);
      moveY = moveY - (h/2); 
   }
   
   if(this.TOPO == 0)
	   this.TOPO      = moveY;
   if(this.ESQUERDA == 0)
	   this.ESQUERDA  = moveX;       
}


function modal(e)
{
   var moveX = 0;
   var moveY = 0;
   //var w = document.all.ToolTip.offsetWidth;
   //var h = document.all.ToolTip.offsetHeight;
   //var t = document.all.ToolTip.style.top;
   
   	var w = this.LARGURA;
	var h = this.ALTURA;
	var t = this.TOPO;
   
   t = (new String(t)).replace("px","");
   var l = document.all.ToolTip.style.left;
   l = (new String(l)).replace("px","");

	 if(window.event == null){
			Ex = this.ESQUERDA;
			Ey = this.TOPO;
	 }
   if (eval(Ex) < l)
   	eval(Ex = l);
   if (eval(Ex) > w)
   	eval(Ex = w);
   if (eval(Ey) < t)
   	eval(Ex = t);
   if (eval(Ey) > h)
   	eval(Ex = h);
}

function ondebug(){
	alert("TITULO: "+this.TITULO+
	"\nCLASSETITULO: "+this.CLASSETITULO+
	"\nCLASSECONTEUDO: "+this.CLASSECONTEUDO+
	"\nCLASSETOOLTIP: "+this.CLASSETOOLTIP+
	"\nONMOVE: "+this.ONMOVE+
	"\nONCLOSE: "+this.ONCLOSE+
	"\nBORDA: "+this.BORDA+
	"\nCONTEUDOCLOSE: "+this.CONTEUDOCLOSE+
	"\nCLASSEONCLOSE: "+this.CLASSEONCLOSE+
	"\nLABELCLOSE: "+this.LABELCLOSE+
	"\nESQUERDA: "+this.ESQUERDA+
	"\nESQUERDA: "+this.TOPO+
	"\nLARGURA: "+this.LARGURA+
	"\nALTURA: "+this.ALTURA);
}


/****************************************************************\
FUNC?ES PARA MENUS DE CONTEXTO
\****************************************************************/
//set this variable to 1 if you wish the URLs of the highlighted menu to be displayed in the status bar
var display_url=0

var ie5=document.all&&document.getElementById
var ns6=document.getElementById&&!document.all
if (ie5||ns6)
var menuobj=document.getElementById("menuImpressaoDiv")

function showMenuImpressao(e){
menuImp = true;
//Find out how close the mouse is to the corner of the window
var rightedge=ie5? document.body.clientWidth-event.clientX : window.innerWidth-e.clientX
var bottomedge=ie5? document.body.clientHeight-event.clientY : window.innerHeight-e.clientY

//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<menuobj.offsetWidth)
//move the horizontal position of the menu to the left by it's width
menuobj.style.left=ie5? document.body.scrollLeft+event.clientX-menuobj.offsetWidth : window.pageXOffset+e.clientX-menuobj.offsetWidth
else
//position the horizontal position of the menu where the mouse was clicked
menuobj.style.left=ie5? document.body.scrollLeft+event.clientX : window.pageXOffset+e.clientX

//same concept with the vertical position
if (bottomedge<menuobj.offsetHeight)
menuobj.style.top=ie5? document.body.scrollTop+event.clientY-menuobj.offsetHeight : window.pageYOffset+e.clientY-menuobj.offsetHeight
else
menuobj.style.top=ie5? document.body.scrollTop+event.clientY : window.pageYOffset+e.clientY

menuobj.style.visibility="visible"
return false
}

function hideMenuImpressao(e){
menuImp = false;
element = "";
menuobj.style.visibility="hidden"
}

function highlightMenuImpressao(e){
var firingobj=ie5? event.srcElement : e.target
if (firingobj.className=="menuitems"||ns6&&firingobj.parentNode.className=="menuitems"){
if (ns6&&firingobj.parentNode.className=="menuitems") firingobj=firingobj.parentNode //up one node
firingobj.style.backgroundColor="highlight"
firingobj.style.color="white"
if (display_url==1)
window.status=event.srcElement.url
}
}

function lowlightMenuImpressao(e){
var firingobj=ie5? event.srcElement : e.target
if (firingobj.className=="menuitems"||ns6&&firingobj.parentNode.className=="menuitems"){
if (ns6&&firingobj.parentNode.className=="menuitems") firingobj=firingobj.parentNode //up one node
firingobj.style.backgroundColor=""
firingobj.style.color="black"
window.status=''
}
}

function jumptoMenuImpressao(e){
var firingobj=ie5? event.srcElement : e.target
if (firingobj.className=="menuitems"||ns6&&firingobj.parentNode.className=="menuitems"){
	if (ns6&&firingobj.parentNode.className=="menuitems") 
		firingobj=firingobj.parentNode
	if (firingobj.getAttribute("funcao"))
		eval(firingobj.getAttribute("funcao"))
	else if (firingobj.getAttribute("target"))
		window.open(firingobj.getAttribute("url"),firingobj.getAttribute("target"))
	else
		window.location=firingobj.getAttribute("url")
}
}

if (ie5||ns6){
menuobj.style.display=''
document.oncontextmenu=gerarMenuImpressao
document.onclick=hideMenuImpressao
//document.onmouseup=gerarMenuImpressao
}

