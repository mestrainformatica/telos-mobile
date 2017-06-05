$(document).ready(function()
{  

	var content = new Object;
	var URL = "http://www/mestrainfo.com.br/development/prevmestra.com.br/Modernidade_5.1/javascript/hm-syscall-v1.0/";

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

			canvas = $('#hm-syscall-canvas');

			$('#hm-syscall-canvas').find('a.title').on('click', function(){

				if(canvas.hasClass('open')){
					canvas.removeClass('open');
				}else{
					canvas.addClass("open");
					canvas.find('.form-control').first().focus();
				}
			});

			$('#hm-syscall-canvas .init-chat').on('submit', function(){

				$(this).fadeOut();
				$('#hm-syscall-canvas .conversation').fadeIn();

				$('#hm-syscall-canvas .conversation .form-control').focus();

				$('#hm-syscall-canvas .conversation .chat-msg.sender .txt').html($(this).find('.msg-init').val());

				return false;
			});

			var msgHTML = '<div class="chat-msg"><div class="arrow"></div><div class="txt"></div><div class="img"></div></div>';

			$('textarea.msg').keydown(function(e){
				if (event.keyCode == 13) {
			        $(this.form).submit();
			        return false;
			     }
			});

			var cont = 0;
			var messages = [
				'Olá',
				'Praesent accumsan gravida massa, eget placerat ex viverra non. Vestibulum eu aliquam libero. Sed auctor mollis lobortis. Mauris egestas facilisis orci',
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				'Aliquam porta, libero non gravida maximus.',
				'sem sem bibendum dolor, in pretium odio elit quis nisi.'

			];

			$('form.conversation').find('.messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+messages[0]+'</div><div class="img"></div></div>');
		
			// var loading = '<div class="chat-msg receptor loading"><div class="arrow"></div><div class="txt">...</div><div class="img"></div></div>';

			var scrollChat = function($this){
				$this.animate({scrollTop:$this.get(0).scrollHeight});
			}

			$('form.conversation').on('submit', function(){

				if($('.conversation textarea.msg[name="send-msg"]').val() != ''){

					var senderMsg = $('.conversation textarea.msg[name="send-msg"]').val();
					var receptorMsg = messages[cont+1];

					$('.conversation textarea.msg[name="send-msg"]').val('');

					$(this).find('.messages').append('<div class="chat-msg sender"><div class="arrow"></div><div class="txt">'+senderMsg+'</div><div class="img"></div></div>');
					
					scrollChat($(this).find('.messages'));

					setTimeout(function() {
						// $('#hm-syscall-canvas .chat-msg.loading').remove();
						$('form.conversation .messages').append('<div class="chat-msg receptor"><div class="arrow"></div><div class="txt">'+receptorMsg+'</div><div class="img"></div></div>');
						scrollChat($('form.conversation .messages'));
					}, 2000);

					
					if(cont+1 < messages.length-1){
						cont++;
					}else{
						cont = 0;
					}

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