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