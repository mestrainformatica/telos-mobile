// Autor: Juscelino Cunha Coelho
// Updated: Felipe Reis
// Data : 30 de outubro de 2007
// Conect Prev Mestra
// Para envio de E-MAIL E SMS

function ConectPrevMestra() { 

   var host = window.document.location.toString().substr(0, window.document.location.toString().indexOf("/",7));
   var hostConectPrevMestra = host + "/Connect_Prev/controle/Connect"; 
   var hostConectPrevMestraImagem = host + "/Connect_Prev/midia"; 
   var posicaoImagemLeft = "70%";
   var posicaoImagemTop = "04%";
   var codigoCliente = "1";
	var nomeImgA = "logo_conectprevA.gif";
	var nomeImgS = "logo_conectprevS1.gif";
	var nomeImgS1 = "logo_conectprevS1.gif";
	var nomeImgS2 = "logo_conectprevS2.gif";
	var nomeImgS3 = "logo_conectprevS3.gif";
	var nomeImgS4 = "logo_conectprevS4.gif";
	var objImgLogoGlobal = null;
	
    
   var xmlhttpcp = null;
   var objIframecp = null;
   var msgErro = "";
    
   var logMsg = "";
    
	ConectPrevMestra.gravarDadosParaEnvioCP = function() {   
   	try {
			var funcionalidadeAtiva = ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
			var objDadosArray = ConectPrevMestra.recuparaDadosFuncionalidadeAtiva(funcionalidadeAtiva);
	      if (!objDadosArray)
	         return true;

			var strObjArray = ConectPrevMestra.ConnectCookie.get("objCampoArray"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
			
	      var objCampoArray = strObjArray.split(",");
	      var strUrl = "";
	      for (i = 0; i < objDadosArray.length; i++)
	         strUrl = strUrl + "&" + objCampoArray[i] + "=" + objDadosArray[i];
			
			ConectPrevMestra.ConnectCookie.set("strUrl" + funcionalidadeAtiva, strUrl);
			
			logMsg = logMsg + " Dados para envio:" + strUrl;
			ConectPrevMestra.exibirMensagemLog();
			
		} catch(e) {
			msgErro = msgErro + "Problema: Na fun??o gravarDadosParaEnvioCP; "; 
		}
		
		return true;
   }

   ConectPrevMestra.criarHttpRequest = function() {   
   		logMsg = logMsg + " criarHttpRequest:";
   		
        try {
            xmlhttpcp = new XMLHttpRequest();
        } catch(e) {
            var msxml = ['MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for ( var i=0, len = msxml.length; i < len; ++i ) {
                try {
							xmlhttpcp = new ActiveXObject(msxml[i]); break;
                } catch(e) {
							msgErro = msgErro + "Problema: N?o tem conex?o ajax; "; 
                }
            }
        }

        
        return true;
   }
    
   ConectPrevMestra.exibirImagem = function() {   
		if (!window.document.body)
            return false;
            
      	var objDivLogo = document.body.appendChild(document.createElement("div"));
      	var objImgLogo = objDivLogo.appendChild(document.createElement("IMG"));
      	objImgLogo.src = hostConectPrevMestraImagem + "/" + nomeImgS;
		objImgLogoGlobal = objImgLogo;
		objDivLogo.style.visibility  = "hidden";
      	objDivLogo.style.position  = "absolute";
      	
      	objDivLogo.style.left = posicaoImagemLeft;
      	objDivLogo.style.top = posicaoImagemTop;
      	objDivLogo.style.zIndex = 999;

		funcionalidadeTemConecPrev = ConectPrevMestra.ConnectCookie.get("funcionalidadeTemConecPrev"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
		if (funcionalidadeTemConecPrev == "true" && document.URL.indexOf("selecaopopup=S") == -1){
				objDivLogo.style.visibility  = "visible";
		}
   }
	
   ConectPrevMestra.atualizarImagem = function(strExt) {
		if (objImgLogoGlobal)
			if (strExt == "S")
				objImgLogoGlobal.src = hostConectPrevMestraImagem + "/" + nomeImgS;
			else
				objImgLogoGlobal.src = hostConectPrevMestraImagem + "/" + nomeImgA;
	}
	
   ConectPrevMestra.processarDadosRecebidos = function() {   
   	var objDiv = document.createElement("div");
      objDiv.innerHTML = xmlhttpcp.responseText; 
	   var arObjs = new Array();
		var objFuncaoArray = new Array();
		var objCampoArray = new Array();
		for (var iCont = 0; iCont < objDiv.childNodes.length; iCont++) {
			if (objDiv.childNodes[iCont].name == "funcao")
				objFuncaoArray[objFuncaoArray.length] = objDiv.childNodes[iCont].value;
			else if (objDiv.childNodes[iCont].name == "campo")
				objCampoArray[objCampoArray.length] = objDiv.childNodes[iCont].value;
			else
				arObjs[objDiv.childNodes[iCont].name] = objDiv.childNodes[iCont];
		}
		
      var tipoDados = arObjs["tipoDados"];
    
      	if (tipoDados) {
			if (tipoDados.value == "inicio") {  
				logMsg = logMsg + "Resposta Inicio : " + xmlhttpcp.responseText + "\n";
	            var temConectPrev = arObjs["temConectPrev"];
	            if (temConectPrev) if (temConectPrev.value == "sim") {   
	            	ConectPrevMestra.ConnectCookie.set("funcionalidadeTemConecPrev"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), "true");
						ConectPrevMestra.exibirImagem();
						ConectPrevMestra.ConnectCookie.set("objFuncaoArray"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), objFuncaoArray.toString());
						ConectPrevMestra.ConnectCookie.set("objCampoArray"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), objCampoArray.toString());
	            } else {   
						// N?o tem conect prev para esta funcionalidade
	               ConectPrevMestra.ConnectCookie.set("funcionalidadeTemConecPrev"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), "false");
						ConectPrevMestra.exibirImagem();
	            }
			} else if (tipoDados.value == "enviar") {
					logMsg = logMsg + "Resposta enviar : " + xmlhttpcp.responseText + "\n";
					ConectPrevMestra.enviarSmsConectPrevMestra(arObjs['urlparasms'].value);
         	} else {
					logMsg = logMsg + "Resposta Outros : " + xmlhttpcp.responseText + "\n";
			}
		} else {
			logMsg = logMsg + "Resposta : " + xmlhttpcp.responseText + "\n";
			if (xmlhttpcp.responseText == "OK") {
				nomeImgS = nomeImgS3;
				ConectPrevMestra.atualizarImagem("S");
			} else
				ConectPrevMestra.enviarRespostaParaConectPrevMestra(objDiv.innerHTML);
		}
	}

   ConectPrevMestra.processadorMudancaEstado = function() {   

		if (xmlhttpcp.readyState == 4) { // Completo 
			if (xmlhttpcp.status == 200) // resposta do servidor OK
				ConectPrevMestra.processarDadosRecebidos();
			else 
				msgErro = msgErro + "Problema: (processadorMudancaEstado)" + xmlhttpcp.status + ":" + xmlhttpcp.statusText + "##; "; 
	
			ConectPrevMestra.atualizarImagem("S");
	        ConectPrevMestra.exibirMensagemLog();
		}
   }

	ConectPrevMestra.processadorMudancaEstadoNew = function() {
		if (xmlhttpcp.readyState == 4) { // Completo 
           if (xmlhttpcp.status != 200) // resposta do servidor OK
               msgErro = msgErro + "Problema: (processadorMudancaEstadoNew) " + xmlhttpcp.status + ":" + xmlhttpcp.statusText + "##; "; 
	
			 ConectPrevMestra.atualizarImagem("S");
		    ConectPrevMestra.exibirMensagemLog();
        }
   }

   ConectPrevMestra.enviarRespostaParaConectPrevMestra = function(dadosResposta) {
        if (ConectPrevMestra.criarHttpRequest()) {   
            var params = "cliente=" + codigoCliente + "&chave=resposta&funcionalidade=" + ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")))+"&urlKey="+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"));
				xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstadoNew(); };
            logMsg = logMsg + "*** enviarRespostaParaConectPrevMestra ***\n";
            logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
			logMsg = logMsg + "Paramteros : " + params + "\n"; 
			params = params + "&dadosResposta=" + dadosResposta;      
            xmlhttpcp.open("POST", hostConectPrevMestra);
            xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttpcp.setRequestHeader("Content-length", params.length);
            xmlhttpcp.setRequestHeader("Connection", "close");
				nomeImgS = nomeImgS3;
            xmlhttpcp.send(params);
				ConectPrevMestra.atualizarImagem("N");
        }
   }
    
   ConectPrevMestra.enviarSmsConectPrevMestra = function(urlparasms) {
		if (ConectPrevMestra.criarHttpRequest()) {   
			xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstado(); };
			logMsg = logMsg + "*** enviarSmsConectPrevMestra ***\n";
			logMsg = logMsg + "urlparasms : " + urlparasms + "\n";
			
			/*
			xmlhttpcp.open("GET", urlparasms);
			nomeImgS = nomeImgS3;
			ConectPrevMestra.atualizarImagem("S");
			ConectPrevMestra.exibirMensagemLog();
			xmlhttpcp.send(null);
			*/
			
			// ### Bloco provis?rio ###
			
			if(urlparasms == "OK"){
				win = window.open(urlparasms, "JANELA", "height = 50, width = 150");
				win.close();
				nomeImgS = nomeImgS3;
				ConectPrevMestra.atualizarImagem("S");
		        ConectPrevMestra.exibirMensagemLog();
		        ConectPrevMestra.enviarMsg();
			}else if(urlparasms == "NOK"){
				nomeImgS = nomeImgS4;
				ConectPrevMestra.atualizarImagem("S");
		        ConectPrevMestra.exibirMensagemLog();
		        ConectPrevMestra.enviarMsg();
			}else if(urlparasms == "OK_JAR"){
				nomeImgS = nomeImgS3;
				ConectPrevMestra.atualizarImagem("S");
		        ConectPrevMestra.exibirMensagemLog();
		        ConectPrevMestra.enviarMsg();
			}
			// ### Fim Bloco provis?rio ###
			
		}
   } 
	
   ConectPrevMestra.verificaSeTemConectPrevMestra = function(funcionalidadeAtiva) {	
		if (ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"))) != funcionalidadeAtiva) {
	        ConectPrevMestra.ConnectCookie.set("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), funcionalidadeAtiva);
	        if (ConectPrevMestra.criarHttpRequest() && document.forms[0].usuarioUltAlteracao) {   
				var params = "cliente=" + codigoCliente + "&chave=inicio&funcionalidade=" + funcionalidadeAtiva+ "&usuarioUltAlteracao="+document.forms[0].usuarioUltAlteracao.value+"&urlKey="+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"));
				xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstado(); };
				logMsg = logMsg + "*** verificaSeTemConectPrevMestra ***\n";
				logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
				logMsg = logMsg + "Paramteros : " + params + "\n";
            	xmlhttpcp.open("POST", hostConectPrevMestra);
            	xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            	xmlhttpcp.setRequestHeader("Content-length", params.length);
            	xmlhttpcp.setRequestHeader("Connection", "close");
				nomeImgS = nomeImgS1;
            	xmlhttpcp.send(params);
				ConectPrevMestra.atualizarImagem("N");
            }
        }
   }
   
   ConectPrevMestra.inicializarGrupoConectPrevMestra = function(funcionalidadeAtiva) {
        if (ConectPrevMestra.criarHttpRequest() && document.forms[0].usuarioUltAlteracao) {   
			var params = "cliente=" + codigoCliente + "&chave=inicio&funcionalidade=" + ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")))+ "&usuarioUltAlteracao="+document.forms[0].usuarioUltAlteracao.value+"&urlKey="+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"));
			xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstado(); };
			logMsg = logMsg + "*** verificaSeTemConectPrevMestra ***\n";
			logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
			logMsg = logMsg + "Paramteros : " + params + "\n";
            xmlhttpcp.open("POST", hostConectPrevMestra);
            xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttpcp.setRequestHeader("Content-length", params.length);
            xmlhttpcp.setRequestHeader("Connection", "close");
			nomeImgS = nomeImgS1;
            xmlhttpcp.send(params);
        }
   }

    ConectPrevMestra.verificaSeOperacaoEfetuada = function(operacaoRealizada) {
		var strObjArray = ConectPrevMestra.ConnectCookie.get("objFuncaoArray"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
		if(strObjArray == false)
			return "";

        var objArray = strObjArray.split(",");
        var operacao = "";
	    
        for (i = 0; i < objArray.length; i++)
            if(objArray[i] == operacaoRealizada)
                operacao = objArray[i];
        
        return operacao;
    }
	
    ConectPrevMestra.recuparaCampoArray = function(campo) {
		var obj = 0;
        var objOk = null;
        if (campo.indexOf("[0]") > 0) {
			var iCont = 0;
            while (obj != undefined) {   
					campoid = campo.replace("[0]", "[" + iCont + "]");
	            objOk = obj;
					try {
		         	obj = window.document.getElementById(campoid);
		         	if(obj == null)
		         		obj = window.document.getElementsByName(campoid)[0];
		         } catch (e) {
	        			msgErro = msgErro + "Erro : Campo " + campoid + " n?o encontrado \n";
	        			msgErro = msgErro + "Erro : " + e + "\n";
	        			obj == undefined;
		         }
	            iCont++;
            }
            return objOk;
        }
        return null;
        
	}
	
    ConectPrevMestra.recuparaDadosFuncionalidadeAtiva = function(funcionalidadeAtiva) {
		var strObjArray = ConectPrevMestra.ConnectCookie.get("objCampoArray"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
		if(strObjArray == false)
			return "";

        var objDadosArray = new Array();    
        var objCampoArray = strObjArray.split(",");
        for (i = 0; i < objCampoArray.length; i++) {  
			var obj = null;
			obj = ConectPrevMestra.recuparaCampoArray(objCampoArray[i]);
			
			if (obj == null){
				try {
	         	obj = window.document.getElementById(objCampoArray[i]);
	         	if(obj == null)
	         		obj = window.document.getElementsByName(objCampoArray[i])[0];
	         } catch (e) {
        			msgErro = msgErro + "Erro : Campo " + objCampoArray[i] + " n?o encontrado \n";
        			msgErro = msgErro + "Erro : " + e + "\n";
	         }
         }
         
			if (obj) {
				if (obj.tagName == "SELECT")
                    objDadosArray[i] = obj.options[obj.selectedIndex].text;
                else
                    objDadosArray[i] = obj.value;
			}
        }
    	
        return objDadosArray;
    }
	
    ConectPrevMestra.enviarDadosParaConectPrevMestra = function(operacao, funcionalidadeAtiva) {
        //var objDadosArray = ConectPrevMestra.recuparaDadosFuncionalidadeAtiva(funcionalidadeAtiva);
        //if (!objDadosArray)
        //   return false;
		//var strObjArray = ConectPrevMestra.ConnectCookie.get("objCampoArray");
        //var objCampoArray = strObjArray.split(",");
        //var strUrl = "";
        //for (i = 0; i < objDadosArray.length; i++)
        //    strUrl = strUrl + "&" + objCampoArray[i] + "=" + objDadosArray[i];
			
		strUrl = ConectPrevMestra.ConnectCookie.get("strUrl" + funcionalidadeAtiva);
		logMsg = logMsg + " Dados que vai enviar:" + strUrl;
		ConectPrevMestra.exibirMensagemLog();
		
        if (ConectPrevMestra.criarHttpRequest()) {
            var params = "cliente=" + codigoCliente + "&chave=fim&funcionalidade=" + funcionalidadeAtiva + "&operacao=" + operacao + strUrl+"&urlKey="+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"));
				xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstado(); };
				logMsg = logMsg + "*** enviarDadosParaConectPrevMestra ***\n";
            logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
				logMsg = logMsg + "Paramteros : " + params + "\n";
            xmlhttpcp.open("POST", hostConectPrevMestra);
            xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            xmlhttpcp.setRequestHeader("Content-length", params.length);
            xmlhttpcp.setRequestHeader("Connection", "close");
				nomeImgS = nomeImgS2;
				ConectPrevMestra.atualizarImagem("N");
            xmlhttpcp.send(params);
			
        }
    }
    
    ConectPrevMestra.enviarMsg = function() {	

	        if (ConectPrevMestra.criarHttpRequest() && document.forms[0].usuarioUltAlteracao) {   
				var params = "cliente=" + codigoCliente + "&chave=envio&funcionalidade=" + ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")))+ "&usuarioUltAlteracao="+document.forms[0].usuarioUltAlteracao.value+"&urlKey="+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"));
				xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstado(); };
				logMsg = logMsg + "*** verificaSeTemConectPrevMestra ***\n";
				logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
				logMsg = logMsg + "Paramteros : " + params + "\n";
	            xmlhttpcp.open("POST", hostConectPrevMestra);
	            xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	            xmlhttpcp.setRequestHeader("Content-length", params.length);
	            xmlhttpcp.setRequestHeader("Connection", "close");
	            xmlhttpcp.send(params);
				ConectPrevMestra.atualizarImagem("N");
           }
   }
    
    ConectPrevMestra.recuperaFuncionalidade = function() {   
        if (window.recuperaFuncionalidade)
            return window.recuperaFuncionalidade();
    
        var strUrl = String(window.document.location.toString());
        var pos = strUrl.indexOf("idRotina");
		
        var posLog = strUrl.indexOf("TemLog");
		if (posLog > 0) {
			var temLog = strUrl.substr(strUrl.indexOf("TemLog") + 7, 1);
			ConectPrevMestra.ConnectCookie.set("TemLog", temLog);
		}

        if (pos > 0) {
			logMsg = logMsg + "Rotina :" + strUrl.substr(strUrl.indexOf("idRotina") + 9, 4) + "\n";
            return strUrl.substr(strUrl.indexOf("idRotina") + 9, 4);
        } else {
			var strFuncAtiva = ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
			logMsg = logMsg + "Rotina :" + strFuncAtiva + "\n";
            return strFuncAtiva;
		}
    }

    ConectPrevMestra.recuperaRespostaOperacao = function() {
        if (window.recuperaRespostaOperacao)
            return window.recuperaRespostaOperacao();

        // Recupera a resposta da opera??o realizada.. devido a estrutura atual tive que prosseguir com a "engenharia de emergencia" //Felipe Reis
        var html = window.document.body.innerHTML;
        var index = html.indexOf("Registro gravado com sucesso");
        var index2 = html.indexOf("Processo executado com sucesso");
        
        var indexClone = html.indexOf("Clonagem realizada com sucesso");
        var indexExcl = html.indexOf("Registro exclu?do com sucesso");
        
        var indexURLX = document.URL.indexOf("evento=x");
        var indexURLEditar = document.URL.indexOf("evento=Editar");
        var indexURLidRotina = document.URL.indexOf("idRotina=");
        
        var modoPlc = document.forms[0].modoPlc.value;
        
        if (index > 0 || index2 > 0){
            return "001";
        }else if((indexURLX > 0 && modoPlc == "inclusaoPlc") || indexURLEditar > 0 || indexClone > 0 || indexExcl > 0){
        	return "002";
        }else{
            return "000";
        }
    }
    
    ConectPrevMestra.exibirMensagemLog = function() {
			if (msgErro != "")
				logMsg = logMsg + "Possivel Erro :" + msgErro + "\n";
			
			var strTemLog = ConectPrevMestra.ConnectCookie.get("TemLog");
			if (strTemLog == 'S' || strTemLog == 's')
				alert(logMsg);
    }

    ConectPrevMestra.limpaCookies = function(idRotina,url) {
    	
    	if (ConectPrevMestra.criarHttpRequest()) {
	    	var params = "chave=limpeza&idRotina="+idRotina+"&urlRotina="+url;
	    	xmlhttpcp.onreadystatechange = function(){ ConectPrevMestra.processadorMudancaEstadoNew(); };
	    	logMsg = logMsg + "*** limpeza de cookies ***\n";
	    	logMsg = logMsg + "Host : " + hostConectPrevMestra + "\n";
	    	logMsg = logMsg + "Paramteros : " + params + "\n";
	        xmlhttpcp.open("POST", hostConectPrevMestra);
	        xmlhttpcp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        xmlhttpcp.setRequestHeader("Content-length", params.length);
	        xmlhttpcp.setRequestHeader("Connection", "close");
	        xmlhttpcp.send(params);
	        ConectPrevMestra.atualizarImagem("N");
    	}
    	
    }

    ConectPrevMestra.executaConectPrevMestra = function() {
    	
    	var funcionalidadeAtiva = ConectPrevMestra.recuperaFuncionalidade();
    	
    	var html = window.document.body.innerHTML;
    	var indexURLX = document.URL.indexOf("evento=x");
    	var indexURLidRotina = document.URL.indexOf("idRotina=");
        if(indexURLX > 0 || indexURLidRotina > 0 ){
        	ConectPrevMestra.limpaCookies(funcionalidadeAtiva,document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")));
        }

		if (ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")).substring(0,document.URL.indexOf(".do"))) == funcionalidadeAtiva)
			ConectPrevMestra.exibirImagem();

		if (window.hostConectPrev)
            hostConectPrevMestra = window.hostConectPrev;
            
        
		if (ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"))) == funcionalidadeAtiva)
			ConectPrevMestra.exibirImagem();

		if (ConectPrevMestra.ConnectCookie.get("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do"))) != funcionalidadeAtiva)
	        ConectPrevMestra.ConnectCookie.set("funcionalidadeAtiva"+document.URL.substring(document.URL.indexOf("_"),document.URL.indexOf(".do")), funcionalidadeAtiva);

        var operacaoRealizada = ConectPrevMestra.recuperaRespostaOperacao();

        var operacao = ConectPrevMestra.verificaSeOperacaoEfetuada(operacaoRealizada);
	    
        if (operacao != "")
            ConectPrevMestra.enviarDadosParaConectPrevMestra(operacao, funcionalidadeAtiva);
      
      	if(operacaoRealizada == "002")
        	ConectPrevMestra.inicializarGrupoConectPrevMestra(operacao, funcionalidadeAtiva);
      
    }
	
	ConectPrevMestra.ConnectCookie = {
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

new ConectPrevMestra();

if(window.addEventListener){ //  Netscape, Firefox
	window.addEventListener('load', ConectPrevMestra.executaConectPrevMestra, false);
	window.addEventListener('submit', ConectPrevMestra.gravarDadosParaEnvioCP, false);
} else { 					 //  Internete Explore (IE)
	window.attachEvent('onload', ConectPrevMestra.executaConectPrevMestra);
	document.forms[0].attachEvent('onsubmit', ConectPrevMestra.gravarDadosParaEnvioCP);
}

