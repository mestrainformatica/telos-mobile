$(document).ready(function() {

console.log($('.test-chat'));

	var chatStatus = false;

	if($('.test-chat').length > 0 && !chatStatus) {

		$('.test-chat').on('click', function() {

			chatStatus = true;
			var buttonTestChat = $(this);
			var content = new Object;
			var URL = "javascript/hm-chatbot-v1.1/";
			var messageIndex = 0;
			
			buttonTestChat.html("<i class='icon-online'></i> Recarregar Chatbot");

			$('body').append('<div id="hm-syscall-canvas"></div>');


			$.ajax({
			url: URL+'inc/client.tpl.html',
			data: {},
			dataType: 'html',
			cache: false,
			success: function(data){

				content.html = data;
				$.ajax({
				url: URL+'inc/client.css.html',
				data: {},
				dataType: 'html',
				cache: false,
				success: function(data_css){


					content.css = data_css;
					// var updateDOM = function(html_a){
						$('#hm-syscall-canvas').html(content.css+content.html); 
					// }
					// updateDOM(content.css+content.html);

					var images = $('#hm-syscall-canvas .img-path');
					$.each(images, function(k,v){
						var atualSrc = $(v).attr('src');
						$(v).attr('src', URL+atualSrc);
					});

					canvas = $('#hm-syscall-canvas');
					

					var cont = 0;
					var adminUsers = [
						{
							name: 'Joana',
							function: 'Atendente Virtual',
							image: './img/chatbot-user.png',
							messages: [
								// 'Olá',
								// 'Praesent accumsan gravida massa, eget placerat ex viverra non. Vestibulum eu aliquam libero. Sed auctor mollis lobortis. Mauris egestas facilisis orci',
								// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
								'Oi, meu nome &eacute; Joana sou uma atendente virtual! Minha especialidade &eacute; ajudar e tirar d&uacute;vidas de participantes da Funda&ccedil;&atilde;o Mestra.',
								'[nome], sobre o que deseja saber? selecione a op&ccedil;&atilde;o desejada:',
								'Voc&ecirc; j&aacute; tem um empr&eacute;stimo vigente. Seu saldo devedor &eacute; de R$ 3.456,00 e est&atilde;o faltando 6 parcelas.',
								'Gostaria de fazer um refinanciamento ?',
								'Qual seria o valor do empr&eacute;stimo?',
								'E a quantidade de parcelas?',
								'S&oacute; um minuto, &eacute; muito dinheiro...',
								'Brincadeira.. Rs...',
								'Seu empr&eacute;stimo fica em 12x R$ 757,23',
								'Posso te ajudar em mais alguma coisa?',
								'Foi um prazer conversar com voc&ecirc;. Volte sempre!'
							],

							options: [
								'1. Atualiza&ccedil;&atilde;o Cadastral',
								'2. Calend&aacute;rio de Empr&eacute;stimo',
								'3. Simula&ccedil;&atilde;o de Empr&eacute;stimo',
								'4. Simula&ccedil;&atilde;o de Benef&iacute;cio',
								'5. Altera&ccedil;&atilde;o de contribui&ccedil;&otilde;es'
							]
						}
					];

					$('.conversation .head .box-img .circle-img').append('<img class="img-path" src="'+adminUsers[0].image+'" alt=""/>');

					var msgHTML = '<div class="chat-msg"><div class="arrow"></div><div class="txt"></div><div class="img"><img src="" alt=""></div></div>';

					var restartChat = function(){
						console.log(timeout);
						while (timeout--) {
							window.clearTimeout(timeout); // will do nothing if no timeout with id is present
						}

						$('#hm-syscall-canvas form.conversation .messages').html('');

						$('#hm-syscall-canvas form.conversation .action-buttons').hide();
						$('#hm-syscall-canvas form.conversation .send .msg.form-control').show();

						$('#hm-syscall-canvas form.conversation').removeClass('closed-conversation').hide();

						$('#hm-syscall-canvas form.init-chat').show();

						$('#hm-syscall-canvas .form-control').val('');
						cont = 0;
						messageIndex = 0;
						
						toggleChat();
						return false;
					}

					var restartOptions = function(){

						$('#hm-syscall-canvas form.conversation .messages').html('');
						$('#hm-syscall-canvas form.conversation .action-buttons').hide();
						$('#hm-syscall-canvas form.conversation .send .msg.form-control').show();

						$('#hm-syscall-canvas form.conversation').removeClass('closed-conversation').hide();

						$('#hm-syscall-canvas form.init-chat').show();

						$('#hm-syscall-canvas .form-control').val('');

						$('#hm-syscall-canvas .init-chat').submit();
						return false;
					}

					var selectOption = function(option) {
						if(option.find('a').html().substring(0,1) == '3') {
							$('#hm-syscall-canvas form.conversation div.options div.option').attr('disabled', true).off('click');

							$('#hm-syscall-canvas .conversation .form-control').show();

							//iniciar chat
							$('#hm-syscall-canvas .conversation .form-control').val(option.find('a').html())
											
							conversation($('#hm-syscall-canvas form.conversation'));
						} else {
							$('#hm-syscall-canvas form.conversation div.options div.option').attr('disabled', true).off('click');

							$('#hm-syscall-canvas form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">Op&ccedil;&atilde;o inv&aacute;lida</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');

							scrollChat($('#hm-syscall-canvas form.conversation').find('.messages'));

							setTimeout(function() {
								restartOptions();
							}, 2000);
						}

						return false;
					}

					var toggleChat = function(){
						if(canvas.hasClass('open')){
							canvas.removeClass('open');
						}else{
							canvas.addClass("open");
							canvas.find('.form-control').first().focus();
						}
						return false;
					}

					var scrollChat = function($this){
						$this.animate({scrollTop:$this.get(0).scrollHeight});
					}

					$('#hm-syscall-canvas #new-call').on('click', function(){
						restartChat();
						
					});

					$('#hm-syscall-canvas #close-window').on('click', function(){
						restartChat();
						toggleChat();
						return false;
					});

					$('#hm-syscall-canvas').find('a.title').on('click', function(){
						// restartChat();
						toggleChat();
						return false;
					});

					buttonTestChat.on('click', function() {
						toggleChat();
						location.reload(true);
						return false;
					});

					$('#hm-syscall-canvas .init-chat').on('submit', function(){

						$(this).hide();

						$('#hm-syscall-canvas .conversation .head .user-name').html(adminUsers[0].name);
						$('#hm-syscall-canvas .conversation .head .user-function').html(adminUsers[0].function);

						$('#hm-syscall-canvas .conversation').show();

						$('#hm-syscall-canvas .conversation .form-control').hide();

						// $('#hm-syscall-canvas .conversation .messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+$(this).find('.msg-init').val()+'</div><div class="img"><img src="" alt=""></div></div>');

						$('#hm-syscall-canvas .conversation .messages').append('<p class="chat-return">Chat Iniciado</p>')
						// $('#hm-syscall-canvas .conversation .chat-msg.sender .txt').html($(this).find('.msg-init').val());
						
						
						
						timeout = setTimeout(function() {

							$('#hm-syscall-canvas .typing-load').show();

							timeout = setTimeout(function() {

								$('#hm-syscall-canvas .typing-load').hide();

								// for(var i=0; i<2; i++) {
									$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+adminUsers[0].messages[messageIndex]+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
									$('#hm-syscall-canvas .typing-load').show();

									messageIndex++;
									timeout = setTimeout(function() {
										// scrollChat($(this).find('.messages'));
										$('#hm-syscall-canvas .typing-load').hide();
										$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+adminUsers[0].messages[messageIndex]+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
										

										if(messageIndex == 1) {
											for(var j=0; j<5; j++) {
												$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor options"><div class="txt option"><a>'+adminUsers[0].options[j]+'</a></div></div>');
											}

											scrollChat($('#hm-syscall-canvas form.conversation').find('.messages'));

											//select option
											$('#hm-syscall-canvas form.conversation div.options div.option').on('click', function() {
												selectOption($(this));
												return false;
											});
										}
									}, 3000);
								// }
							}, 2000);

						}, 2000);

						return false;
					});


					$('#hm-syscall-canvas textarea.msg').keydown(function(event){
						if (event.keyCode == 13) {
							$(this.form).submit();
							return false;
						}
					});

					var conversation = function(e, force=false) {
						if(  $('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val() != '' || force  ){

							var senderMsg = $('.conversation textarea.msg[name="send-msg"]').val();
							var receptorMsg = adminUsers[0].messages[messageIndex+1];

							$('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val('');

							if(!force) {
								e.find('.messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+senderMsg+'</div><div class="img"><img src="" alt=""></div></div>');
								
								scrollChat(e.find('.messages'));
							}

		console.log(messageIndex);
							if(negatives.indexOf(senderMsg) >= 0 && (messageIndex == 3 || messageIndex == 8)) {
								if(messageIndex != 9) {
									messageIndex = 8;
								}else {
									messageIndex = 9;
								}
							}

							//se ainda rpecisa de ajuda
							if(positives.indexOf(senderMsg) >= 0 && messageIndex == 9) {
								messageIndex = 0;
								restartOptions();
								return false;
							}

							//se o valor é aceito
							if(messageIndex == 4) {
								var regex = new RegExp(/^[0-9.,]+$/);

								if(!regex.test(senderMsg) || (parseInt(senderMsg, 10) > 7346 || parseInt(senderMsg, 10) < 0)) {
									messageIndex = 4;
									printMessage(e, 'Infelizmente, este valor ultrapassa sua margem.', false);
									$('#hm-syscall-canvas .typing-load').show();
									printMessage(e, 'Voc&ecirc; s&oacute; pode solicitar at&eacute; R$ 7.345,98', false, 4000, 2500);		
									printMessage(e, 'Voc&ecirc; poderia informar novamente?', false, 6000, 2000);		
									return false;
								}
							}

							//se as parcelas são aceitas
							if(messageIndex == 5) {
								if(!($.isNumeric(senderMsg)) || (parseInt(senderMsg, 10) > 12 || parseInt(senderMsg, 10) < 1)) {
									messageIndex = 5;
									printMessage(e, 'Infelizmente, esta parcela ultrapassa sua margem.', false);
									$('#hm-syscall-canvas .typing-load').show();						
									printMessage(e, 'Voc&ecirc; pode parcelar em at&eacute; 12x', false, 4000, 2500);
									printMessage(e, 'Voc&ecirc; poderia informar novamente?', false, 6000, 2000);
									return false;
								}
							}

							receptorMsg = adminUsers[0].messages[messageIndex+1];

							printMessage(e, receptorMsg);
							return false;
						}
					}

					var printMessage = function(element, message, increment=true, delay=2000, typingDelay=2000) {				
						timeout = setTimeout(function() {
							$('#hm-syscall-canvas .typing-load').show();

							timeout = setTimeout(function() {
								$('#hm-syscall-canvas .typing-load').hide();


								$('#hm-syscall-canvas form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+message+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
								
								scrollChat($('form.conversation .messages'));

								if(messageIndex+1 < adminUsers[0].messages.length-1 && increment){
									messageIndex++;
								}else if(increment){
									
									element.addClass('closed-conversation');
									element.find('.send .msg.form-control').hide();

									element.find('.messages').append('<p class="chat-return">'+adminUsers[0].name+' encerrou este atendimento</p>')

									element.find('.action-buttons').fadeIn();
								}

								if(messageIndex == 2 || messageIndex == 6 || messageIndex == 7) {
									conversation(element, true);
								}
								$('#hm-syscall-canvas form.conversation').on('submit');
							}, typingDelay);

						}, delay);
						return false;
					}

					$('#hm-syscall-canvas form.conversation').on('submit', function(event){
						conversation($(this));

						return false;
					});
						
				},
				});
			},
			});

			var negatives = [
				'não',
				'nao',
				'na',
				'no',
				'n',
				'ñ'
			];

			var positives = [
				'sim',
				'si',
				's',
			];

			return false;
		});
		return false;
	}

});