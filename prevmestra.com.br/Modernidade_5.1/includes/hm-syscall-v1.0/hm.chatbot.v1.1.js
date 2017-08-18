$(document).ready(function()
{  

	var content = new Object;
	var URL = "javascript/hm-syscall-v1.0/";

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
					image: 'img/67.jpg',
					messages: [
						// 'Olá',
						// 'Praesent accumsan gravida massa, eget placerat ex viverra non. Vestibulum eu aliquam libero. Sed auctor mollis lobortis. Mauris egestas facilisis orci',
						// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
						'Oi, meu nome é Joana sou uma atendente virtual! Minha especialidade é ajudar e tirar dúvidas de participantes da Fundação Mestra. Agora que já me apresentei, eu adoraria saber um pouco mais sobre você. Qual sua inscrição?',
						'Não tenho uma resposta programada esta pergunta.',
						'Preciso entender sobre sua dúvida. Sobre o que deseja saber?',
						'Mais alguma d&uacute;vida?',
						'A Funda&ccedil;&atilde;o Mestra agradece pelo contato. Tenha um &oacute;timo dia!'
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

				$('#hm-syscall-canvas .conversation .form-control').focus();

				$('#hm-syscall-canvas .conversation .messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+$(this).find('.msg-init').val()+'</div><div class="img"><img src="" alt=""></div></div>');

				$('#hm-syscall-canvas .conversation .messages').append('<p class="chat-return">Chat Iniciado</p>')
				// $('#hm-syscall-canvas .conversation .chat-msg.sender .txt').html($(this).find('.msg-init').val());
				
				
				
				setTimeout(function() {

					$('#hm-syscall-canvas .typing-load').show();

					setTimeout(function() {

						$('#hm-syscall-canvas .typing-load').hide();

						$('#hm-syscall-canvas form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+adminUsers[0].messages[0]+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
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

			$('#hm-syscall-canvas form.conversation').on('submit', function(){

				if($('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val() != ''){

					var senderMsg = $('.conversation textarea.msg[name="send-msg"]').val();
					var receptorMsg = adminUsers[0].messages[cont+1];

					$('#hm-syscall-canvas .conversation textarea.msg[name="send-msg"]').val('');

					$(this).find('.messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+senderMsg+'</div><div class="img"><img src="" alt=""></div></div>');
					
					scrollChat($(this).find('.messages'));

					var element = $(this);
					
						
					setTimeout(function() {
						$('#hm-syscall-canvas .typing-load').show();

						setTimeout(function() {
							$('#hm-syscall-canvas .typing-load').hide();
							$('#hm-syscall-canvas form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+receptorMsg+'</div><div class="img"><img class="img-path" src="'+URL+adminUsers[0].image+'" alt=""/></div></div>');
							scrollChat($('form.conversation .messages'));

							if(cont+1 < adminUsers[0].messages.length-1){
								cont++;
							}else{
								
								element.addClass('closed-conversation');
								element.find('.send .msg.form-control').hide();

								element.find('.messages').append('<p class="chat-return">'+adminUsers[0].name+' encerrou este atendimento</p>')

								element.find('.action-buttons').fadeIn();
							}
						}, 2000);

					}, 2000);

					

				}

				return false;
			});
				
		  },
		  dataType: 'html'
		});
	  },
	  dataType: 'html'
	});
	

	

});