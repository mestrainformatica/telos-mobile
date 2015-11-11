function executarUploadAjax(campo, event, propriedadeNomeArquivo, indice) {
	/*if (!event.target || !event.target.files) {
		alert('Erro: Desative o modo de compatibilidade.');
		return;
	}*/
	var target = event.target ? event.target : event.srcElement

	var files = target.files;
	var data = new FormData();
	var url = 'upload.do?evento=x';

	if (target.files && target.files[0]) {
		var arquivo = target.files[0];
		data.append("arquivo", arquivo);
		if (indice !== undefined) {
			data.append("indice", indice);
			url += '&indice='+indice;
		}
	}
	
	mostrarAnimaAjax(campo);

    $.ajax({
    	url : url,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success : function(html) {
	        exconderAnimaAjax();//J? estava assim
        	if (html.indexOf('ERRO#') > 0) {
        		var msg = html.replace('ERRO#', '');
				alert(msg);
        	} else {
				var arq = campo.value.split('\\');

				document.getElementById(propriedadeNomeArquivo).value = arq[arq.length - 1];
				//document.getElementById(propriedadeNomeArquivo).innerHTML = arq[arq.length - 1];
				esconderUpload(propriedadeNomeArquivo);
				var caminhoCompleto = '#caminhoCompleto'+propriedadeNomeArquivo;
				$(caminhoCompleto).val(html);
        	}
        }   
    }, 'json');

}

function esconderUpload(propriedadeNomeArquivo) {
	
	if ($("#" + propriedadeNomeArquivo).val() == '') {
		$("#0div" + propriedadeNomeArquivo).show();
		$("#1div" + propriedadeNomeArquivo).hide();
	} else {
		$("#0div" + propriedadeNomeArquivo).hide();
		$("#1div" + propriedadeNomeArquivo).show();
		var span = 'span'+propriedadeNomeArquivo;
		document.getElementById(span).innerHTML = document.getElementById(propriedadeNomeArquivo).value;
	}
}

function createLinkDownload(url, id) {
	var nome = id.replace('link', '');
	var arquivo = $("#caminhoCompleto" + nome).val();
	window.open(url + '/download?arquivo=' + escape(arquivo));
}

function createLinkExcluir(url, id) {
	var nome = id.replace('link', '');
	esconderUpload(nome);
}


function executarExcluirAjax(campo, event, propriedadeNomeArquivo, indice, nome) {
	if (confirm('Deseja excluir o arquivo ?')) {
		var arquivo = $("#caminhoCompleto" + propriedadeNomeArquivo).val();
		
		var data = new FormData();
		var url = 'upload.do?evento=Excluir';
	
		if (arquivo != '') {
			url += '&nomeArquivo='+arquivo;
			
		}
	
		mostrarAnimaAjax(campo);
	
	    $.ajax({
	    	url : url,
	        type: 'POST',
	        data: data,
	        cache: false,
	        contentType: false,
	        processData: false,
	        success : function(html) {
		        exconderAnimaAjax();
		        if (html.indexOf('ERRO#') > 0) {
	        		var msg = html.replace('ERRO#', '');
					alert(msg);
	        	} else {
	        		$("#" + propriedadeNomeArquivo).val('');
	        		$("#" + nome).val('');
	        		$("#caminhoCompleto" + propriedadeNomeArquivo).val('');
	        		esconderUpload(propriedadeNomeArquivo);
	        		
	        	}
	        	
	        }   
	    }, 'json');
	}

}
