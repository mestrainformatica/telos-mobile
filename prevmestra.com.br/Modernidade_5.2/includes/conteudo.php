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


  <div class="menu_acoes">

   <button type="submit" title="F7-Novo" class="btn btn-default" id="botao_menu" onclick="setBotaoAcao(getBotaoArray('INCLUIR')); redirect('/FAECES_FolhaAtivo/funcoesman.do?evento=x');" value="F7-Novo" name="evento">
      <span class="icon icon-file-text2"></span>
    </button>


<script avaliar="S">
regBotaoEvento('F7-Novo','INCLUIR');


</script> 


    <input type="submit" name="evento" value="&#xE9A9;" class="input-icon" onclick="setBotaoAcao(getBotaoArray(&#39;GRAVAR&#39;));" onmouseover="animar(event , &#39;2&#39;)" onmouseout="animar(event, &#39;&#39;)" id="botao_menu" title="F10 - Gravar">
    <script>
      setBotaoAcaoEnter('F10-Gravar');
      regBotaoEvento('F10-Gravar','GRAVAR');
    </script>



   
   <button type="submit" title="F7-Novo" class="btn btn-default" id="botao_menu" onclick="setBotaoAcao(getBotaoArray('INCLUIR')); redirect('/FAECES_FolhaAtivo/funcoesman.do?evento=x');" value="F7-Novo" name="evento">
      <span class="icon icon-file-text2"></span>
    </button>


<script avaliar="S">
regBotaoEvento('F7-Novo','INCLUIR');


</script> 


    <a href="http://www.prevmestra.com.br/Mestra_Previdenciario/funcionariosman.do?evento=x&idRotina=731#" onclick="janelaAjudaHtml(); return false"><img align="ABSMIDDLE" border="0" height="20" hspace="3" src="midia/g_botao_ajuda.gif" vspace="0" width="20"></a>
  </div>

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

<br clear="both"><br>
<div class="jumbotron">
  <h1 style="font-size:28px;">Documentação de exemplo para o Sysprev Modernidade.</h1 >
  <br>
  <p style="font-size:18px; margin-top:20px;">Exemplos baseados na documentação do <a blank="_target" href="http://getbootstrap.com/">Bootstrap</a> que deve ser usada como referência.</p>
  <p style="font-size:18px;">Para ver mais detalhes da documentação sobre elementos gerais do Bootstrap, como grid, formulários, tabelas e butões acesse: <a blank="_target" href="http://getbootstrap.com/css/">http://getbootstrap.com/css/</a>.</p>
  <p style="font-size:18px;">Para ver detalhes de componentes mais específicos como grupos de botões, paginação, alertas, flash messages e outros acesse: <a blank="_target" href="http://getbootstrap.com/components/">http://getbootstrap.com/components/</a>.</p>
</div>


<h3 class="secao">Exemplos de Grid</h3>
<p>O grid possui <strong>24 colunas</strong> e o tamanho de cada coluna é definido através da classe <code>.col-sm-*</code>, onde * é o número de colunas.</p>
<pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="row"&gt;
  &lt;div class="col-sm-16"&gt;...&lt;/div&gt;
  &lt;div class="col-sm-8"&gt;...&lt;/div&gt;
&lt;/div&gt;
</code></pre>

<div class="row show-grid">
  <div class="col-sm-16"><p>.col-sm-16</p></div>
  <div class="col-sm-8"><p>.col-sm-8</p></div>
</div>
<div class="row show-grid">
  <div class="col-sm-6"><p>.col-sm-6</p></div>
  <div class="col-sm-8"><p>.col-sm-8</p></div>
  <div class="col-sm-10"><p>.col-sm-10</p></div>
</div>
<div class="row show-grid">
  <div class="col-sm-12"><p>.col-sm-12</p></div>
  <div class="col-sm-12"><p>.col-sm-12</p></div>
</div>


<h3 class="secao">Funcionários</h3>


<div class="row">
  <div class="col-sm-12 form-group">
    <label>Fundo&nbsp; <span class="text-warning">*</span></label>

    <select class="form-control chosen" name="codigoFundo" onchange="disparaAcaoBotao(&#39;botaoComboPatrocinadoraPlanoID&#39;)" class="texto" title="Escolha o Fundo"><option value="">[Selecione...]</option>
      <option value="001" selected="selected">001 - MESTRA - FUNDAÇÃO DE PREVIDÊNCIA COMPLEMENTAR</option>
      <option value="002">002 - MESTRA - CAIXA DE ASSISTÊNCIA</option>
    </select>
  </div>  

  <div class="col-sm-8 form-group">
    <label>Inscrição</label>

    <input type="text" class="form-control" name="numeroInscricao" maxlength="10" size="11" value="" readonly="readonly" class="texto_obrigatorio" title="Informe o Número de Inscrição">
  </div>
</div>
<div class="row">

  <div class="col-sm-8 form-group">
    <label>Patrocinador&nbsp; <span class="text-warning">*</span></label>

    <select  class="form-control" name="codigoPatrocinadora" class="texto" title="Escolha o Patrocinador"><option value="">[Selecione...]</option>
      <option value="1">001 - MESTRA EQUIPAMENTOS</option>
      <option value="2">002 - MESTRA SUPRIMENTOS</option>
      <option value="3">003 - MESTRA SERVIÇOS</option>
      <option value="4">004 - MESTRA ROBÓTICA</option>
    </select>
  </div>


  <div class="col-sm-8 form-group form-inline">
    <label>Matrícula&nbsp; <span class="text-warning">*</span></label>

    <input type="text" class="form-control col-sm-20" name="numeroMatricula" maxlength="10" size="11" value="" onkeypress="return sonumero(event)" onblur="disparaAcaoBotao(&#39;acaoGerarDigitoVerificador&#39;)" class="texto" title="Informe o Número da Matrícula">
    <input type="text" class="form-control col-sm-4" name="numeroDigitoVerificadorMatricula" maxlength="1" size="1" value="" readonly="readonly" class="texto_obrigatorio">

  </div>
</div>

<div class="row">
  <div class="col-sm-6 form-group">
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
          &lt;div class="col-sm-24"&gt;Conteúdo do modal pode ser um texto como esse&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="row"&gt;

          &lt;div class="col-sm-24 form-group"&gt;
            &lt;p&gt;Ou um campo de formulário, como abaixo&lt;/p&gt;
          &lt;/div&gt;
          &lt;div class="col-sm-24 form-group"&gt;
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
  <div class="col-sm-12">
    <button type="button" class="btn btn-primary btn-lg col-sm-24" data-toggle="modal" data-target="#modal-da-mestra">
      Abrir modal 1
    </button>
  </div>
  <div class="col-sm-12">
    <button type="button" id="abrirIframe" class="btn btn-primary btn-lg col-sm-24" data-toggle="modal" data-target="#modal-iframe">
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
          <div class="col-sm-24">Conteúdo do modal pode ser um texto como esse</div>
        </div>
        <div class="row">

          <div class="col-sm-24 form-group">
            <p>Ou um campo de formulário, como abaixo</p>
          </div>
          <div class="col-sm-24 form-group">
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

<h3 class="secao">Modal com SweetAlert</h3>
<p>O SweetAlert é uma alternativa com mais funções para os alertas criados por javascript.</p>
<br>
<p>Use <code>swal("mensagem");</code> javascript no lugar de <code>alert("mensagem");</code> para utilizá-lo.</p>


<!-- Exemplo sweet alert 1 -->
<pre class="pre-exemplo"><code>$(".sweet-1").click(function(e) {
  e.preventDefault();
  swal("Mensagem de alerta simples");
});</code></pre>

<button class="btn btn-primary sweet-1">Testar</button>
<script>
  $(".sweet-1").click(function(e) {
    e.preventDefault();
    swal("Mensagem de alerta simples");
  });
</script>
<br><br>


<!-- Exemplo sweet alert 2 -->
<p>Inserindo título e texto descritivo</p>
<pre class="pre-exemplo"><code>$(".sweet-2").click(function(e) {
    e.preventDefault();
    swal("Mensagem de alerta", "Descrição da mensagem ou detalhes do aviso");
  });
</code></pre>
<button class="btn btn-primary sweet-2">Testar</button>



<script>
  $(".sweet-2").click(function(e) {
    e.preventDefault();
    swal("Mensagem de alerta", "Descrição da mensagem ou detalhes do aviso");
  });
</script>

<br><br>

<p>Inserindo título, texto e uma mensagem de confirmação</p>
<pre class="pre-exemplo"><code>$(".sweet-3").click(function(e) {
    e.preventDefault();
    swal({
      title: "Você tem certeza?",
      text: "Você não poderá desfazer essa ação depois",
      showCancelButton: true,
      confirmButtonClass: "btn-primary",
      confirmButtonText: "Sim, continuar a ação",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false
    },
    function(){
      swal("Ação executada", "A ação foi realizada com sucesso.");
    });
  });
</code></pre>
<button class="btn btn-primary sweet-3">Testar</button>
<script>
  $(".sweet-3").click(function(e) {
    e.preventDefault();
    swal({
      title: "Você tem certeza?",
      text: "Você não poderá desfazer essa ação depois",
      showCancelButton: true,
      confirmButtonClass: "btn-primary",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, continuar a ação",
      closeOnConfirm: false
    },
    function(){
      swal("Ação executada", "A ação foi realizada com sucesso.");
    });
  });
</script>



<br><br>
<p>Para a documentação completa acese: <a href="https://lipis.github.io/bootstrap-sweetalert/" target="_blank">https://lipis.github.io/bootstrap-sweetalert/</a></p>

<h3 class="secao">Campos com máscara</h3>
<p>Utilizando o <a href="http://digitalbush.com/projects/masked-input-plugin" target="_blank">Masked Input</a></p>
<div class="row">
  <div class="col-sm-6 form-group">
    <label>CPF</label>
    <input class="form-control cpf-field" type="text" name=""value="" placeholder="999.999.999-99">
  </div>
  <div class="col-sm-6 form-group">
    <label>CEP</label>
    <input class="form-control cep-field" type="text" name=""value="" placeholder="99.999-99">
  </div>
</div>
<script>
  $(".cpf-field").mask("999.999.999-99");
  $(".cep-field").mask("99.999-99");
</script>
<pre class="pre-exemplo"><code>&lt;input class="form-control cpf-field" type="text" name=""value="" placeholder="999.999.999-99"&gt;
&lt;input class="form-control cep-field" type="text" name=""value="" placeholder="99.999-99"&gt;
</code></pre>
<pre class="pre-exemplo"><code>&lt;script&gt;
  $(".cpf-field").mask("999.999.999-99");
  $(".cep-field").mask("99.999-99");
&lt;/script&gt;</code></pre>


<h3 class="secao">Campos que utilizam datas</h3>
<p>Para criar campos de data, utilize a classe <code>.datepicker</code></p>
<br>
<pre><code class="language-html" data-lang="html">&lt;input class="form-control datepicker" type="text" name="..."  value="..." title="..."></code></pre>
</br>

<div class="row">
  <div class="col-sm-3 form-group">
    <label>Nascimento <span class="text-warning">*</span></label>
    <input class="form-control datepicker" type="text" name="dataNascimentoParticipanteFormatado" maxlength="10"  value="" onkeyup="DateFormat(this,this.value,event,false)" onfocus="javascript:vDateType=&#39;3&#39;" class="texto" title="Informe a Data">
  </div>

  <div class="col-sm-3 form-group">
    <label>Por Falecimento</label>
    <input class="form-control" type="text" name="dataFalecimentoParticipanteFormatado" maxlength="10"  value="" onkeyup="DateFormat(this,this.value,event,false)" onblur="DateFormat(this,this.value,event,true)" onfocus="javascript:vDateType=&#39;3&#39;" readonly="readonly" class="texto_obrigatorio" title="Informe a Data">
  </div>

  <div class="col-sm-3 form-group">
    <label>Sexo <span class="text-warning">*</span></label>
    <select  class="form-control" name="tipoSexoParticipante" class="texto"><option value="" selected="selected">[Selecione...]</option>
      <option value="F">F - Feminino</option>
      <option value="M">M - Masculino</option></select>
  </div>

  <div class="col-sm-3 form-group">
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


  <div class="col-sm-3 form-group">
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

  <p>Tabela sem borda <code>.table</code></p>
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

  <p>Tabela com fundo alternado <code>.table .table-striped</code></p>
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
  
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">
    &lt;fieldset&gt;
      &lt;legend>Fieldset 1&lt;/legend&gt;
      ...
    &lt;/fieldset&gt;
  </code></pre>
  <fieldset>
    <legend>Fieldset Maior</legend>

    <div class="row">
      <div class="col-md-8">
        <fieldset>
          <legend>Fieldset 1</legend>
          <div class="form-group">
            <label class="control-label">Inscrição</label>
            <input type="text" class="form-control" name="" value="">
          </div>
        </fieldset>
      </div>
      <div class="col-md-4">
        <fieldset>
          <legend>Fieldset 2</legend>
          
        </fieldset>
      </div>
    </div>
  </fieldset>

  <h3 class="secao">Componente retrátil</h3>
  <p>O componente retrátil deve utilizar o <a href="http://getbootstrap.com/components/#panels" target="_blank">componente panel</a> do Bootstrap com a insersão de algumas classes.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="panel panel-default <strong>componenteRetratil form-group</strong>"&gt;
  &lt;div class="panel-heading <strong>componente-titulo</strong>"&gt;Título simples do painel&lt;/div&gt;
  &lt;div class="panel-body <strong>conteudoComponenteRetratil</strong>"&gt;
    Conteúdo do painel
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
  <div id="componenteVisual" class="form-group panel panel-default componenteRetratil">

    <div class="panel-heading componente-titulo">
      <script>
        var ancora  = "";
        var pos     = -1;
      </script>
      <div class="col_hierarq contrai-btn">
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

      <script>
        var idPortlet   = "itensPlc";
        var campoFoco   = "";
        if(ancora != "" && ancora == idPortlet){
          setVarGlobal("idPortlet", idPortlet);

        }
      </script>
      
      <!-- Título - Sempre Aparece -->
      Usuário Centro Custo&nbsp;
      <!-- Fim titulo -->

      <!-- Função ... -->
      <!-- Controles do topo -->

      <div class="controles-right">
        <input type="button" name="evento" value="Novo" class="btn btn-default btn-sm" onclick="setValorCampo('detCorrPlc','itensPlc');plcAjax.ajaxEscondeBarraProgresso();plcAjax.ajaxSubmit('POST',getBotaoArray('INCLUIR_DET'));" onmouseover="try{animar(event , '2')}catch(e){}" onmouseout="try{animar(event, '')}catch(e){}" id="botao_secao">
        <script>regBotaoEvento('Novo','INCLUIR_DET');</script>
      </div>
      <!-- Fim Controles do topo -->
    </div> <!-- panel-heading -->

    <div class="conteudoComponenteRetratil panel-body">
      <div class="row">
        <div class="col-sm-12 form-group">
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
  </div>

  <h3 class="secao">UI Tabs</h3>
  <script>
  $(function() {
    $( "#tabs" ).tabs();
  });
  </script>
  <div id="tabs">
    <ul>
      <li><a href="#tabs-1">Nunc tincidunt</a></li>
      <li><a href="#tabs-2">Proin dolor</a></li>
      <li><a href="#tabs-3">Aenean lacinia</a></li>
    </ul>
    <div id="tabs-1">
      <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p>
    </div>
    <div id="tabs-2">
      <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
    </div>
    <div id="tabs-3">
      <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
      <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
    </div>
  </div>

  <h3 class="secao">Alertas</h3>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="alert alert-success" role="alert"&gt;Sucesso&lt;/div&gt;
  &lt;div class="alert alert-info" role="alert"&gt;Informativo&lt;/div&gt;
  &lt;div class="alert alert-warning" role="alert"&gt;Aviso&lt;/div&gt;
&lt;div class="alert alert-danger" role="alert"&gt;Erro&lt;/div&gt;</code></pre>
  <div class="alert alert-success" role="alert">Sucesso</div>
  <div class="alert alert-info" role="alert">Informativo</div>
  <div class="alert alert-warning" role="alert">Aviso</div>
  <div class="alert alert-danger" role="alert">Erro</div>

  <h3 class="secao">Campos com erro de validação</h3>
  <p>Para criar campos de formulário com notificação de erro, adicione a classe <code>.has-error</code> a classe <code>.form-group</code> do campo em questão.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="form-group has-error"&gt;
  &lt;label class="control-label" for="inputError1"&gt;Exemplo de campo com erro de validação&lt;/label&gt;
  &lt;input type="text" class="form-control" id="inputError1"&gt;
&lt;/div&gt;</code></pre>
  <div class="form-group has-error">
    <label class="control-label" for="inputError1">Email</label>
    <input type="text" class="form-control" id="inputError1">
    <span class="help-block">Endereço de email inválido.</span>
  </div>

  <h3 class="secao">Campos requeridos</h3>
  <p>Adicione a classe <code>.required</code> à div <code>.form-group</code> do formulário para adicionar o * automaticamente ao lado do label.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="form-group required"&gt;
  &lt;label class="control-label"&gt;Email&lt;/label&gt;
  &lt;input type="text" class="form-control"&gt;
&lt;/div&gt;</code></pre>
  <div class="form-group required">
    <label class="control-label">Email</label>
    <input type="text" class="form-control">
  </div>

  <h3>Checkboxes e Radio Buttons</h3>
  <p>Para usar checkboxes crie uma <code>div</code> com a classe <code>.checkbox</code> envolvendo o <code>label</code> e o <code>input</code> do checkbox. </p>
  <p>O mesmo serve para radio buttons, porém a classe é <code>.radio</code></p>
  <p>Também é possível utilizar os atributos <code>disabled</code> para inputs desabilitados e <code>checked</code> para campos marcados.</p>
  <p>As divs de checkbox precisam estar dentro de uma div com a classe <code>.form-group</code>.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;div class="form-group"&gt;
  &lt;div class="checkbox"&gt;
    &lt;label&gt;
      &lt;input type="checkbox" name="" value=""&gt;
      Checkbox
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="radio"&gt;
    &lt;label&gt;
      &lt;input type="radio" name="" id="" value=""&gt;
      Botão de radio
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

  <div class="form-group">
    <div class="checkbox">
      <label>
        <input type="checkbox" value="">
        Opção 1
      </label>
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" value="" disabled>
        Checkbox desabilitado
      </label>
    </div>

    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
        Botão de radio
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
        Botão de rádio 2
      </label>
    </div>
    <div class="radio">
      <label>
        <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
        Botão desabilitado
      </label>
    </div>
  </div>

  <p>Para uma lista de checkboxes alinhados lado a lado use a classe <code>.checkbox-inline</code> no label do input. Não utilize a <code>div</code> com a class <code>.checkbox</code> envolvendo cada opção.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;label class="checkbox-inline"&gt;
  &lt;input type="checkbox" name="" value=""&gt; Checkbox Inline
&lt;/label&gt;

[...]

&lt;label class="radio-inline"&gt;
  &lt;input type="radio" name=""  value=""&gt; Radio Inline
&lt;/label&gt;</code></pre>
  
  <div class="form-group">
    <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox3" value="option3"> 3
    </label>
  
    <br>
  
    <label class="radio-inline">
      <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
    </label>
    <label class="radio-inline">
      <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
    </label>
    <label class="radio-inline">
      <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 3
    </label>
  </div>
  
  <h3 class="secao">Campos desabilitados ou de apenas leitura</h3>
  <p>Para usar campos que os usuário não possam editar, utilize o atributo <code>disabled="disabled"</code>.</p>
  <p>Funciona também com os campos de datepicker.</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;input class="form-control datepicker" type="text" name="..."  value="..." <strong>disabled="disabled"</strong>></code></pre>

  <div class="row form-group">
    <div class="col-sm-8">
      <label for="">Input</label>
      <input type="text" class="form-control col-sm-20" name="" value="" disabled="disabled">
    </div>
    <div class="col-sm-8">
      <label for="">Select</label>
      <select class="form-control chosen" name="codigoFundo" disabled="disabled" onchange="disparaAcaoBotao(&#39;botaoComboPatrocinadoraPlanoID&#39;)" class="texto" title="Escolha o Fundo"><option value="">[Selecione...]</option>
        <option value="001" selected="selected">001 - MESTRA - FUNDAÇÃO DE PREVIDÊNCIA COMPLEMENTAR</option>
        <option value="002">002 - MESTRA - CAIXA DE ASSISTÊNCIA</option>
      </select>
    </div>
    <div class="col-sm-8">
      <label for="">Datepicker</label>
      <input class="form-control datepicker" type="text" disabled="disabled">
    </div>
  </div>

  <h3 class="secao">Paginação simples</h3>
  <nav>
    <ul class="pager">
      <li><a href="#" class="btn btn-sm btn-default"><span class="icon icon-first"></span> Primeiro</a><a href="#" class="btn btn-sm btn-default"><span class="icon icon-backward2"></span> Anterior</a></li>
      <li class="page-items">1 - 4 de 9 itens</li>
      <li><a href="#" class="btn btn-sm btn-default">Próxima <span class="icon icon-forward3"></span> </a><a href="#" class="btn btn-sm btn-default">Última <span class="icon icon-last"></span></a></li>
    </ul>
  </nav>
  <nav>
    <ul class="pager">
      <li><a href="#" class="btn btn-sm btn-default"><span class="icon icon-first"></span></a><a href="#" class="btn btn-sm btn-default"><span class="icon icon-backward2"></span></a></li>
      <li class="page-items">1 - 4 de 9 itens</li>
      <li><a href="#" class="btn btn-sm btn-default"><span class="icon icon-forward3"></span> </a><a href="#" class="btn btn-sm btn-default"><span class="icon icon-last"></span></a></li>
    </ul>
  </nav>
  <pre class="pre-exemplo"><code>&lt;nav&gt;
  &lt;ul class="pager"&gt;
    &lt;li&gt;&lt;a href="#"&gt;&lt;span aria-hidden="true"&gt;&larr;&lt;/span&gt; Anterior&lt;/a&gt;&lt;/li&gt;
    &lt;li class="page-items"&gt;1 - 4 de 9 itens&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Próxima &lt;span aria-hidden="true"&gt;&rarr;&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
  <br>

  <p>Utilize a classe <code>previous</code> e <code>next</code> no <code>&lt;li&gt;</code> para alinhar o botões de paginação.</p>
  <pre class="pre-exemplo"><code>&lt;nav&gt;
  &lt;ul class="pager"&gt;
    &lt;li class="previous"&gt;&lt;a href="#"&gt;&lt;span aria-hidden="true"&gt;&larr;&lt;/span&gt; Anterior&lt;/a&gt;&lt;/li&gt;
    &lt;li class="page-items"&gt;Exibindo 1 - 4 de 9 itens&lt;/li&gt;
    &lt;li class="next"&gt;&lt;a href="#"&gt;Próxima &lt;span aria-hidden="true"&gt;&rarr;&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
  <nav>
    <ul class="pager">
      <li class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Anterior</a></li>
      <li class="page-items">Exibindo 1 - 4 de 9 itens</li>
      <li class="next"><a href="#">Próxima <span aria-hidden="true">&rarr;</span></a></li>
    </ul>
  </nav>

  <h3 class="secao">Paginação</h3>
  <p>Utilize listas <code>&lt;ul&gt;</code> com a classe <code>.pagination</code> para criar a paginação</p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html"><span class="nt">&lt;nav&gt;</span>
  <span class="nt">&lt;ul</span> <span class="na">class=</span><span class="s">"pagination"</span><span class="nt">&gt;</span>
    <span class="nt">&lt;li&gt;</span>
      <span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">"#"</span> <span class="na">aria-label=</span><span class="s">"Anterior"</span><span class="nt">&gt;</span>
        <span class="nt">&lt;span</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;</span><span class="ni">&amp;laquo;</span><span class="nt">&lt;/span&gt;</span>
      <span class="nt">&lt;/a&gt;</span>
    <span class="nt">&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>1<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>2<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>3<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>4<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>5<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;</span>
      <span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">"#"</span> <span class="na">aria-label=</span><span class="s">"Próximo"</span><span class="nt">&gt;</span>
        <span class="nt">&lt;span</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;</span><span class="ni">&amp;raquo;</span><span class="nt">&lt;/span&gt;</span>
      <span class="nt">&lt;/a&gt;</span>
    <span class="nt">&lt;/li&gt;</span>
  <span class="nt">&lt;/ul&gt;</span>
<span class="nt">&lt;/nav&gt;</span></code></pre>
  <nav>
    <ul class="pagination">
      <li>
        <a href="#" aria-label="Anterior">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="active"><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
      <li>
        <a href="#" aria-label="Próximo">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>

  <p>Para desabilitar um botão insira a classe <code>disabled</code> no <code>&lt;li&gt;</code></p>
  <p>Para marcar um botão como "página atual" insira a classe <code>active</code> no <code>&lt;li&gt;</code></p>
  <pre class="pre-exemplo"><code class="language-html" data-lang="html">&lt;nav&gt;
  &lt;ul class="pagination"&gt;
    &lt;li class="disabled"&gt;&lt;a href="#" aria-label="Anterior"&gt;&lt;span aria-hidden="true"&gt;&laquo;&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;
    &lt;li class="active"&gt;&lt;a href="#"&gt;1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;2&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;3&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;4&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;5&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
  <nav>
    <ul class="pagination">
      <li class="disabled"><a href="#" aria-label="Anterior"><span aria-hidden="true">&laquo;</span></a></li>
      <li class="active"><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul>
  </nav>
  <p>Para ver a documentação completa sobre paginação acesse: <a href="http://getbootstrap.com/components/#pagination" target="_blank">http://getbootstrap.com/components/#pagination</a></p>
</form>

<h3 class="secao">Ícones</h3>
<p>Utilize um <code>&lt;span&gt;</code> com a classe <code>icon</code> e a classe do ícone escolhido <code>icon-<strong>NOME_DO_ICONE</strong></code>.</p>
<pre class="pre-exemplo"><code>&lt;span class="icon icon-checkmark"&gt;&lt;/span&gt;</code></pre>
<h1><span class="icon icon-checkmark"></span></h1>

<p>Para inserir ícones dentro de botões utilize a tag <code>&lt;button&gt;</code> ou <code>&lt;a&gt;</code>.</p>
<pre class="pre-exemplo"><code>&lt;button class="btn btn-primary"&gt;
  &lt;span class="icon icon-file-text2"&gt;&lt;/span&gt; Texto do botão
&lt;/button&gt;</code></pre>

  <div class="row">
    <div class="col-sm-4">
        <button class="btn btn-primary">
          <span class="icon icon-file-text2"></span> btn-primary
        </button>
    </div>
    <div class="col-sm-4">
        <button class="btn btn-default">
            <span class="icon icon-file-text2"></span> btn-default
        </button>
    </div>
    <div class="col-sm-4">
        <button class="btn btn-success">
             btn-success <span class="icon icon-file-text2"></span>
        </button>
    </div>
    <div class="col-sm-4">
        <button class="btn btn-info">
             btn-info <span class="icon icon-file-text2"></span>
        </button>
    </div>
    <div class="col-sm-4">
        <button class="btn btn-default">
             <span class="icon icon-file-text2"></span>
        </button>
    </div>
  </div>
  <br>
  <p>Para inserir o ícone dentro de um input, utilize a classe <code>input-icon</code> e o código hexadecimal do ícone.</p>
  <pre class="pre-exemplo"><code>&lt;input type="submit" class="btn btn-primary input-icon" value="&amp;#xE900; Exemplo"&gt;</code></pre>
  <input type="submit" class="btn btn-primary input-icon" value="&#xE900; Exemplo">

  <h3 class="secao">Lista completa de ícones</h3>
  <div class="row">
    <div class="col-sm-24">
      <?php include("icon.php"); ?>
    </div>
  </div>
</div>