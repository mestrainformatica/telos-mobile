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


<h3 class="secao">Exemplos de Grid</h3>
<p>O grid possui 12 colunas e o tamanho de cada coluna é definido através da classe <code>.col-sm-*</code>, onde * é o número de colunas.</p>
<pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="row"&gt;
  &lt;div class="col-sm-8"&gt;...&lt;/div&gt;
  &lt;div class="col-sm-4"&gt;...&lt;/div&gt;
&lt;/div&gt;
</code></pre>

<div class="row show-grid">
  <div class="col-sm-8"><p>.col-sm-8</p></div>
  <div class="col-sm-4"><p>.col-sm-4</p></div>
</div>
<div class="row show-grid">
  <div class="col-sm-3"><p>.col-sm-3</p></div>
  <div class="col-sm-4"><p>.col-sm-4</p></div>
  <div class="col-sm-5"><p>.col-sm-5</p></div>
</div>
<div class="row show-grid">
  <div class="col-sm-6"><p>.col-sm-6</p></div>
  <div class="col-sm-6"><p>.col-sm-6</p></div>
</div>


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
<p>Primeiro adicione o HTML que vai chamar o modal</p>
<p>O botão que chama o modal precisa usar o atributo <code>data-toggle="modal"</code> e <code>data-target="#conteudo-do-modal"</code>.</p>
<pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;button type="button" class="btn" data-toggle="modal" data-target="#conteudo-do-modal"&gt;Abrir modal&lt;/button&gt;</code></pre>
<p>O conteúdo do modal precisa seguir a estrutura abaixo, com o <code>id="conteudo-do-modal"</code> utilizado no botão.</p>

<pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="modal fade" id="conteudo-do-modal"&gt;
  &lt;div class="modal-dialog"&gt;
    &lt;div class="modal-content"&gt;
      &lt;div class="modal-header"&gt;
        &lt;button type="button" class="close" data-dismiss="modal" aria-label="Close"&gt;&lt;span aria-hidden="true"&gt;&times;&lt;/span&gt;&lt;/button&gt;
        &lt;h4 class="modal-title"&gt;Título do Modal&lt;/h4&gt;
      &lt;/div&gt;
      &lt;div class="modal-body"&gt;

        &lt;div class="row"&gt;
          &lt;div class="col-sm-12"&gt;Conteúdo do modal pode ser um texto como esse&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="row"&gt;

          &lt;div class="col-sm-12 form-group"&gt;
            &lt;p&gt;Ou um campo de formulário, como abaixo&lt;/p&gt;
          &lt;/div&gt;
          &lt;div class="col-sm-12 form-group"&gt;
            &lt;label&gt;Nome&nbsp; &lt;span class="text-warning"&gt;*&lt;/span&gt;&lt;/label&gt;
            &lt;input type="text" class="form-control" name="nomeParticipante" maxlength="60" value="" class="texto" title="Informe o Nome" &gt;
          &lt;/div&gt;
        &lt;/div&gt;


      &lt;/div&gt;
      &lt;div class="modal-footer"&gt;
        &lt;button type="button" class="btn btn-default" data-dismiss="modal"&gt;Fechar&lt;/button&gt;
        &lt;button type="button" class="btn btn-primary"&gt;Salvar alterações&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

<p>Exemplos:</p>
<br>
<div class="row">
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

<!-- Codigo de exemplo do modal -->
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
<br>
<p>Documentação e mais exemplos do modal: <a href="http://saribe.github.io/eModal/#demo" target="_blank">http://saribe.github.io/eModal/#demo</a></p>

<hr>

<h3 class="secao">Campos que utilizam datas</h3>
<p>Para criar campos de data, utilize a classe <code>.datepicker</code></p>
<br>
<pre><code class="language-html" data-lang="html">&lt;input class="form-control datepicker" type="text" name="..."  value="..." title="..."></code></pre>
</br>
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

  <h3 class="secao">Tabelas</h3>

  <p>Tabela com borda <code>.table</code></p>
  <br>
  <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;table</span> <span class="na">class=</span><span class="s">"table"</span><span class="nt">&gt;</span>
  ...
<span class="nt">&lt;/table&gt;</span></code></pre></div>
  <br>
  <table class="table" border="0" cellspacing="0" cellpadding="0" width="100%" style=""> 
    <thead>
      <tr>
        <th>Situação</th>  
        <th>Nota</th>  
        <th>Avaliação</th>  
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ótimo</td>
        <td>4</td>
        <td>Em conformidade - Atende Plenamente</td>
      </tr>
      
      <tr>
        <td>Bom</td>
        <td>3</td>
        <td>Possui pequenos problemas que não influenciam na qualidade e na sua aplicabilidade - Atende com restrinção</td>
      </tr>
      
      <tr>
        <td>Regular</td>
        <td>2</td>
        <td>Situação intermediária que não atende aos interesses da Mestra - Não atende</td>
      </tr>
      
      <tr>
        <td>Ruim</td>
        <td>1</td>
        <td>Apresenta não - conformidade - Não atende</td>
      </tr>
      
      <tr>
        <td>Péssimo</td>
        <td>0</td>
        <td>Apresenta não - conformidades séries - Não atende</td>
      </tr>
    </tbody>
  </table>

  <p>Tabela com borda <code>.table .table-bordered</code></p>
  <br>
  <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;table</span> <span class="na">class=</span><span class="s">"table table-bordered"</span><span class="nt">&gt;</span>
  ...
<span class="nt">&lt;/table&gt;</span></code></pre></div>
  <br>
  <table class="table table-bordered"> 
    <thead>
      <tr>
        <th>Situação</th>  
        <th>Nota</th>  
        <th>Avaliação</th>  
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ótimo</td>
        <td>4</td>
        <td>Em conformidade - Atende Plenamente</td>
      </tr>
      
      <tr>
        <td>Bom</td>
        <td>3</td>
        <td>Possui pequenos problemas que não influenciam na qualidade e na sua aplicabilidade - Atende com restrinção</td>
      </tr>
      
      <tr>
        <td>Regular</td>
        <td>2</td>
        <td>Situação intermediária que não atende aos interesses da Mestra - Não atende</td>
      </tr>
      
      <tr>
        <td>Ruim</td>
        <td>1</td>
        <td>Apresenta não - conformidade - Não atende</td>
      </tr>
      
      <tr>
        <td>Péssimo</td>
        <td>0</td>
        <td>Apresenta não - conformidades séries - Não atende</td>
      </tr>
    </tbody>
  </table>

  <p>Tabela com borda <code>.table .table-striped</code></p>
  <br>
  <div class="highlight">
    <pre><code class="language-html" data-lang="html"><span class="nt">&lt;table</span> <span class="na">class=</span><span class="s">"table table-striped"</span><span class="nt">&gt;</span>
  ...
<span class="nt">&lt;/table&gt;</span></code></pre>
  </div>
  <br>
  <table class="table table-striped" border="0" cellspacing="0" cellpadding="0" width="100%" style="">
    <thead>
      <tr>
        <th>Situação</th>  
        <th>Nota</th>  
        <th>Avaliação</th>  
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ótimo</td>
        <td>4</td>
        <td>Em conformidade - Atende Plenamente</td>
      </tr>
      
      <tr>
        <td>Bom</td>
        <td>3</td>
        <td>Possui pequenos problemas que não influenciam na qualidade e na sua aplicabilidade - Atende com restrinção</td>
      </tr>
      
      <tr>
        <td>Regular</td>
        <td>2</td>
        <td>Situação intermediária que não atende aos interesses da Mestra - Não atende</td>
      </tr>
      
      <tr>
        <td>Ruim</td>
        <td>1</td>
        <td>Apresenta não - conformidade - Não atende</td>
      </tr>
      
      <tr>
        <td>Péssimo</td>
        <td>0</td>
        <td>Apresenta não - conformidades séries - Não atende</td>
      </tr>
    </tbody>
  </table>

  <h3 class="secao">Fieldsets</h3>
  <p>Utilize a classe <code>.form-fieldset</code> tanto na tag <code>&lt;fieldset&gt;</code> quanto na <code>&lt;legend&gt;</code></p>
  <br>
  <pre><code class="language-html" data-lang="html">
    &lt;fieldset class="form-fieldset"&gt;
      &lt;legend class="form-fieldset">Fieldset 1&lt;/legend&gt;
      ...
    &lt;/fieldset&gt;
  </code></pre>
  <p></p>
  <br>
  <fieldset class="form-fieldset">
    <legend class="form-fieldset">Fieldset Maior</legend>

    <div class="row">
      <div class="col-md-8">
        <fieldset class="form-fieldset">
          <legend class="form-fieldset">Fieldset 1</legend>
          
        </fieldset>
      </div>
      <div class="col-md-4">
        <fieldset class="form-fieldset">
          <legend class="form-fieldset">Fieldset 2</legend>
          
        </fieldset>
      </div>
    </div>
  </fieldset>

  <h3 class="secao">Componente retrátil</h3>
  <div id="componenteVisual" class="form-group" style="margin-right: 20px">

    <script>
      var ancora  = "";
      var pos     = -1;
    </script>
    <div class="col_hierarq">
      <!-- Botao de + - -->

      <script>
        ancora  = "";
        if(ancora != ""){
          setTimeout("setAncora('#"+ancora+"')", 10);
        } 
      </script>

      <input type="submit" name="evento" tabindex="30000" value="-" onclick="setValorCampo('detCorrPlc','pIdPlc=itensPlc&amp;acao=retrai&amp;pBPlc=0&amp;pOPlc=0#itensPlc');" class="botao_menos btn btn-defau">

      <script>regBotaoEvento('-','PORTLET_RETRAI');</script>
      <script>regBotaoEvento('+','PORTLET_EXPANDE');</script>
      <!-- Fim botao + - -->
    </div>

    <div class="titulo">
      <script>
        var idPortlet   = "itensPlc";
        var campoFoco   = "";
        if(ancora != "" && ancora == idPortlet){
          setVarGlobal("idPortlet", idPortlet);

        }
      </script>
      <!-- Barra de funções do navegador -->
      <div class="componenteRetratil" width="100%" cellspacing="0" cellpadding="0" border="0">

        <h1 class="componente-titulo">
          <!-- Título - Sempre Aparece -->

          Usuário Centro Custo&nbsp;

          <!-- Fim titulo -->
        </h1>
        <!-- Função ... -->
        <!-- Controles do topo -->

        <div class="controles-right">
          <input type="button" name="evento" value="Novo" class="btn btn-default" onclick="setValorCampo('detCorrPlc','itensPlc');plcAjax.ajaxEscondeBarraProgresso();plcAjax.ajaxSubmit('POST',getBotaoArray('INCLUIR_DET'));" onmouseover="try{animar(event , '2')}catch(e){}" onmouseout="try{animar(event, '')}catch(e){}" id="botao_secao" style="text-align:center;background-image: 'url(/Mestra_Compras/plc/midia/mestra/evt_incluir_det.gif)'; background-position: 'left center'; background-repeat: 'no-repeat'; padding-left: '8px';">
          <script>regBotaoEvento('Novo','INCLUIR_DET');</script>
        </div>

        <!-- Fim Controles do topo -->
      </div>
    </div> <!-- titulo -->

    <div class="conteudoComponenteRetratil" width="100%" border="0" cellpadding="0" cellspacing="0">
      <div class="col-sm-6 form-group">
        <label for="">Centro Custo</label>
        <select name="itensPlc[0].identificadorCentroCusto" class="texto form-control"><option value="">[Selecione...]</option>
          <option value="43">MESTRA</option>
          <option value="45">CD - CONSELHO DELIBERATIVO</option>
          <option value="46">ACD - ASS. DO CONSELHO DELIBERATIVO</option>
          <option value="48">CF - CONSELHO FISCAL</option>
          <option value="53">AJU - ASSESSORIA JURIDICA          </option>
          <option value="55">PR - PRESIDENCIA</option>
          <option value="58">GAP - ADM. E GESTÃO DE PESSOAS</option>
          <option value="61">DA - DIRETORIA DE ASSISTENCIA</option>
          <option value="62">DA - DIRETORIA DE ASSISTENCIA</option>
          <option value="67">DF - DIRETORIA FINANCEIRA</option>
          <option value="68">GIN - GERENCIA DE INVESTIMENTOS</option>
          <option value="79">GCT - GERÊNCIA DE CONTROL. TECNOL.</option>
          <option value="80">GSS - GERÊNCIA DE SEG. SUPLETIVA</option>
          <option value="81">GEF - GERÊNCIA FINANCEIRA</option>
          <option value="82">DIRETORIA DE BENEFICIOS</option>
          <option value="83">DIRETORIA FINANCEIRA</option>
          <option value="84">ASSESSORIA DO CONSELHO DELIBERATIVO</option>
          <option value="85">ASSESSORIA JURIDICA</option>
          <option value="86">GERENCIA CONTR  INT, COMUNIC E TI</option>
          <option value="87">GERENCIA DE SEGURIDADE SUPLETIVA</option>
          <option value="88">GERENCIA DE ADM E GESTAO DE PESSOAL</option>
          <option value="89">GERENCIA DE INVESTIMENTOS</option>
          <option value="90">GERENCIA FINANCEIRA</option>
          <option value="91">ARL - ASSESSORIA DE RELACIONAMENTO</option>
        </select>
      </div>
    </div>
  </div>

  <h3 class="secao">Campos desabilitados ou de apenas leitura</h3>
  <p>Para usar campos que os usuário não possam editar, utilize o atributo <code>disabled="disabled"</code>.</p>
  <p>Funciona também com os campos de datepicker.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;input class="form-control datepicker" type="text" name="..."  value="..." <strong>disabled="disabled"</strong>></code></pre>

  <div class="row form-group">
    <div class="col-sm-4">
      <label for="">Input</label>
      <input type="text" class="form-control col-sm-10" name="" value="" disabled="disabled">
    </div>
    <div class="col-sm-4">
      <label for="">Select</label>
      <select class="form-control chosen" name="codigoFundo" disabled="disabled" onchange="disparaAcaoBotao(&#39;botaoComboPatrocinadoraPlanoID&#39;)" class="texto" title="Escolha o Fundo"><option value="">[Selecione...]</option>
        <option value="001" selected="selected">001 - MESTRA - FUNDAÇÃO DE PREVIDÊNCIA COMPLEMENTAR</option>
        <option value="002">002 - MESTRA - CAIXA DE ASSISTÊNCIA</option>
      </select>
    </div>
    <div class="col-sm-4">
      <label for="">Datepicker</label>
      <input class="form-control datepicker" type="text" disabled="disabled">
    </div>
    
  </div>
</form>