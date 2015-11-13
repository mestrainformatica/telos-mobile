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

            function  Mestra() { 
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

