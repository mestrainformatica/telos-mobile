
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
	
		<table width="100%" border="0" bordercolor="#beccdf" style="border-width:0mm" cellpadding="0" cellspacing="0" height="100%">
		<tbody>
		
			<tr height="11%" bordercolor="#BECCDF" bgcolor="#879EBD">
		  		<td colspan="4" bordercolor="#BECCDF" bgcolor="879EBD">
		  			
		  				
		  			










<!-- asdasd -->

		<table onresize="redimencionaTesteira()" id="localTesteiraTable" bgcolor="#beccdf" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="z-index:500;">
			<tbody><tr>
				<td class="header-modernidade">
					<embed onresize="redimencionaTesteira()" id="localTesteira" border="0" width="100%" height="101%" bgcolor="#beccdf" style="border-color: rgb(135, 158, 189); z-index: 1; height: 71.9186046511628px; background-color: rgb(135, 158, 189);" cellpadding="0" cellspacing="0" fullscreen="no" src="/Mestra_Previdenciario/plc/midia/testeira_previdenciario.swf" wmode="opaque">
                    
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
				</td>
			</tr>
		</tbody></table>		

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
		
		
	<!-- INICIO MENU -->
	<td id="tabelaMenu" valign="top" class="layout_col_menu" style="padding-left:5px;background-image:url(&#39;/Mestra_Previdenciario/midia/fundoDegradeMenu.jpg&#39;);background-repeat:repeat-x" bgcolor="#e4ecf7">

									

		<div id="menuDiv"><ul id="menuList">
                <li class="menu-title">Menu</li>
			            
			
				
					       	      
					<li class="menubar" style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/minus.gif);">

	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00000Actuator" class="actuator">Cadastro</a>
		<ul id="M00000Menu" class="menu" style="display: block;">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00001Actuator" class="actuator">Tabelas</a>
		<ul id="M00001Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fundospensaoman.do?evento=x&idRotina=719" title="Entidades de Previdência">Entidades de Previdência</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/patrocinadorman.do?evento=x&idRotina=720" title="Patrocinadores">Patrocinadores</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cargoman.do?evento=x&idRotina=721" title="Cargos">Cargos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lotacaoman.do?evento=x&idRotina=722" title="Lotações">Lotações</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/situacaopatrocinadorman.do?evento=x&idRotina=723" title="Situações no Patrocinador">Situações no Patrocinador</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/planosman.do?evento=x&idRotina=724" title="Planos">Planos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/tipoinscricaoman.do?evento=x&idRotina=725" title="Tipos de Inscrição">Tipos de Inscrição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/situacaoplanoman.do?evento=x&idRotina=726" title="Situações no Plano">Situações no Plano</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosituacaoplanoman.do?evento=x&idRotina=727" title="Parâmetros da Situação no Plano">Parâmetros da Situação no Plano</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/motivodesligamentoman.do?evento=x&idRotina=728" title="Motivos de Desligamento">Motivos de Desligamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/motivosuspensaoman.do?evento=x&idRotina=729" title="Motivos de Suspensão">Motivos de Suspensão</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/minus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00002Actuator" class="actuator">Cadastro</a>
		<ul id="M00002Menu" class="submenu" style="display: block;">

	<li><a href="./__ Sysprev Web ___files/__ Sysprev Web __.html" title="Funcionários" class=" highlight">Funcionários</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/dependentesman.do?evento=x&idRotina=732" title="Dependentes">Dependentes</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/importacaoarquivoman.do?evento=x&idRotina=3910" title="Atualização via Arquivo">Atualização via Arquivo</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00003Actuator" class="actuator">Recadastramento</a>
		<ul id="M00003Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/gerarformulariorecadastramentoman.do?evento=x&idrotina=3218" title="Gerar Formulário">Gerar Formulário</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaocodigoassistidosman.do?evento=x&idRotina=3054" title="Gerar Código de Identificação">Gerar Código de Identificação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/validarecadastramentoman.do?evento=x&idrotina=3059" title="Validar Recadastramento">Validar Recadastramento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relrecadastramentoman.do?evento=x&idRotina=3057" title="Relatório de Recadastramento">Relatório de Recadastramento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/gerarrecadastramento.do?evento=x&idrotina=3223" title="Manutenção Recadastramento">Manutenção Recadastramento</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00004Actuator" class="actuator">Históricos</a>
		<ul id="M00004Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/temposervicoman.do?evento=x&idRotina=740" title="Tempo de Serviço">Tempo de Serviço</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/situacaonoplanoman.do?evento=x&idRotina=741" title="Situação no Plano">Situação no Plano</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/situacaonopatrocinadorman.do?evento=x&idRotina=742" title="Situação no Patrocinador">Situação no Patrocinador</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fatorjoiaman.do?evento=x&idRotina=3153" title="Fator de Jóia">Fator de Jóia</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00005Actuator" class="actuator">Manutenção</a>
		<ul id="M00005Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/adesaoman.do?evento=x&idRotina=734" title="Adesão">Adesão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cadastramentopessoaloteman.do?evento=x&idRotina=3948" title="Adesão Plano em Massa">Adesão Plano em Massa</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/autopatrocinioman.do?evento=x&idRotina=735" title="Autopatrocínio">Autopatrocínio</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/controleparticipanteman.do?evento=x&idRotina=738" title="BPD">BPD</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/desligamentoman.do?evento=x&idRotina=736" title="Desligamento">Desligamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/suspensaoman.do?evento=x&idRotina=737" title="Suspensão">Suspensão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Controle de Escolaridade">Controle de Escolaridade</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/opcaoirman.do?evento=x&idRotina=3118" title="???pt_BR.def.menu.opcao.tributacao.aux???">???pt_BR.def.menu.opcao.tributacao.aux???</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00006Actuator" class="actuator">Relatórios</a>
		<ul id="M00006Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reladesoesman.do?evento=x&idRotina=3911" title="Adesões">Adesões</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reltransferenciamassaman.do?evento=x&idRotina=3949" title="Transferências em Massa">Transferências em Massa</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relaniversariantesperiodoman.do?evento=x&idRotina=3222" title="Aniversariantes no Período">Aniversariantes no Período</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/aposentadoriasprevistasman.do?evento=x&idRotina=744" title="Aposentadorias Previstas">Aposentadorias Previstas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/certificadoadesao.do?evento=x&idRotina=3272" title="Certificado de Adesão">Certificado de Adesão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/extratodesligamentoman.do?evento=x&idRotina=745" title="Extrato de Desligamento">Extrato de Desligamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatorioopcaoirman.do?evento=x&idRotina=3919" title="Opção de Tributação">Opção de Tributação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relparticipanteporsituacaoman.do?evento=x&idRotina=798" title="Participantes por Situação">Participantes por Situação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriogerencialman.do?evento=x&idRotina=3229" title="Relatório Gerencial">Relatório Gerencial</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriosipcap2man.do?evento=x&idRotina=749" title="SICADI">SICADI</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relfichainscricaoman.do?evento=x&idRotina=3978" title="???pt_BR.def.relatorio.ficha.inscricao???">???pt_BR.def.relatorio.ficha.inscricao???</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relopcaotributacaoman.do?evento=x&idRotina=3979" title="???pt_BR.def.menu.opcao.tributacao.aux???">???pt_BR.def.menu.opcao.tributacao.aux???</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/criticadependentesman.do?evento=x&idRotina=3984" title="???pt_BR.def.critica.dependentes???">???pt_BR.def.critica.dependentes???</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relralacaoafastadosdesligadosadmitidosman.do?evento=x&idRotina=3985" title="???pt_BR.def.menu.relacao.afastados.desligados.admitidos???">???pt_BR.def.menu.relacao.afastados.desligados.admitidos???</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00007Actuator" class="actuator">Arquivos</a>
		<ul id="M00007Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geraarquivoatuarialman.do?evento=x&idRotina=747" title="Atuária">Atuária</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaoarquivoadesaoman.do?evento=x&idRotina=3920" title="Patrocinador">Patrocinador</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaoarquivodprevman.do?evento=x&idRotina=3256" title="DPREV">DPREV</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relgeracaoetiquetasman.do?evento=x&idRotina=3986" title="Geração de Etiquetas">Geração de Etiquetas</a></li>
		</ul>
	</li>

</ul>
	</li>


			
				
					       	      
					<li class="menubar" style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">

	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00008Actuator" class="actuator">Arrecadação</a>
		<ul id="M00008Menu" class="menu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00009Actuator" class="actuator">Tabelas</a>
		<ul id="M00009Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/contasman.do?evento=x&idRotina=752" title="Contas de Contribuição">Contas de Contribuição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/ctbparametroscontaman.do?evento=x&idRotina=753" title="Parâmetros de Contas">Parâmetros de Contas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/inscricaocontroleman.do?evento=x&idRotina=754" title="Inscrições de Controle">Inscrições de Controle</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/ctbindiceprevidenciarioman.do?evento=x&idRotina=755" title="Índices Previdenciários">Índices Previdenciários</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fatorconversaoman.do?evento=x&idRotina=756" title="Fatores de Conversão">Fatores de Conversão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/faixacontribuicaoman.do?evento=x&idRotina=757" title="Faixas de Contribuição">Faixas de Contribuição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/rubricaman.do?evento=x&idRotina=761" title="Rubricas">Rubricas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/ctbeventosrubricasman.do?evento=x&idRotina=762" title="Eventos x Rubricas">Eventos x Rubricas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametroapropriacaoman.do?evento=x&idRotina=763" title="Parâmetros de Apropriação">Parâmetros de Apropriação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrocontribuicaopatrocinadorman.do?evento=x&idRotina=758" title="Parâmetros Contribuição Patrocinador">Parâmetros Contribuição Patrocinador</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrocontribuicaoparticipanteman.do?evento=x&idRotina=759" title="Parâmetros Contribuição Participante">Parâmetros Contribuição Participante</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosgeraiscontribuicaoman.do?evento=x&idRotina=760" title="Parâmetros de Arrecadação">Parâmetros de Arrecadação</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00010Actuator" class="actuator">Manutenção</a>
		<ul id="M00010Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/transferenciamassaman.do?evento=x&idRotina=3947" title="Transferência em Massa">Transferência em Massa</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lancamentomanualdifdevolucaoman.do?evento=x&idRotina=3221" title="Débitos e Diferenças de Contribuição">Débitos e Diferenças de Contribuição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/percentualcontribuicaoman.do?evento=x&idRotina=3876" title="Percentual de Contribuição">Percentual de Contribuição</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00011Actuator" class="actuator">Perfil de Investimento</a>
		<ul id="M00011Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/alteracaoperfilinvestimentoman.do?evento=x&idRotina=3878" title="Calendário de Alteração">Calendário de Alteração</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/perfilinvestimentocadastramentoman.do?evento=x&idRotina=3879" title="Opção">Opção</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/perfilinvestimentoefetivacaoman.do?evento=x&idRotina=3880" title="Efetivação">Efetivação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaoopcaoperiodoman.do?evento=x&idRotina=3881" title="Relação de Opções por Período">Relação de Opções por Período</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relalteracoesperfilman.do?evento=x&idRotina=3882" title="Relatório Alterações de Perfil">Relatório Alterações de Perfil</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/programacaocontribuicaoman.do?evento=x&idRotina=765" title="Programação de Contribuição">Programação de Contribuição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/calculojoiaman.do?evento=x&idRotina=772" title="Pagamento de Joia">Pagamento de Joia</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00012Actuator" class="actuator">Reajuste Salários Autopatrocinados</a>
		<ul id="M00012Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reajustesalariosautopatrocinadosman.do?evento=x&idRotina=3189" title="Percentuais de Reajuste">Percentuais de Reajuste</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/aplicareajusteman.do?evento=x&idRotina=768" title="Aplica Reajuste">Aplica Reajuste</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaosalariosreajustadosman.do?evento=x&idRotina=770" title="Relação dos Salários Reajustados">Relação dos Salários Reajustados</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmareajusteman.do?evento=x&idRotina=3190" title="Confirma Reajuste">Confirma Reajuste</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00013Actuator" class="actuator">Cobrança</a>
		<ul id="M00013Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/calendariovencimentoman.do?evento=x&idRotina=774" title="Calendário de Vencimentos">Calendário de Vencimentos</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00014Actuator" class="actuator">Autopatrocinados</a>
		<ul id="M00014Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cobrancaautopatvinculadosman.do?evento=x&idRotina=775" title="Automática">Automática</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cobrancaavulsaman.do?evento=x&idRotina=2971" title="Avulsa">Avulsa</a></li>
		</ul>
	</li>


	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaosiapeman.do?evento=x&idRotina=2965" title="Cobrança em Consignação">Cobrança em Consignação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/demonstrativocobrancaman.do?evento=x&idRotina=794" title="Demonstrativo de Cobranças">Demonstrativo de Cobranças</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00015Actuator" class="actuator">Recebimento</a>
		<ul id="M00015Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00016Actuator" class="actuator">Folha Patrocinador</a>
		<ul id="M00016Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/importacaoarquivodescontopatrocinadorman.do?evento=x&idRotina=778" title="Importação">Importação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/criticaman.do?evento=x&idRotina=779" title="Crítica">Crítica</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/espelhocriticasman.do?evento=x&idRotina=780" title="Espelho de Criticas">Espelho de Criticas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/liberacaoapropriacaoman.do?evento=x&idRotina=781" title="Liberação para Apropriação">Liberação para Apropriação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/movimentacaoativoman.do?evento=x&idRotina=787" title="Apropriação">Apropriação</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00017Actuator" class="actuator">Autopatrocinados</a>
		<ul id="M00017Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/baixamanualautopatrocinadosman.do?evento=x&idRotina=784" title="Baixa Manual">Baixa Manual</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/baixaautomaticaman.do?evento=x&idRotina=783" title="Baixa Automática">Baixa Automática</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/autopatrocinadoman.do?evento=x&idRotina=788" title="Apropriação">Apropriação</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00018Actuator" class="actuator">Cobrança em Consignação</a>
		<ul id="M00018Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/importacaosiapeman.do?evento=x&idRotina=3914" title="Importação">Importação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Crítica">Crítica</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Espelho de Criticas">Espelho de Criticas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Baixa Automática">Baixa Automática</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Apropriação">Apropriação</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lancamentomanualman.do?evento=x&idRotina=785" title="Lançamento Manual">Lançamento Manual</a></li>
		</ul>
	</li>


<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00019Actuator" class="actuator">Consultas</a>
		<ul id="M00019Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/saldoconta.do?evento=x&idRotina=819" title="Saldo de Contas">Saldo de Contas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/movimentoativo.do?evento=x&idRotina=820" title="Movimento de Contas">Movimento de Contas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reldebitosdiferencascontribuicaoman.do?evento=x&idRotina=3220" title="Débitos e Diferenças de Contribuição ">Débitos e Diferenças de Contribuição </a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00020Actuator" class="actuator">Resgates de Saldo</a>
		<ul id="M00020Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/calendariopagamentoman.do?evento=x&idRotina=801" title="Calendário de Pagamento">Calendário de Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/tiposdedescontosman.do?evento=x&idRotina=802" title="Tipos de Descontos">Tipos de Descontos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosgeraisresgateman.do?evento=x&idRotina=804" title="Parâmetros Gerais">Parâmetros Gerais</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/percentuaisresgatetipodesligman.do?evento=x&idRotina=2970" title="Percentuais de Resgate">Percentuais de Resgate</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/requerimentoresgateman.do?evento=x&idRotina=805" title="Requerimento">Requerimento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/simulacaoresgateman.do?evento=x&idRotina=3535" title="Simulação">Simulação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmacaoresgateman.do?evento=x&idRotina=806" title="Confirmação">Confirmação</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00021Actuator" class="actuator">Relatórios</a>
		<ul id="M00021Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/extratorestituicaocontribman.do?evento=x&idRotina=814" title="Extrato de Restituição">Extrato de Restituição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relfolhapagamentoreservasman.do?evento=x&idRotina=815" title="Folha de Pagamento">Folha de Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/informerendimentosman.do?evento=x&idRotina=817" title="Informe de Rendimentos">Informe de Rendimentos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relsolicitacaoresgateman.do?evento=x&idRotina=4038" title="???pt_BR.def.solicitacao.resgate???">???pt_BR.def.solicitacao.resgate???</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00022Actuator" class="actuator">Portabilidade</a>
		<ul id="M00022Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/entidadeorigemman.do?evento=x&idRotina=808" title="Entidades (Empresas)">Entidades (Empresas)</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/entradarecursosman.do?evento=x&idRotina=810" title="Entrada de Recursos">Entrada de Recursos</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00023Actuator" class="actuator">Saída de Recursos</a>
		<ul id="M00023Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosportabilidademan.do?evento=x&idRotina=809" title="Parâmetros de Portabilidade">Parâmetros de Portabilidade</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/saidarecursosrequerimentoman.do?evento=x&idRotina=811" title="Requerimento">Requerimento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/saidarecursosconfirmacaoman.do?evento=x&idRotina=812" title="Confirmação">Confirmação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/termoportabilidademan.do?evento=x&idRotina=816" title="Termo de Portabilidade">Termo de Portabilidade</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cargaportabilidademan.do?evento=x&idRotina=3946" title="Carga de Portabilidade">Carga de Portabilidade</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relcargaportabilidademan.do?evento=x&idRotina=3950" title="Relatório Carga de Portabilidade">Relatório Carga de Portabilidade</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00024Actuator" class="actuator">Consolidação de Contribuições</a>
		<ul id="M00024Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fechamentoapropriacaomesman.do?evento=x&idRotina=2968" title="Ativos">Ativos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fechamentoapropriacaomesautopatrocinadoman.do?evento=x&idRotina=2969" title="Autopatrocinados">Autopatrocinados</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00025Actuator" class="actuator">Integração</a>
		<ul id="M00025Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00026Actuator" class="actuator">Financeiro</a>
		<ul id="M00026Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00027Actuator" class="actuator">Parâmetros</a>
		<ul id="M00027Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parameventofinanceiroresgateorigemman.do?evento=x&idRotina=3215" title="Eventos Resgate">Eventos Resgate</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parameventofinanceirorubricacontribuicaoman.do?evento=x&idRotina=3199" title="Eventos de Contribuição">Eventos de Contribuição</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaocontaspagarresgateman.do?evento=x&idRotina=3214" title="Pagamento">Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaocontasreceberman.do?evento=x&idRotina=3196" title="Recebimento">Recebimento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cobrancareceberman.do?evento=x&idRotina=2945" title="Cobranças a Receber">Cobranças a Receber</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/dirfarrecadacaoman.do?evento=x&idRotina=3087" title="DIRF">DIRF</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00028Actuator" class="actuator">Contabilidade</a>
		<ul id="M00028Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00029Actuator" class="actuator">Parâmetros</a>
		<ul id="M00029Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaocontabilman.do?evento=x&idRotina=2948" title="Contribuição">Contribuição</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaocontabilresgateman.do?evento=x&idRotina=3198" title="Resgate">Resgate</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaointegracaocontabilman.do?evento=x&idRotina=2949" title="Lançamentos">Lançamentos</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00030Actuator" class="actuator">Mapa Contábil</a>
		<ul id="M00030Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/mapacontabildetalhadoman.do?evento=x&idRotina=3200" title="Processamento">Processamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relmapacontabildetalhadoman.do?evento=x&idRotina=3201" title="Emissão">Emissão</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reservaspagarportabilidadesaidaman.do?evento=x&idRotina=3923" title="Reservas à Pagar">Reservas à Pagar</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00031Actuator" class="actuator">Relatórios</a>
		<ul id="M00031Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/declaracaocontribuicoesman.do?evento=x&idRotina=790" title="Declaração de Contribuições">Declaração de Contribuições</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/extratoindividualman.do?evento=x&idRotina=795" title="Extrato Individual">Extrato Individual</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fichafinanceiraman.do?evento=x&idRotina=797" title="Ficha Financeira">Ficha Financeira</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relParticipantesInadimplentesman.do?evento=x&idRotina=822" title="Participantes Inadimplentes">Participantes Inadimplentes</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/salarioscontribman.do?evento=x&idRotina=796" title="Histórico de Remunerações">Histórico de Remunerações</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/demonstrativodetalhadoarrecadacoesman.do?evento=x&idRotina=792" title="Demonstrativo Detalhado Arrecadaçções">Demonstrativo Detalhado Arrecadaçções</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/demonstrativoresumoarrecadacoesman.do?evento=x&idRotina=791" title="Demonstrativo Resumido Arrecadaçções">Demonstrativo Resumido Arrecadaçções</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reldemonstrativoapropriacoesman.do?evento=x&idRotina=793" title="Demonstrativo de Apropriações">Demonstrativo de Apropriações</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relsaldocontasman.do?evento=x&idRotina=799" title="Saldo de Contas">Saldo de Contas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/historicoprazodeacumulacaoman.do?evento=x&idRotina=3957" title="Prazo Acumulação">Prazo Acumulação</a></li>
		</ul>
	</li>


</ul>
	</li>


			
				
					       	      
					<li class="menubar" style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">

	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00032Actuator" class="actuator">Benefícios</a>
		<ul id="M00032Menu" class="menu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00033Actuator" class="actuator">Tabelas</a>
		<ul id="M00033Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfbeneficioplanoman.do?evento=x&idRotina=2172" title="Benefícios por Plano">Benefícios por Plano</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfrubricaman.do?evento=x&idRotina=2173" title="Rubricas de Pagamento">Rubricas de Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfdadoscadastraisman.do?evento=x&idRotina=2174" title="Consignatários">Consignatários</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfperfilparticipanteman.do?evento=x&idRotina=2175" title="Perfil do Participante">Perfil do Participante</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfcarenciasbeneficiosman.do?evento=x&idRotina=2176" title="Carências de Benefícios">Carências de Benefícios</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00034Actuator" class="actuator">Parâmetros de Cálculo</a>
		<ul id="M00034Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfparametroscalculosinsssrbman.do?evento=x&idRotina=2178" title="Cálculo SRB">Cálculo SRB</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfparametroscalculosman.do?evento=x&idRotina=2179" title="Cálculo de Benefício">Cálculo de Benefício</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/abonoaposentadoriaman.do?evento=x&idRotina=2180" title="Cálculo Abono Aposentadoria">Cálculo Abono Aposentadoria</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfpagcalcbeneficioman.do?evento=x&idRotina=2181" title="Cálculo Desconto Consignatário">Cálculo Desconto Consignatário</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/hierarquiadescontosfundacaoman.do?evento=x&idRotina=2182" title="Prioridade de Descontos - Folha de Pagamento">Prioridade de Descontos - Folha de Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosmovimentacaosaldoman.do?evento=x&idRotina=3538" title="Regras de Movimentação de Saldo">Regras de Movimentação de Saldo</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00035Actuator" class="actuator">Benefícios</a>
		<ul id="M00035Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cartaconcessaoinssman.do?evento=x&idRotina=2184" title="Carta de Concessão INSS">Carta de Concessão INSS</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfrequerimento.do?evento=x&idRotina=2185" title="Requerimento">Requerimento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfconcessao.do?evento=x&idRotina=2186" title="Concessão">Concessão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmaconcessao.do?evento=x&idRotina=2187" title="Confirmação/Exclusão Concessão">Confirmação/Exclusão Concessão</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/memoriacalculoman.do?evento=x&idRotina=2188" title="Relatório Memória de Cálculo">Relatório Memória de Cálculo</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/encerradoman.do?evento=x&idRotina=2189" title="Relatório Benefícios Concedidos / Encerrados">Relatório Benefícios Concedidos / Encerrados</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00036Actuator" class="actuator">Manutenção</a>
		<ul id="M00036Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/adesaoconsignataria.do?evento=x&idRotina=2983" title="Adesão à Consignatária">Adesão à Consignatária</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00037Actuator" class="actuator">Controle de Recebedores</a>
		<ul id="M00037Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/situacaopagamentoman.do?evento=x&idRotina=2192" title="Situação de Pagamento">Situação de Pagamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/pensaojudicialman.do?evento=x&idRotina=2193" title="Pensão Judicial">Pensão Judicial</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/alteracaobeneficiariosman.do?evento=x&idRotina=2194" title="Alteração do Beneficiário">Alteração do Beneficiário</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lancamentofinanceiromanual.do?evento=x&idRotina=2196" title="Lançamento Manual de Rubricas">Lançamento Manual de Rubricas</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00038Actuator" class="actuator">Lançamentos Consignatários</a>
		<ul id="M00038Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/importacaoarquivoconsignatariaman.do?evento=x&idRotina=2197" title="Importação">Importação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/arquivoretornolancamentosconsignatariosman.do?evento=x&idRotina=3089" title="Arquivo de Retorno">Arquivo de Retorno</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00039Actuator" class="actuator">Alteração Percentual de Saque</a>
		<ul id="M00039Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/alteracaopercentualsaqueprogman.do?evento=x&idRotina=3924" title="Calendário de Alteração">Calendário de Alteração</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/alteracaosaqueprogramadocadman.do?evento=x&idRotina=3925" title="Cadastramento">Cadastramento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/saqueprogramadoefetivacaoman.do?evento=x&idRotina=3927" title="Efetivação">Efetivação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaoopcoesperiodoman.do?evento=x&idRotina=3928" title="Opções">Opções</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00040Actuator" class="actuator">Alteração Prazo de Recebimento</a>
		<ul id="M00040Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/alteracaoprazorecebimentoman.do?evento=x&idRotina=3929" title="Calendário de Alteração">Calendário de Alteração</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" title="Cadastramento">Cadastramento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/efetivacaoman.do?evento=x&idRotina=3932" title="Efetivação">Efetivação</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaoopcoesperiodoprazorecebimentoman.do?evento=x&idRotina=3930" title="Opções">Opções</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/decisoesjudiciariasman.do?evento=x&idRotina=3953" title="Decisões Judiciais">Decisões Judiciais</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00041Actuator" class="actuator">Reajuste</a>
		<ul id="M00041Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/percentuaisreajusteman.do?evento=x&idRotina=2199" title="Percentuais de Reajuste">Percentuais de Reajuste</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/calculareajusteman.do?evento=x&idRotina=2200" title="Calcula Reajuste">Calcula Reajuste</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmacaoreajusteman.do?evento=x&idRotina=2201" title="Confirma Reajuste">Confirma Reajuste</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relespelhoreajusteman.do?evento=x&idRotina=2202" title="Relação de Benefícios Reajustados">Relação de Benefícios Reajustados</a></li>
		</ul>
	</li>


<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00042Actuator" class="actuator">Recálculo</a>
		<ul id="M00042Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/recalculobeneficioman.do?evento=x&idRotina=2204" title="Recalcula Benefício">Recalcula Benefício</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmacaorecalculoman.do?evento=x&idRotina=2205" title="Confirma Recálculo">Confirma Recálculo</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00043Actuator" class="actuator">Relatórios</a>
		<ul id="M00043Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/memoriacalculorecalculoman.do?evento=x&idRotina=3042" title="Memória de Cálculo">Memória de Cálculo</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaorendasrecalculadasman.do?evento=x&idRotina=2206" title="Rendas Recalculadas">Rendas Recalculadas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaodiferencarecalculadasman.do?evento=x&idRotina=2207" title="Diferenças Calculadas">Diferenças Calculadas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaolancamentosgeradosman.do?evento=x&idRotina=2208" title="Lançamentos a serem Gerados">Lançamentos a serem Gerados</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00044Actuator" class="actuator">Dívida Oriunda do Recálculo</a>
		<ul id="M00044Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lancamentomanualdividaoriundarecalculoman.do?evento=x&idRotina=3244" title="Lançamento Manual">Lançamento Manual</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/negociacaodividarecalculoman.do?evento=x&idRotina=3245" title="Negociação">Negociação</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00045Actuator" class="actuator">Reajuste INSS</a>
		<ul id="M00045Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/percentuaisreajusteinssman.do?evento=x&idRotina=3202" title="Percentuais de Reajuste INSS">Percentuais de Reajuste INSS</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/prorrogacaobeneficiosman.do?evento=x&idRotina=3090" title="Prorrogação de Benefício">Prorrogação de Benefício</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00046Actuator" class="actuator">Consultas</a>
		<ul id="M00046Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/historicoprocesso.do?evento=x&idRotina=2210" title="Histórico de Processo">Histórico de Processo</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/bnfsimulacaoconcessao.do?evento=x&idRotina=2211" title="Simulação de Cálculo">Simulação de Cálculo</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00047Actuator" class="actuator">Folha de Pagamento</a>
		<ul id="M00047Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/folhapagamentoman.do?evento=x&idRotina=2213" title="Calendário de Pagamento">Calendário de Pagamento</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00048Actuator" class="actuator">Prévia</a>
		<ul id="M00048Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/calculafolhaman.do?evento=x&idRotina=2214" title="Calcula Folha">Calcula Folha</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00049Actuator" class="actuator">Relatórios</a>
		<ul id="M00049Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/previafolhaman.do?evento=x&idRotina=2217" title="Prévia da Folha">Prévia da Folha</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriopreviapensaoalimenticiaman.do?evento=x&idRotina=2218" title="Prévia da Folha Pensão Alimentícia">Prévia da Folha Pensão Alimentícia</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriorelacaorubricaman.do?evento=x&idRotina=3954" title="Relação de Rubricas da Prévia">Relação de Rubricas da Prévia</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/resumorubricapreviaman.do?evento=x&idRotina=2220" title="Resumo de Rubricas da Prévia (Analítico)">Resumo de Rubricas da Prévia (Analítico)</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/resumorubricapreviasembeneficioman.do?evento=x&idRotina=2221" title="Resumo de Rubricas da Prévia (Sintético)">Resumo de Rubricas da Prévia (Sintético)</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/ocorrenciapreviaman.do?evento=x&idRotina=2222" title="Ocorrências da Prévia">Ocorrências da Prévia</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/demonstrativoimpostorendarraman.do?evento=x&idRotina=3958" title="Demonstrativo Imposto de Renda RRA">Demonstrativo Imposto de Renda RRA</a></li>
		</ul>
	</li>

		</ul>
	</li>


<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00050Actuator" class="actuator">Conclusão</a>
		<ul id="M00050Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/confirmafolhaman.do?evento=x&idRotina=2215" title="Confirmação da Folha">Confirmação da Folha</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/contrachequecadastromensagemman.do?evento=x&idRotina=2228" title="Contracheque - Cadastro de Mensagens">Contracheque - Cadastro de Mensagens</a></li>
<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00051Actuator" class="actuator">Relatórios</a>
		<ul id="M00051Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatorioespelhofolhaman.do?evento=x&idRotina=2223" title="Espelho da Folha">Espelho da Folha</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatorioespelhopensaoalimenticiaman.do?evento=x&idRotina=2224" title="Espelho da Folha Pensão Alimentícia">Espelho da Folha Pensão Alimentícia</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relrelacaorubricaman.do?evento=x&idRotina=3955" title="Relação de Rubricas">Relação de Rubricas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/resumomensalrubricaman.do?evento=x&idRotina=2226" title="Resumo Mensal de Rubricas">Resumo Mensal de Rubricas</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relacaopagamentosliquidosman.do?evento=x&idRotina=2227" title="Relação de Pagamentos Líquidos">Relação de Pagamentos Líquidos</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/demonstrativodecalculodeirregressivoman.do?evento=x&idRotina=3887" title="Demonstrativo de Cálculo de IR Regressivo">Demonstrativo de Cálculo de IR Regressivo</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/lancdesconsideradosfolhaman.do?evento=x&idRotina=2982" title="Lançamentos Desconsiderados pela Folha">Lançamentos Desconsiderados pela Folha</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaoemissaocontracheque.do?evento=x&idRotina=2229" title="Contracheque">Contracheque</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriofichafinanceiraman.do?evento=x&idRotina=2230" title="Ficha Financeira">Ficha Financeira</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/informerendimentosbeneficiosman.do?evento=x&idRotina=2232" title="Informe de Rendimentos">Informe de Rendimentos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/saldoassistidoman.do?evento=x&idRotina=3888" title="Saldos Assistidos">Saldos Assistidos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/historicorendaman.do?evento=x&idRotina=3952" title="Histórico de Renda">Histórico de Renda</a></li>
		</ul>
	</li>

		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00052Actuator" class="actuator">Consolidação</a>
		<ul id="M00052Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/fechamentoman.do?evento=x&idRotina=2234" title="Fechamento">Fechamento</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00053Actuator" class="actuator">Integração</a>
		<ul id="M00053Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00054Actuator" class="actuator">Contabilidade</a>
		<ul id="M00054Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00055Actuator" class="actuator">Parâmetros de Integração Contábil</a>
		<ul id="M00055Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaocontabilman.do?evento=x&idRotina=3976" title="Parâmetros Gerais">Parâmetros Gerais</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/associacaocontascontabeisman.do?evento=x&idRotina=2954" title="Contas Contábeis">Contas Contábeis</a></li>
		</ul>
	</li>

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/provisionamentoabonoanualman.do?evento=x&idRotina=2955" title="Processamento">Processamento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/mapacontabilman.do?evento=x&idRotina=2231" title="Relatório de Mapa Contábil">Relatório de Mapa Contábil</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00056Actuator" class="actuator">Financeiro</a>
		<ul id="M00056Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/parametrosintegracaofinanceiraman.do?evento=x&idRotina=2974" title="Parâmetros de Integração Financeira">Parâmetros de Integração Financeira</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaointegracaofinanceiraman.do?evento=x&idRotina=2981" title="Contas a Pagar - Folha de Benefício">Contas a Pagar - Folha de Benefício</a></li>
		</ul>
	</li>


	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/dirfman.do?evento=x&idRotina=3088" title="DIRF">DIRF</a></li>
		</ul>
	</li>

</ul>
	</li>


			
				
					       	      
					<li class="menubar" style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">

	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00057Actuator" class="actuator">Instrução Normativa</a>
		<ul id="M00057Menu" class="menu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00058Actuator" class="actuator">IN26</a>
		<ul id="M00058Menu" class="submenu">

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00059Actuator" class="actuator">Cadastro</a>
		<ul id="M00059Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/in20cadastroorgaosman.do?evento=x&idRotina=3896" title="Órgãos">Órgãos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/cadastroenquadramentoman.do?evento=x&idRotina=3897" title="Enquadramentos">Enquadramentos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/enquadramentoautomaticoman.do?evento=x&idRotina=3898" title="Parametrização Enquadramentos">Parametrização Enquadramentos</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/in20cadastroclientesman.do?evento=x&idRotina=3899" title="Clientes">Clientes</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00060Actuator" class="actuator">Comunicação</a>
		<ul id="M00060Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/comunicacaoman.do?evento=x&idRotina=3902" title="Cadastramento Manual">Cadastramento Manual</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/geracaoxmlcomunicacaoman.do?evento=x&idRotina=3903" title="Geração Arquivo SPC/COAF">Geração Arquivo SPC/COAF</a></li>
		</ul>
	</li>


<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00061Actuator" class="actuator">Relatórios</a>
		<ul id="M00061Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriocadastroclientesman.do?evento=x&idRotina=3906" title="Clientes Cadastrados">Clientes Cadastrados</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relatoriocomunicacaoman.do?evento=x&idRotina=3908" title="Comunicações - Arq. SPC/COAF">Comunicações - Arq. SPC/COAF</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relpessoaspolexpostasman.do?evento=x&idRotina=3909" title="Pessoas Politicamente Expostas">Pessoas Politicamente Expostas</a></li>
		</ul>
	</li>


		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00062Actuator" class="actuator">IN1343</a>
		<ul id="M00062Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/molestiagraveman.do?evento=x&idRotina=3181" title="Participantes com Moléstia Grave">Participantes com Moléstia Grave</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/acoesjudiciaisman.do?evento=x&idRotina=3182" title="Participantes com Ação Judicial">Participantes com Ação Judicial</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/apuracaodesaldoman.do?evento=x&idRotina=3183" title="Apuração de Saldo Isento">Apuração de Saldo Isento</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/atualizacaodesaldoisentodeirman.do?evento=x&idRotina=3184" title="Atualização de Saldo">Atualização de Saldo</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/declaracaosaldoisencaoirman.do?evento=x&idRotina=3185" title="Declaração do Saldo de Isenção de IR">Declaração do Saldo de Isenção de IR</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reldemonstrativoapuracaosaldoisentoirman.do?evento=x&idRotina=3186" title="Demonstrativo de Apuração ">Demonstrativo de Apuração </a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/reldemonstrativomovimentacaosaldoisentoircompensarman.do?evento=x&idRotina=3187" title="Demonstrativo de Movimentação">Demonstrativo de Movimentação</a></li>
		</ul>
	</li>

<li style="background-image: url(http://www.prevmestra.com.br/Mestra_Previdenciario/plc/midia/plus.gif);">
	<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" id="M00063Actuator" class="actuator">IN1452</a>
		<ul id="M00063Menu" class="submenu">

	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/gerardadosman.do?evento=x&idRotina=3238" title="Gerar Dados">Gerar Dados</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/gerararquivoman.do?evento=x&idRotina=3240" title="Gerar Arquivo">Gerar Arquivo</a></li>
	<li><a href="http://www.prevmestra.com.br/Mestra_Previdenciario/relgeracaodadosman.do?evento=x&idRotina=3239" title="Relatório de Conferência">Relatório de Conferência</a></li>
		</ul>
	</li>


</ul>
	</li>


			                  
		</ul></div>
		
	</td>
	<!-- FIM MENU -->
		
		
		<td id="botao1" style="top:50%;" align="left">
			<img src="midia/anteriorMenu.gif" onclick="javascript:menuFlex(&#39;aberto&#39;)" style="cursor:hand">
		</td>
		<td id="botao2" style="display:none;top:50%" align="left">
			<img src="midia/proximoMenu.gif" onclick="javascript:menuFlex(&#39;fechado&#39;)" style="cursor:hand">
		</td>
	  	<td width="100%" align="left" id="layout_col_principal" valign="top">
	  		<table width="99%" align="right"><tbody><tr><td>
		  	
				












<form name="funcionariosForm" method="post" action="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do" enctype="text/html" onsubmit="return executarAcaoFuncoes(event)"><input type="hidden" name="org.apache.struts.taglib.html.TOKEN" value="c59ed6acb13da8ef739fc6a2f5de53fe">



<input type="hidden" name="modoPlc" value="inclusaoPlc">
<!-- Retornar se nao houver melhor forma de identificar portlets em uma mesma pagina -->
<!-- html:hidden property="< %=PlcConstantes.PORTLET_KEY% >" /> -->
<!-- Controle de submissao duplicada utilizando token da Struts -->





<input type="hidden" name="detCorrPlc" value="">



 















<style>
td.msg_confirma{background:#D8E5ED;color:#144888;font:bold 11px Verdana}
td.msg_erro{background:#FFDBDB;color:#AB3838;font:normal bold 11px Verdana;height:auto}
td.msg_erro_ver{background:#89B39C;color:#FFFFFF;font:normal bold 11px Verdana;height:auto}
td.msg_erro_am{background:#FFFEAF;color:#413A01;font:normal bold 11px Verdana;height:auto}
</style>

<iframe id="FRAME_MENSAGEM_FLUTUANTE" src="" style="width:0;height:0;position:absolute;top:55;z-index:600;filter:alpha(opacity=0);"></iframe>
<div id="DIV_MENSAGEM_FLUTUANTE" style="width:700;height:1;position:absolute;top:58;z-index:800;filter:alpha(opacity=70); -moz-opacity:0.7;">



</div>
<script>
		function econderMgsExibida() {
			var obj = window.document.getElementById("DIV_MENSAGEM_FLUTUANTE");
			var objFrame = window.document.getElementById("FRAME_MENSAGEM_FLUTUANTE");
			obj.style.visibility = "hidden";
			objFrame.style.visibility = "hidden";
		}
</script>

 












<!-- INÍCIO ANIMAÇÃO LOADING -->

<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody><tr>
	<td valign="bottom" align="right"><strong><font size="3" color="red">
	
		
		
		
		
		
	
	</font></strong></td>
<td>
<table border="0" cellpadding="0" cellspacing="0" class="menu_acoes">
<tbody><tr><td>









	
	



    
   
   	 
     
    
   
   
	
		
		
		
		
		
		



		
		
	    	

		

		

	
				
		
		
		<input type="button" name="evento" value="F7-Novo" onclick="setBotaoAcao(getBotaoArray(&#39;INCLUIR&#39;)); redirect(&#39;/Mestra_Previdenciario/funcionariosman.do?evento=x&#39;);" onmouseover="animar(event , &#39;2&#39;)" onmouseout="animar(event, &#39;&#39;)" id="botao_menu" style="text-align:center; background-position: &#39;left center&#39;;  height: 28px; width: 28px; margin-right:5px; background-repeat: &#39;no-repeat&#39;; padding-left: &#39;5px&#39;; font-size: 0px; background-color: transparent; border: 0px; background: url(/Mestra_Previdenciario/midia/mestra/evt_incluir.gif)" title="Novo">
		<script>
		regBotaoEvento('F7-Novo','INCLUIR');
		</script>
		


		

		
		<input type="submit" name="evento" value="F10-Gravar" onclick="setBotaoAcao(getBotaoArray(&#39;GRAVAR&#39;));" onmouseover="animar(event , &#39;2&#39;)" onmouseout="animar(event, &#39;&#39;)" id="botao_menu" style="text-align:center; background-position: &#39;left center&#39;;  height: 28px; width: 28px; margin-right:5px; background-repeat: &#39;no-repeat&#39;; padding-left: &#39;5px&#39;; font-size: 0px; background-color: transparent; border: 0px; background: url(/Mestra_Previdenciario/midia/mestra/evt_gravar.gif)" title="Gravar">
		<script>
		setBotaoAcaoEnter('F10-Gravar');
		regBotaoEvento('F10-Gravar','GRAVAR');
		</script>
		

		

		
		
		

		
		<input type="button" name="evento" value="F8-Abrir" onclick="setBotaoAcao(getBotaoArray(&#39;ABRIR&#39;)); redirect(&#39;/Mestra_Previdenciario/funcionariossel.do?evento=x&#39;);" onmouseover="animar(event , &#39;2&#39;)" onmouseout="animar(event, &#39;&#39;)" id="botao_menu" style="text-align:center; background-position: &#39;left center&#39;;  height: 28px; width: 28px; margin-right:5px; background-repeat: &#39;no-repeat&#39;; padding-left: &#39;5px&#39;; font-size: 0px; background-color: transparent; border: 0px; background: url(/Mestra_Previdenciario/midia/mestra/evt_abrir.gif)" title="Abrir">
		<script>
		regBotaoEvento('F8-Abrir','ABRIR');
		</script>
		
		
		

		

		

		

		
		
		
	
		
		
	
		
		<a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" onclick="janelaAjudaHtml(); return false"><img align="ABSMIDDLE" border="0" height="20" hspace="3" src="midia/g_botao_ajuda.gif" vspace="0" width="20"></a>
		
	</td>
</tr>
</tbody></table>

<!-- JANELA DE AJUDA -->
<style>
	div#ajuda{
		width: 200px;
		background: #F8D1CB;
		border-bottom: 2px solid #DC3823;
		margin: 0;
		padding: 0 0 15px 0;
		z-index: 5;
		position: absolute;
		right: 10px;
		
	}
	div#ajuda h1{
		position: relative;
		height: 30px;
		color: #FFF;
		margin: 0 0 5px 0;
		font: bold 18px/30px Tahoma, Arial, Verdana, sans-serif;
		padding: 0 5px 0 10px;
		background: #DC3823;
		border-bottom: 2px solid #FFF;
	}
	div#ajuda h1 span{
		height: 20px;
		font: bold 11px/16px Verdana, Tahoma, Arial, sans-serif;
		padding: 0 5px 0 5px;
		position: absolute;
		cursor: pointer;
		right: 5px;
		top: 5px;
		color: #FFF;
		background: #CA230D;
		border-top: 1px solid #F04933;
		border-right: 1px solid #A41C0B;
		border-bottom: 1px solid #A41C0B;
		border-left: 1px solid #F04933;	
	}
	div#ajuda h2{
		height: 28px;
		font: bold 18px/28px Tahoma, Arial, Verdana, sans-serif;
		margin: 10px 5px 10px 20px;
		padding: 0 0 0 5px;
		color: #DC3823;
		background: #FFF;
		letter-spacing: 0px;
	}
	div#ajuda p{
		font: 11px/14px Verdana, Tahoma, Arial, sans-serif;
		color: #DC3823;
		margin: 0 5px 10px 35px;
	}
	div#ajuda input{
		height: 20px;
		font: bold 11px/15px Verdana, Tahoma, Arial, sans-serif;
		padding: 0;
		margin: 0 5px 0 35px;
		cursor: pointer;
		color: #FFF;
		background: #CA230D;
		border-top: 1px solid #F04933;
		border-right: 1px solid #A41C0B;
		border-bottom: 1px solid #A41C0B;
		border-left: 1px solid #F04933;	
	}
</style>
<div id="ajuda" style="visibility: hidden">
	<h1>Ajuda <span class="fechar" onclick="janelaAjuda(ajuda);">X</span></h1>
	
	<h2>Operação</h2>
	<p>Em caso de dúvidas sobre como operar este sistema, utilize esta opção.</p>
	
	<input type="button" value="Quero Ajuda!" onclick="window.open(&#39;/Mestra_Previdenciario/doc/operacao/operacao_viewlet_swf.html&#39;,&#39;Ajuda&#39;,&#39;&#39;)">
	
	
	
	<h2>Glossário</h2>
	<p>Para uma relação com explicação sobre os principais termos utilizados neste sistema, utilize esta opção.</p>
	
	<input type="button" value="Quero Ajuda!" onclick="window.open(&#39;/Mestra_Previdenciario/plc/layouts/PlcGlossarioLayout.jsp&#39;,&#39;Ajuda&#39;,&#39;&#39;)">
	
	
	
</div>
<!-- FIM JANELA DE AJUDA -->
</td></tr></tbody></table>
<script>
function janelaAjudaHtml() {

    }
</script>
<script src="javascript/ConnectPrevMestra.js"></script>
<script src="javascript/uploadMestra.js"></script>

 









<!--  <div style="height:580px;witdh:100%;overflow-Y:auto;"> -->
	<!-- INI -->
	
		







<!-- botao de submit associado ao botaoComboPatrocinadoraPlano -->
<input type="submit" name="evento" value="Recupera Combo PatrocinadoraPlano Pelo ID" id="botaoComboPatrocinadoraPlanoID" style="visibility:hidden;width:0;height:0">     

<input type="submit" name="evento" value="eventoVerificaCPFParticipante" id="botaoComboVerificaCPF" style="visibility:hidden;width:0;height:0">

<input type="submit" name="evento" value="eventoCalcularVinculoPatrocinador" id="eventoCalcularVinculoPatrocinador" style="visibility:hidden;width:0;height:0">

<input type="submit" name="evento" value="eventoVisualizarDadosPlanos" id="acaoVisualizarDadosPlanos" style="visibility:hidden;width:0;height:0">

<input type="submit" name="evento" value="acaoGerarDigitoVerificador" id="acaoGerarDigitoVerificador" style="visibility:hidden;width:0;height:0">


	
	
	
		
	


<!-- INICIO DO CÓDIGO DO SISTEMA --> 




<input type="hidden" name="idParticipante" value="">

<h3 class="secao">Funcionários</h3>

<div class="row">
	<div class="col-sm-6 form-group">
		<label>Fundo&nbsp; <span class="text-warning">*</span></label>
		
		<select class="form-control chosen" name="codigoFundo" onchange="disparaAcaoBotao(&#39;botaoComboPatrocinadoraPlanoID&#39;)" class="texto" title="Escolha o Fundo"><option value="">[Selecione...]</option>
			<option value="001" selected="selected">001 - MESTRA - FUNDAÇÃO DE PREVIDÊNCIA COMPLEMENTAR</option>
			<option value="002">002 - MESTRA - CAIXA DE ASSISTÊNCIA</option>
		</select>
	</div>	

	<div class="col-sm-4 form-group">
		<label>Inscrição</label>

		<input type="text" class="form-control" name="numeroInscricao" maxlength="10" size="11" value="" readonly="readonly" class="texto_obrigatorio" title="Informe o Número de Inscrição">
	</div>
</div>
<div class="row">

	<div class="col-sm-4 form-group">
		<label>Patrocinador&nbsp; <span class="text-warning">*</span></label>
		
		<select  class="form-control" name="codigoPatrocinadora" class="texto" title="Escolha o Patrocinador"><option value="">[Selecione...]</option>
			<option value="1">001 - MESTRA EQUIPAMENTOS</option>
			<option value="2">002 - MESTRA SUPRIMENTOS</option>
			<option value="3">003 - MESTRA SERVIÇOS</option>
			<option value="4">004 - MESTRA ROBÓTICA</option>
		</select>
	</div>


	<div class="col-sm-4 form-group form-inline">
		<label>Matrícula&nbsp; <span class="text-warning">*</span></label>

		<input type="text" class="form-control col-sm-10" name="numeroMatricula" maxlength="10" size="11" value="" onkeypress="return sonumero(event)" onblur="disparaAcaoBotao(&#39;acaoGerarDigitoVerificador&#39;)" class="texto" title="Informe o Número da Matrícula">
		<input type="text" class="form-control col-sm-2" name="numeroDigitoVerificadorMatricula" maxlength="1" size="1" value="" readonly="readonly" class="texto_obrigatorio">
		
	</div>
</div>

<div class="row">
	<div class="col-sm-3 form-group">
		<label>Nome&nbsp; <span class="text-warning">*</span></label>
		<input type="text" class="form-control" name="nomeParticipante" maxlength="60" value="" class="texto" title="Informe o Nome" >
	</div>
</div>





<h3 class="secao">Exemplo de Modal</h3>

<!-- Primeiro adiciona o HTML que vai chamar o modal -->
<div class="row">

	<div class="col-sm-6 form-group">
		<label>Botão que vai chamar o modal&nbsp; <span class="text-warning">*</span></label>
		<div class="col-sm-6">
			<button type="button" class="btn btn-primary btn-lg col-sm-12" data-toggle="modal" data-target="#modal-da-mestra">
			  Abrir modal 1
		</button>
		</div>
		<div class="col-sm-6">
			<button type="button" id="abrirIframe" class="btn btn-primary btn-lg col-sm-12" data-toggle="modal" data-target="#modal-iframe">
			  Abrir modal com iframe
		</button>
		</div>
	</div>
</div>

</div>

<!-- Depois adiciona o código referente ao conteúdo do modal -->

<div class="modal fade" id="modal-da-mestra">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Título do Modal</h4>
      </div>
      <div class="modal-body">

		<div class="row">
			<div class="col-sm-12">Conteúdo do modal pode ser um texto como esse</div>
      	</div>
		<div class="row">
			
			<div class="col-sm-12 form-group">
				<p>Ou um campo de formulário, como abaixo</p>
			</div>
			<div class="col-sm-12 form-group">
				<label>Nome&nbsp; <span class="text-warning">*</span></label>
				<input type="text" class="form-control" name="nomeParticipante" maxlength="60" value="" class="texto" title="Informe o Nome" >
			</div>
		</div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary">Salvar alterações</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<!-- Exemplo de modal com iFRAME -->

<script type="text/javascript">

$(function(){
	$('#abrirIframe').on('click', function(){
		eModal.iframe('http://www.mestrainfo.com.br', 'Título do iFrame');
		// Documentação do eModal em https://github.com/saribe/eModal
		// Também da pra fazer requisições ajax com eModal.ajax();
	})
});

</script>






<h3 class="secao">Dados Pessoais</h3>


<div class="row">
	<div class="col-sm-2 form-group">
		<label>Nascimento <span class="text-warning">*</span></label>
		<input class="form-control datepicker" type="text" name="dataNascimentoParticipanteFormatado" maxlength="10"  value="" onkeyup="DateFormat(this,this.value,event,false)" onfocus="javascript:vDateType=&#39;3&#39;" class="texto" title="Informe a Data">
	</div>

	<div class="col-sm-2 form-group">
		<label>Por Falecimento</label>
		<input class="form-control" type="text" name="dataFalecimentoParticipanteFormatado" maxlength="10"  value="" onkeyup="DateFormat(this,this.value,event,false)" onblur="DateFormat(this,this.value,event,true)" onfocus="javascript:vDateType=&#39;3&#39;" readonly="readonly" class="texto_obrigatorio" title="Informe a Data">
	</div>

	<div class="col-sm-2 form-group">
		<label>Sexo <span class="text-warning">*</span></label>
		<select  class="form-control" name="tipoSexoParticipante" class="texto"><option value="" selected="selected">[Selecione...]</option>
			<option value="F">F - Feminino</option>
	   		<option value="M">M - Masculino</option></select>
	</div>


	<div class="col-sm-2 form-group">
		<label>Estado Civil <span class="text-warning">*</span></label>
		<select class="form-control chosen" name="codigoEstadoCivilParticipante" onchange="desabilitarNomeConjuge()" class="texto"><option value="" selected="selected">[Selecione...]</option>
				<option value="01">01 - Solteiro (a)</option>
				<option value="02">02 - Casado (a)</option>
				<option value="03">03 - Viúvo (a)</option>
				<option value="04">04 - Separado (a)</option>
				<option value="05">05 - Divorciado (a)</option>
				<option value="06">06 - Vive Maritalmente</option>
				<option value="07">07 - Outros</option></select>
	</div>


	<div class="col-sm-2 form-group">
		<label>Escolaridade <span class="text-warning">*</span></label>
		<select class="form-control" name="codigoGrauInstrucaoParticipante" class="texto"><option value="" selected="selected">[Selecione...]</option>
				<option value="00">00 - Não alfabetizado</option>
				<option value="01">01 - Alfabetizado</option>
				<option value="02">02 - 1º Grau Incompleto</option>
				<option value="03">03 - 1º Grau Completo</option>
				<option value="04">04 - 2º Grau Incompleto</option>
				<option value="05">05 - 2º Grau Completo</option>
				<option value="06">06 - Superior Incompleto</option>
				<option value="07">07 - Superior Completo</option>
				<option value="08">08 - Pós-graduação</option>
				<option value="09">09 - Mestrado</option>
				<option value="10">10 - Doutorado</option>
				<option value="11">11 - Indefinido</option></select>
	</div>
</div>




<input type="hidden" name="identificadorAgencia" value="" id="identificadorAgencia">	
<input type="hidden" name="identificadorBanco" value="" id="identificadorBanco">

<input type="hidden" name="tipoContaBanco1" value="" id="tipoContaBanco1">
<input type="hidden" name="tipoContaBanco2" value="" id="tipoContaBanco2">

<br>

</form>

			
			</td></tr></tbody></table>
		</td>
	</tr>
	
	<tr height="1%">
		<td colspan="4">
	    	






<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tbody><tr height="10px">     
		<td align="center" class="rodape" colspan="3">	
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td align="left" colspan="3">&nbsp;
						
						
					</td>
					<td align="right" style="color:#2D7991;font:normal bold 10px Verdana;">
						Seja bem-vindo,&nbsp;administrador.
					</td>
					<td align="right" style="color:#2D7991;font:normal bold 10px Verdana;">
						v1.1.177/P - Copyright Mestra Informática e Tecnologia Ltda. 2010
					</td>
				</tr>
			</tbody></table>
		</td>
	</tr>
</tbody></table>
<script>
regBotaoEvento('Desconectar','DESCONECTAR');
regEvento('Desconectar','MENSAGEM','');
regMensagem('Desconectar','CONFIRMACAO','Tem certeza que deseja desconectar?');
</script>
		</td>
	</tr>
	
	</tbody></table>
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