<!-- 
	@flag
	= Elementos que não se sabe o que é
-->
<!-- saved from url=(0091)http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1" />

<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,100,300,600,700' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Lato:400,100,300,600,700' rel='stylesheet' type='text/css'>

<link rel="stylesheet" href="modernidade/lib/bootstrap/css/bootstrap.min.css" type="text/css">
<!-- <link rel="stylesheet" href="css/PlcGeral.css" type="text/css">
<link rel="stylesheet" href="css/PlcPele.css" type="text/css"> -->
<link rel="stylesheet" href="css/jquery-ui.structure.css" type="text/css">
<link rel="stylesheet" href="css/jquery-ui.theme.css" type="text/css">
<link rel="stylesheet" href="modernidade/css/custom.formulario.css"> 
<link rel="stylesheet" href="modernidade/css/custom.bootstrap.fix.css"> 
<link rel="stylesheet" href="modernidade/lib/jquery-ui/jquery-ui.css"> 
<link rel="stylesheet" href="modernidade/lib/chosen/chosen.min.css"> 
<link rel="stylesheet" href="fonts/font.iconmoon.css">
<link rel="stylesheet" type="text/css" href="javascript/bootstrap-sweetalert/lib/sweet-alert.css">
<link rel="stylesheet" type="text/css" href="modernidade/lib/tooltipster/css/tooltipster.css">
<link rel="stylesheet" type="text/css" href="modernidade/lib/tooltipster/css/themes/tooltipster-light.css">

<link rel="stylesheet" href="modernidade/css/custom.responsive.css">

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
<script src="javascript/bootstrap-sweetalert/lib/sweet-alert.min.js"></script> 
<script src="modernidade/lib/tooltipster/js/jquery.tooltipster.min.js"></script> 
<script src="modernidade/js/main.formulario.js" type="text/javascript"></script>

<!--<script src="javascript/hm-syscall-v1.0/hm.syscall.v1.0.js" type="text/javascript"></script>-->
<script src="javascript/hm-chatbot-v1.1/hm.chatbot.v1.1.js" type="text/javascript"></script>

<link href="./bower_components/bootstrap-toggle/css/bootstrap-toggle.min.css" rel="stylesheet">
<script src="./bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js"></script>


<link rel="stylesheet" href="css/AppGeral.css" type="text/css">

<script src="javascript/PlcGeral.js" type="text/javascript"></script><style type="text/css">.expandeRetraiPlc{display:none;}</style>

<script src="javascript/AppGeral.js" type="text/javascript"></script>


<title>:: Sysprev Web ::

</title>	
<!-- <link rel="stylesheet" href="css/PlcPele.css" type="text/css"> -->
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
<script type="text/javascript" src="chrome-extension://aadgmnobpdmgmigaicncghmmoeflnamj/ng-inspector.js"></script>
<style>
	a.title i.icon-online{
		float: left;
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #00b6ed;
		margin: 4px 10px 0 0;
	}

	.footer-hide {
		min-height: 1200px;
	}
</style>
</head>


<body class="responsive" onload="iniciarPagina();" onkeydown="return executarAcaoFuncoes(event);" bgcolor="#ffffff" text="#000000" link="#023264" alink="#023264" vlink="#023264" topmargin="0" leftmargin="0">

	<!-- inicio das alteracoes responsivo -->


	<!-- fim das alteracoes responsivo -->



	<div class="header-modernidade">
		<div class="logo-div">
			<img class="logo" src="modernidade/img/logo-provisoria.png">
		</div>
		<div class="inner">
			<div class="navbar-left">
				<h1>Chatbot</h1>
			</div>
			<div class="navbar-right">
				<p><span class="txt">Conectado como </span> Luiz Cláudio &nbsp;  <a href="#"><span class="txt">Desconectar</span> <img src="modernidade/img/off.png"></a></p>
			</div>
		</div>
	</div>

	<div id="conteudo">
		<div id="left-column" role="complementary">
			<?php include("includes/menu.php"); ?>	
		</div>

		<div id="main-content" class="container footer-hide" role="main">
			<h3>Chatbot > preferências</h3>

			<div class="row">
				<div class="row">
					
					<div class="form-group col-md-6">
						<label for="">Avatar do atendente virtual</label>
						<img style="width:80px; border:1px solid #ccc" src="./javascript/hm-chatbot-v1.1/img/chatbot-user.png" alt="">
					</div>

					<div class="form-group col-md-6">
						
						<input style="margin-top:80px" type="file" class="form-control" value="/img/67.jpg">
					</div>
					
				</div>
				

				<div class="col-xl-12">
					<div class="form-group col-xl-12">
						<label for="">Nome do atendente virtual</label>
						<input type="text" class="form-control" value="Joana">
					</div>
				</div>

				<div class="col-xl-12">
					<div class="form-group col-xl-12">
						<label for="">Mensagem de boas vindas</label>
						<textarea class="form-control" rows="4" cols="">Oi, meu nome &eacute; Joana sou uma atendente virtual! Minha especialidade &eacute; ajudar e tirar d&uacute;vidas de participantes da Funda&ccedil;&atilde;o Mestra.</textarea>
					</div>
				</div>

				<div class="col-xl-12">
					<div class="form-group col-xl-12">
						<label for="">Mensagem padrão</label>
						<textarea class="form-control" rows="4" cols="">Não tenho uma resposta programada esta pergunta.</textarea>
					</div>
				</div>

				<div class="col-xl-12">
					<div class="form-group col-xl-12">
						<label for="">Texto de introdução às opções de atendimento</label>
						<textarea class="form-control" rows="4" cols="">[nome], sobre o que deseja saber? selecione a op&ccedil;&atilde;o desejada:</textarea>
					</div>
				</div>

				<div class="col-xl-12">
					<table class="table table-striped" border="0" cellspacing="0" cellpadding="0" width="100%" style="">
						<thead>
						
						</thead>
						<tbody>
						<tr>
							<td>Atualização cadastral</td>
							<td><div class="pull-right"><input type="checkbox" data-toggle="toggle"  data-size="mini" data-width="50" ></div></td>
						</tr>
						
						<tr>
							<td>Calendário de Empréstimos</td>
							<td><div class="pull-right"><input type="checkbox" data-toggle="toggle"  data-size="mini" data-width="50" ></div></td>
						</tr>
						
						<tr>
							<td>Simulação de Empréstimos</td>
							<td><div class="pull-right"><input type="checkbox" checked data-toggle="toggle"  data-size="mini" data-width="50" ></div></td>
						</tr>
						
						<tr>
							<td>Simulação de Benefício</td>
							<td><div class="pull-right"><input type="checkbox" data-toggle="toggle"  data-size="mini" data-width="50" ></div></td>
						</tr>
						
						<tr>
							<td>Alteração de Contribuições</td>
							<td><div class="pull-right"><input type="checkbox" data-toggle="toggle"  data-size="mini" data-width="50" ></div></td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<a class="title pull-left" ><button class="test-chat btn btn-large btn-primary">
					<i class="icon-online"></i> Testar Chatbot
				</button></a>

				<button style="background-color: #204d74;" class="btn btn-large btn-primary pull-right">
					Salvar
				</button>
			</div>
		</div>
		<div class="clear-fix"></div>
	</div>

	<div id="rodape">
		<p>Seja bem-vindo,&nbsp;administrador.</p>
		<p class="right">v1.1.177/P - Copyright Mestra Informática e Tecnologia Ltda. 2010</p>
	</div>

	<div id="tabela-antiga">
		<?php include("includes/tabela-antiga.php"); ?>
	</div>


	
</body>
</html>