$(document).ready(function()
{  

	var content = new Object;
	var URL = "javascript/hm-chatbot-v1.1/";
	var messageIndex = 0;

	$('body').append('<div id="hm-syscall-canvas"></div>');

	var updateDOM = function($html){
		$('#hm-syscall-canvas').html($html); 
	}

	$.ajax({
	  url: URL+'inc/client.tpl.html',
	  data: {},
	  success: function(data){

	  	content.html = data;
		$.ajax({
		  url: URL+'inc/client.css.html',
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

			var cont = 0;
			var adminUsers = [
				{
					name: 'Joana',
					function: 'Atendente Virtual',
					image: 'img/chatbot-user.png',
					messages: [
						// 'Olá',
						// 'Praesent accumsan gravida massa, eget placerat ex viverra non. Vestibulum eu aliquam libero. Sed auctor mollis lobortis. Mauris egestas facilisis orci',
						// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
						'Oi, meu nome &eacute; Joana sou uma atendente virtual! Minha especialidade &eacute; ajudar e tirar d&uacute;vidas de participantes da Funda&ccedil;&atilde;o Mestra.',
						'[nome], sobre o que deseja saber? selecione a op&ccedil;&atilde;o desejada:',
						'Voc&ecirc; j&aacute; tem um empr&eacute;stimo vigente. Seu saldo devedor &eacute; de R$ 3.456,00 e est&aacute; faltando 6 parcelas.',
						'Gostaria de fazer um refinancimento?',
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

			$('.conversation .head .box-img .circle-img').append('<img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/>')

			var msgHTML = '<div class="chat-msg"><div class="arrow"></div><div class="txt"></div><div class="img"><img src="" alt=""></div></div>';

			var restartChat = function(){
				$('#hm-syscall-canvas form.conversation .messages').html('');
				$('#hm-syscall-canvas form.conversation .action-buttons').hide();
				$('#hm-syscall-canvas form.conversation .send .msg.form-control').show();

				$('#hm-syscall-canvas form.conversation').removeClass('closed-conversation').hide();

				$('#hm-syscall-canvas form.init-chat').show();

				$('#hm-syscall-canvas .form-control').val('');
				cont = 0;
			}

			var toggleChat = function(){
				if(canvas.hasClass('open')){
					canvas.removeClass('open');
				}else{
					canvas.addClass("open");
					canvas.find('.form-control').first().focus();
				}
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
			});

			$('#hm-syscall-canvas').find('a.title').on('click', function(){
				toggleChat();
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
				
				
				
				setTimeout(function() {

					$('#hm-syscall-canvas .typing-load').show();

					setTimeout(function() {

						$('#hm-syscall-canvas .typing-load').hide();

						for(var i=0; i<2; i++) {
							$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+adminUsers[0].messages[i]+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
							
							messageIndex = i;

							// scrollChat($(this).find('.messages'));

							if(messageIndex == 1) {
								for(var j=0; j<5; j++) {
									$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor options"><div class="txt option"><a>'+adminUsers[0].options[j]+'</a></div></div>');
								}

								scrollChat($('#hm-syscall-canvas form.conversation').find('.messages'));

								//select option
								$('#hm-syscall-canvas form.conversation div.options div.option').on('click', function() {
									var option = $(this);
									// alert('selecionou né moisés');
									$('#hm-syscall-canvas form.conversation div.options div.option').attr('disabled', true).off('click');

									$('#hm-syscall-canvas .conversation .form-control').show();

									// $('#hm-syscall-canvas .conversation .messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+$(this).find('.msg-init').val()+'</div><div class="img"><img src="" alt=""></div></div>');

									// $('#hm-syscall-canvas .conversation .chat-msg.sender .txt').html($(this).find('a').html());

									//iniciar chat
									$('#hm-syscall-canvas .conversation .form-control').val(option.find('a').html())
									
									
									conversation($('#hm-syscall-canvas form.conversation'));

									$('#hm-syscall-canvas form.conversation').submit();
									// console.log('submitou?');
									return false;
								});
							}
						}
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
				if($('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val() != '' || force){

					var senderMsg = $('.conversation textarea.msg[name="send-msg"]').val();
					var receptorMsg = adminUsers[0].messages[messageIndex+1];

					$('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val('');

					if(!force) {
						e.find('.messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+senderMsg+'</div><div class="img"><img src="" alt=""></div></div>');
						
						scrollChat(e.find('.messages'));
					}

					var element = e;
					
						
					setTimeout(function() {
						$('#hm-syscall-canvas .typing-load').show();

						setTimeout(function() {
							$('#hm-syscall-canvas .typing-load').hide();

							console.log(messageIndex);

							$('#hm-syscall-canvas form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+receptorMsg+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
							
							scrollChat($('form.conversation .messages'));

							if(messageIndex+1 < adminUsers[0].messages.length-1){
								messageIndex++;
							}else{
								
								element.addClass('closed-conversation');
								element.find('.send .msg.form-control').hide();

								element.find('.messages').append('<p class="chat-return">'+adminUsers[0].name+' encerrou este atendimento</p>')

								element.find('.action-buttons').fadeIn();
							}

							if(messageIndex == 2 || messageIndex == 6 || messageIndex == 7) {
								conversation(e, true);
							}
						}, 2000);

					}, 2000);

				}
			}

			$('#hm-syscall-canvas form.conversation').on('submit', function(){
				conversation($(this));

				return false;
			});
				
		  },
		  dataType: 'html'
		});
	  },
	  dataType: 'html'
	});
	

	

});