<!-- 
	@flag
	= Elementos que não se sabe o que é
-->
<!-- saved from url=(0091)http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,100,300,600,700' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,600,700' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="modernidade/lib/bootstrap/css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="css/PlcGeral.css" type="text/css">
<link rel="stylesheet" href="css/PlcPele.css" type="text/css">
<link rel="stylesheet" href="css/jquery-ui.structure.css" type="text/css">
<link rel="stylesheet" href="css/jquery-ui.theme.css" type="text/css">
<link rel="stylesheet" href="modernidade/css/custom.formulario.css"> 
<link rel="stylesheet" href="modernidade/css/custom.bootstrap.fix.css"> 
<link rel="stylesheet" href="modernidade/lib/jquery-ui/jquery-ui.css"> 
<link rel="stylesheet" href="modernidade/lib/chosen/chosen.min.css"> 


<script src="javascript/loading.js" type="text/javascript"></script>
<script src="javascript/MestraAjax.js" type="text/javascript"></script>
<script src="modernidade/js/jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="modernidade/lib/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
<script src="modernidade/lib/chosen/chosen.jquery.min.js" type="text/javascript"></script>
<script src="javascript/priceformat.js" type="text/javascript"></script>
<script src="javascript/monetary.js" type="text/javascript"></script>
<script src="javascript/numericMask.js" type="text/javascript"></script>
<script src="javascript/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="javascript/DateMask.js" type="text/javascript"></script>
<script src="javascript/jquery.qtip-1.0.0-rc3.min.js" type="text/javascript"></script>
<script src="modernidade/lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="modernidade/lib/emodal/emodal.min.js" type="text/javascript"></script>
<script src="modernidade/js/main.formulario.js" type="text/javascript"></script>



<link rel="stylesheet" href="css/AppGeral.css" type="text/css">

<script src="javascript/PlcGeral.js" type="text/javascript"></script><style type="text/css">.expandeRetraiPlc{display:none;}</style>

<script src="javascript/AppGeral.js" type="text/javascript"></script>





<title>:: Sysprev Web ::

</title>	
<link rel="stylesheet" href="css/PlcPele.css" type="text/css">
<link rel="stylesheet" href="css/loading.css" type="text/css">
<script src="javascript/menuExpandable.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" media="screen" href="css/global.css">  
<link rel="stylesheet" type="text/css" media="screen" href="css/menuExpandable.css"> 

<script>
	function redimensionaMenu(){
		var tabelaMenu = document.getElementById('tabelaMenu');
		var telaWidth = window.innerWidth;
		tabelaMenu.style.width = telaWidth / 4.8;
	}
	
	function menuFlex(estadoMenu){	
		if (estadoMenu == "aberto"){
			setNamedCookie('controleMenuFlex','aberto','');
			document.getElementById('tabelaMenu').style.display = "none";
			document.getElementById('tabelaMenu').style.widthantes = document.getElementById('tabelaMenu').style.width;
			document.getElementById('botao1').style.display = "none";	
			document.getElementById('botao2').style.display = "";
		}else{
			setNamedCookie('controleMenuFlex','fechado','');
			document.getElementById('tabelaMenu').style.display = "";
			document.getElementById('tabelaMenu').style.width = document.getElementById('tabelaMenu').style.widthantes;
			document.getElementById('botao1').style.display = "";	
			document.getElementById('botao2').style.display = "none";
		}
	}


	function setDocumentCookie( oDoc, sName, sValue, sExpDate ){	
				//para evitar erro no FIREFOX
				if ( sValue == undefined){    	
					sValue = "";
				}

				if ( sName.length < 1 )
					return;

				if (  0 < sValue.length ){

					if(sExpDate != ''){	    	
						var expDate = new Date();
						expDate.setTime( expDate.getTime() + 365*24*60*60*1000 );
						oDoc.cookie = ""
						+ sName + "=" + sValue + "; "
						+ "expires=" + expDate.toGMTString();
					}else{
						oDoc.cookie = ""
						+ sName + "=" + sValue + "; ";
					}               
				}else{
			        //  this will cause the named cookie to be deleted.
			        oDoc.cookie = sName + "=";
			      }
			    }
			    function deleteDocumentCookie( oDoc, sName ){
			    	oDoc.cookie = sName + "=";
			    }
			    function fetchDocumentCookie( oDoc, sName ) {
			    	var sValue = ""; 
			    	var index = 0;
			    	if( oDoc.cookie )
			    		index = oDoc.cookie.indexOf( sName + "=" );
			    	else
			    		index = -1;

			    	if ( index < 0 ){
			    		sValue = "";
			    	}
			    	else{
			    		var countbegin = (oDoc.cookie.indexOf( "=", index ) + 1);
			    		if ( 0 < countbegin ) {
			    			var countend = oDoc.cookie.indexOf( ";", countbegin );
			    			if ( countend < 0 )
			    				countend = oDoc.cookie.length;
			    			sValue = oDoc.cookie.substring( countbegin, countend );
			    		}else{
			    			sValue = "";
			    		}
			    	}
			    	return sValue;
			    }

			    function setNamedCookie( sName, sValue, sExpDate ) {
			    	setDocumentCookie( document, sName, sValue, sExpDate );
			    }
			    function fetchNamedCookie( sName ) {
			    	return fetchDocumentCookie( document, sName );
			    }
			    function deleteCookie( sName ) {
			    	deleteDocumentCookie( document, sName );
			    }
</script>
<script type="text/javascript" src="chrome-extension://aadgmnobpdmgmigaicncghmmoeflnamj/ng-inspector.js"></script></head>


<body onload="iniciarPagina();" onkeydown="return executarAcaoFuncoes(event);" bgcolor="#ffffff" text="#000000" link="#023264" alink="#023264" vlink="#023264" topmargin="0" leftmargin="0">

<div class="header-modernidade">
	<div class="logo-div">
		<img class="logo" src="modernidade/img/logo-provisoria.png">
	</div>
	<div class="inner">
		<div class="navbar-left">
			<h1>Módulo Contabilidade</h1>
		</div>
		<div class="navbar-right">
			<p>Conectado como Luiz Cláudio. &nbsp; <a href="#">Desconectar <img src="modernidade/img/off.png"></a></p>
		</div>
	</div>
</div>

<div id="conteudo">
	<div id="left-column" role="complementary">
		<?php include("includes/menu.php"); ?>	
	</div>

	<div id="main-content" class="container" role="main">
		<?php include("includes/conteudo.php"); ?>
	</div>
</div>

<div id="rodape">
	<p>Seja bem-vindo,&nbsp;administrador.</p>
	<p class="right">v1.1.177/P - Copyright Mestra Informática e Tecnologia Ltda. 2010</p>
</div>

	<table id="tabela-antiga" width="100%" border="" bordercolor="#beccdf" style="border-width:0mm;" cellpadding="0" cellspacing="0" height="100%">
		<tbody>

			<tr height="11%" bordercolor="#BECCDF" bgcolor="#879EBD">
				<td colspan="4" bordercolor="#BECCDF" bgcolor="879EBD">


					<!-- asdasd -->
					<!-- @flag -->
					<table onresize="redimencionaTesteira()" id="localTesteiraTable" bgcolor="#beccdf" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="z-index:500;">
						<tbody><tr>
							<!-- <td class="header-modernidade"> -->
							<td>
								 <embed onresize="redimencionaTesteira()" id="localTesteira" border="0" width="100%" height="101%" bgcolor="#beccdf" style="border-color: rgb(135, 158, 189); z-index: 1; height: 71.9186046511628px; background-color: rgb(135, 158, 189);" cellpadding="0" cellspacing="0" fullscreen="no" src="/Mestra_Previdenciario/plc/midia/testeira_previdenciario.swf" wmode="opaque"> <!-- @flag -->

									
								</td>
							</tr>
						</tbody>
					</table>		
					<!-- /@flag -->
					<script>

						function 	Mestra() { 
							Mestra.Cookie = {
								date: new Date(),
								set: function(name, content, days) {
									var expires = "";
									if(days) {
										this.date.setTime(this.date.getTime()+(days*24*60*60*1000));
										expires = this.date.toGMTString() + "; ";
									}
									document.cookie = name + "=" + content + "; " + expires + "path=/";
									return true;
								},

								get: function( name ) {
									var nameE = name + "=";
									var cookies = document.cookie.split(";");
									for(var i = 0, Cookie; Cookie = cookies[i]; i++) {
										while(Cookie.charAt(0) == " ") {
											Cookie = Cookie.substring(1,Cookie.length);
										}
										if(Cookie.indexOf(nameE) == 0) {
											return Cookie.substring(nameE.length,Cookie.length);
										}
									}
									return false;
								},

								unset: function( name ) {
									this.set(name, "", -1);
									return true;
								}
							}
						}

						new Mestra();
						redimencionaTesteira();

						function redimencionaTesteira(){

							var obj = document.getElementById("localTesteira");
							var objTable = document.getElementById("localTesteiraTable");

							if(!Mestra.Cookie.get('alturaTesteira')){

								if(obj) {
									var telaHeight = 0;
									var telaWidth = 0;
									if (window.addEventListener) {
										telaHeight = window.innerHeight; 
										telaWidth = window.innerWidth; 
										obj.style.height = telaWidth / 17.2;
										Mestra.Cookie.set('alturaTesteira',obj.style.height, 1);
									} else { 
										telaHeight = document.body.offsetHeight; 
										telaWidth = document.body.offsetWidth; 
										objTable.style.height = telaWidth / 17;
									}
								}
							}else{
								if (window.addEventListener) {
									obj.style.height = Mestra.Cookie.get('alturaTesteira');
								} else { 
									objTable.style.height = Mestra.Cookie.get('alturaTesteira');
								}
							}

						}

						if (window.addEventListener) {
							window.addEventListener("load", redimencionaTesteira, false);
							window.addEventListener("resize", redimencionaTesteira, false);
						} else {
							window.attachEvent("onload", redimencionaTesteira);
							window.attachEvent("onresize", redimencionaTesteira);
						}
					</script>
				</td>
			</tr>

			<tr>



				<td width="100%" align="left" id="layout_col_principal" valign="top">
					<table width="99%" align="right"><tbody><tr><td>














						</td></tr></tbody>
					</table>
				</td>
			</tr>

			<tr height="1%">
				<td colspan="4">







			<script>
				regBotaoEvento('Desconectar','DESCONECTAR');
				regEvento('Desconectar','MENSAGEM','');
				regMensagem('Desconectar','CONFIRMACAO','Tem certeza que deseja desconectar?');
			</script>
		</td>
	</tr>

</tbody>
</table>
<!-- INICIO ANIMACAO LOADING //Felipe Reis -->

<div id="carregador_geral" style="display: none; visibility: hidden;"></div>
<div id="carregador_pai" style="display: none; visibility: hidden;">
	<div id="carregador">
		<div id="titulo_loading" align="center">Aguarde carregando ...</div>
		<div id="carregador_fundo"><div id="barra_progresso"> </div></div>
	</div>
</div>
<script>
	iniciaEventos(document.forms[0]);
</script>

<!-- FIM ANIMACAO LOADING //Felipe Reis -->


</body></html>