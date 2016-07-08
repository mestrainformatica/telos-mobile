$(document).ready(function(){

	$('.btnExcluir').on('click', function(){
		
		$tr = $(this).parent().parent();

		if ($tr.hasClass('danger')){
			$tr.removeClass('danger');
			$tr.find('button').toggleClass('btn-danger').toggleClass('btn-default').text('Remover');
		} else {
			$tr.addClass('danger');
			$tr.find('button').toggleClass('btn-danger').toggleClass('btn-default').text('Desfazer');
		}

		if($tr.next().hasClass('oculto')){
			$tr.next().removeClass('oculto');
		}else{
			$tr.next().addClass('oculto');
		}

	});


});