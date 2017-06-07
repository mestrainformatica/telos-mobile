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

<link rel="stylesheet" href="modernidade/css/dashboard.css">


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

<script src="javascript/hm-syscall-v1.0/hm.syscall.admin.v1.0.js" type="text/javascript"></script>

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
<script type="text/javascript" src="chrome-extension://aadgmnobpdmgmigaicncghmmoeflnamj/ng-inspector.js"></script></head>


<body class="responsive" onload="iniciarPagina();" onkeydown="return executarAcaoFuncoes(event);" bgcolor="#ffffff" text="#000000" link="#023264" alink="#023264" vlink="#023264" topmargin="0" leftmargin="0">

	<!-- inicio das alteracoes responsivo -->


	<!-- fim das alteracoes responsivo -->



	<div class="header-modernidade">
		<div class="logo-div">
			<img class="logo" src="modernidade/img/logo-provisoria.png">
		</div>
		<div class="inner">
			<div class="navbar-left">
				<h1>Módulo Contabilidade</h1>
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

		<div id="main-content" class="container" role="main">
			<?php // include("includes/conteudo.php"); ?>

			<div id="dashboard-content">
				
				<div class="charts-section section">
					<div class="row">
						<div class="col-sm-8">
							
						</div>
						<div class="col-sm-16">
							
						</div>
					</div>
				</div>


				<div class="section atendimento">
					<h3 class="title">Atendimento em aberto a vencer</h3>
					
					<div class="table-responsive">

						<table class="table atendimento-table">
							<thead>
								<tr>
									<td class="col-2">Nome</td>
									<td>Tipo</td>
									<td>Situação</td>
									<td>Prazo</td>
									<td>Urgência</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Alessandra Borges Filho</td>
									<td> <span class="type type-6">6 - ATENDIMENTO ATIVO</span> </td>
									<td> <span class="type type-default">3 - A RESPONDER</span> </td>
									<td><span class="prazo-danger">Atrasado</span></td>
									<td> <div class="custom-progress-bar"><div class="progress" style="width: 90%"></div></div> </td>
								</tr>
							</tbody>
						</table>

					</div>

				</div>

				<div class="section atendimento">
					<h3 class="title">Atendimento em aberto a vencer</h3>
		
					<div class="table-responsive">

						<table class="table atendimento-table">
							<thead>
								<tr>
									<td class="col-1">Nome</td>
									<td class="col-1">Responsável</td>
									<td>Tipo</td>
									<td>Situação</td>
									<td>Prazo</td>
									<td>Urgência</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Alessandra Borges Filho</td>
									<td><b class="underline">Adriano Cardoso Domiciano</b></td>
									<td> <span class="type type-6">6 - ATENDIMENTO ATIVO</span> </td>
									<td> <span class="type type-default">3 - A RESPONDER</span> </td>
									<td><span class="prazo-danger">Atrasado</span></td>
									<td> <div class="custom-progress-bar"><div class="progress" style="width: 90%"></div></div> </td>
								</tr>
							</tbody>
						</table>

					</div>

				</div>
				
				<div class="section">
					<h3 class="title">Pesquisa de satisfação - Junho/17</h3>
				</div>
				
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