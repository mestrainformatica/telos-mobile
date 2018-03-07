$(function()
{
	// Pego a lista de módulos completa
	$source = $('#source');
	// Clono o elemento para trabalhar os filtros
	$data = $source.clone();
	
	// Pego somente os elementos do filtro ativo (no evento de clique)
	$('.modulos .menu-modulos a').on('click', function(e){
		
		$datatype = $(this).attr('data-type');

		if ($datatype == 'todos'){
			$filteredData = $data.find('li');
		} else {
			$filteredData = $data.find('li[data-type="'+$datatype+'"]');
		}

		$.each($filteredData, function(e){
			console.log($(this).html());
		})
		//console.log($filteredData);

		$source.quicksand($filteredData, { duration: 150}) 
		//console.log($source);

		return false;
	})
});