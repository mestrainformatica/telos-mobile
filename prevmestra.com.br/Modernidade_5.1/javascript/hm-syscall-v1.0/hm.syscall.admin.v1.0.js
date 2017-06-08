$(document).ready(function(){  

	var content = new Object;
	// var URL = "http://www/mestrainfo.com.br/development/prevmestra.com.br/Modernidade_5.1/javascript/hm-syscall-v1.0/";
	var URL = "javascript/hm-syscall-v1.0/";
	
	$('body').append('<div id="hm-syscall-canvas"></div>');

	var updateDOM = function($html){
		$('#hm-syscall-canvas').html($html); 
	}

	$.ajax({
	  url: URL+'inc/admin.tpl.html',
	  data: {},
	  success: function(data){

	  	content.html = data;

	  	$.ajax({
			url: URL+'inc/admin.css.html',
			data: {},
			success: function(data){

				content.css = data;
				updateDOM(content.css+content.html);

				var images = $('#hm-syscall-canvas .img-path');
				$.each(images, function(k,v){
					var atualSrc = $(v).attr('src');
					$(v).attr('src', URL+atualSrc);
				});

				canvas = $('#hm-syscall-canvas');

				/* SIMULA NOTIFICAÇÃO */
				setTimeout(function() {
					if(!canvas.hasClass('open')){
						canvas.find('a.title').append('<span class="notification">1</span>');
					}
				}, 2000);

				/* USUÁRIO ESTATICO */
				var cont = 0;
				var clientUsers = [
					{
						name: 'Adair Lima Pestana',
						code: '0000000342-6',
						fundo: 'MESTRA - FUNDA&Ccedil;&Atilde;O DE PREVID&Ecirc;NCIA COMPLEMENTAR',
						patrocinadora: '001 - MESTRA EQUIPAMENTOS',
						plano: '01 - PBD - PLANO DE BENEF&Iacute;CIO DEFINIDO',
						messages: [
							'Bom dia! Gostaria de tirar uma d&uacute;vida.',
							'Quando ser&aacute; aberta a janela de concess&atilde;o de empr&eacute;stimo este m&ecirc;s?',
							'At&eacute; quando posso enviar o contrato?',
							'Obrigado Jorge.',
							'N&atilde;o s&oacute; isso msm.'
						]
					}
				];

				$('#hm-syscall-canvas form.admin #user-name').html(clientUsers[0].name);
				$('#hm-syscall-canvas form.admin #user-code').html(clientUsers[0].code);
				$('#hm-syscall-canvas form.admin #fundo').html(clientUsers[0].fundo);
				$('#hm-syscall-canvas form.admin #patrocinadora').html(clientUsers[0].patrocinadora);
				$('#hm-syscall-canvas form.admin #plano').html(clientUsers[0].plano);

				var msgHTML = '<div class="chat-msg"><div class="arrow"></div><div class="txt"></div><div class="img"><img src="" alt=""></div></div>';

				var restartChat = function(){
					$('#hm-syscall-canvas form.conversation .messages').html('');
					$('#hm-syscall-canvas form.conversation .send .msg.form-control').show();

					$('#hm-syscall-canvas .form-control').val('');
					cont = 0;
				}

				var toggleChat = function(){
					if(canvas.hasClass('open')){
						canvas.removeClass('open');

					}else{
						canvas.addClass("open");
						canvas.find('.form-control').first().focus();
						if(canvas.find('a.title .notification').length > 0){
							canvas.find('a.title .notification').remove();
						}
					}
				}

				var scrollChat = function($this){
					$this.animate({scrollTop:$this.get(0).scrollHeight});
				}


				$('#hm-syscall-canvas').find('a.title').on('click', function(){
					toggleChat();
				});


				$('#hm-syscall-canvas textarea.msg').keydown(function(event){
					if (event.keyCode == 13) {
				        $(this.form).submit();
				        return false;
				     }
				});

				$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+clientUsers[0].messages[0]+'</div><div class="img"><img src="" alt=""></div></div>');
				$('#hm-syscall-canvas .conversation .messages').append('<p class="chat-return">Chat Iniciado</p>');


				$('#hm-syscall-canvas form.conversation').on('submit', function(){

					if($('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val() != ''){

						var senderMsg = $('.conversation textarea.msg[name="send-msg"]').val();
						var receptorMsg = clientUsers[0].messages[cont+1];

						$('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val('');

						$(this).find('.messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+senderMsg+'</div><div class="img"><img src="" alt=""></div></div>');
						
						scrollChat($(this).find('.messages'));

						if(cont != -1){
							var element = $(this);
							setTimeout(function() {
								$('#hm-syscall-canvas .typing-load').show();

								setTimeout(function() {
									$('#hm-syscall-canvas .typing-load').hide();
									// $('#hm-syscall-canvas .chat-msg.loading').remove();
									$('#hm-syscall-canvas form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+receptorMsg+'</div><div class="img"><img src="" alt=""></div></div>');
									scrollChat($('form.conversation .messages'));

									if(cont+1 < clientUsers[0].messages.length-1){
										cont++;
									}else{
										cont = -1;
									}

								}, 2000);

							}, 2000);
						}

						
					
					}

					return false;
				});

				$('#hm-syscall-canvas form.admin').on('submit', function(){
					return false;
				});
				
				$('#hm-syscall-canvas #gerar-protocolo').on('click', function(){
					$('#hm-syscall-canvas .protocol .gerado').show();
					$('#hm-syscall-canvas .protocol .form').hide();
				});

				$('#hm-syscall-canvas #new-called').on('click', function(){
					$('#hm-syscall-canvas .protocol .form .form-control').val('');
					$('#hm-syscall-canvas .gerado').hide();
					$('#hm-syscall-canvas .protocol .form').show();
				});

				$('#hm-syscall-canvas #close-service').on('click', function(){
					$('#hm-syscall-canvas .confirm-close').show();
				});

				$('#hm-syscall-canvas .confirm-close .back-form').on('click', function(){
					$('#hm-syscall-canvas .confirm-close').hide();
				});

				$('#hm-syscall-canvas .confirm-close .button-close').on('click', function(){
					$('#hm-syscall-canvas .confirm-close').hide();
					// restartChat();
					toggleChat();
				});

		  	},
			dataType: 'html'
		});

	  },
	  dataType: 'html'
	});

});