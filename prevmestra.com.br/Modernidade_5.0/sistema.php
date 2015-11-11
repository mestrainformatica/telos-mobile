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

	<table width="100%" border="0" bordercolor="#beccdf" style="border-width:0mm" cellpadding="0" cellspacing="0" height="100%">
		<tbody>

			<tr height="11%" bordercolor="#BECCDF" bgcolor="#879EBD">
				<td colspan="4" bordercolor="#BECCDF" bgcolor="879EBD">


					<!-- asdasd -->

					<table onresize="redimencionaTesteira()" id="localTesteiraTable" bgcolor="#beccdf" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="z-index:500;">
						<tbody><tr>
							<td class="header-modernidade">
								<!-- @flag --> <embed onresize="redimencionaTesteira()" id="localTesteira" border="0" width="100%" height="101%" bgcolor="#beccdf" style="border-color: rgb(135, 158, 189); z-index: 1; height: 71.9186046511628px; background-color: rgb(135, 158, 189);" cellpadding="0" cellspacing="0" fullscreen="no" src="/Mestra_Previdenciario/plc/midia/testeira_previdenciario.swf" wmode="opaque"> <!-- @flag -->

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
						</tbody>
					</table>		

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


				<?php include("includes/menu.php"); ?>



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
									</tbody>
								</table>

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
							</td></tr></tbody>
						</table>
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


						</td></tr></tbody>
					</table>
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
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
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