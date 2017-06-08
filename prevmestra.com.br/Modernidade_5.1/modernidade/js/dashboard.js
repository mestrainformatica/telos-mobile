$(document).ready(function(){  





  if($('#dashboard-content .custom-progress-bars').length > 0){
    var progs = $('#dashboard-content .custom-progress-bars');
    $.each(progs, function(k,v){
      $(v).find('.custom-progress').css('width', $(v).parent().find('.percent').html());
    });
  }
    

	var dataPie = {
    datasets: [{
        data: [1,1,2,2,1],backgroundColor: [
                '#C9E5F2',
                '#ff8271',
                '#F0BE73',
                '#ABDBDA',
                '#8fc7ff'
                ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        ' Atendimento Ativo',
        ' Reclamação',
        ' Pedido de Informação',
        ' Negociação de Empréstimos',
        ' Solicitação'
    ]
};

	var optionsPie = {
  cutoutPercentage: 40,
  legend: {
                display: false,
                position: 'bottom-right',
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            tooltip :{
            	CaretSize: 22 
           },
            	maintainAspectRatio: false,
    responsive: true
}


	// {
	//     	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	//     	datasets: {
	//     		data: [15,15,28,28,14,14],
	//     		backgroundColor: [
 //                '#C9E5F2',
 //                '#ff8271',
 //                '#F0BE73',
 //                '#ABDBDA',
 //                '#C9E5F2',
 //                '#8fc7ff'
 //                ]
 //           }
 //         }
 //         var optionsPie = {}
           /*    
  {
      value: 3.75,
      color:"#C9E5F2"
    },
    {
      value: 3.75,
      color:"#ff8271"
    },
    {
      value: 7,
      color:"#F0BE73"
    },
    {
      value: 7,
      color:"#ABDBDA",
      label: "6 - Teste de Solicitação"
    },
    {
      value: 3.5,
      color:"#8fc7ff"
    }
    */
var myDoughnutChart = new Chart(document.getElementById("pie-chart").getContext("2d"), {
    type: 'doughnut',
    data: dataPie,
    options: optionsPie
});

	

	var lineCharts = {
		type: 'line',
		data:{
			labels : ["01/Jun","06/Jun","10/Jun","15/Jun","18/Jun"],
			datasets : [
				{
					backgroundColor: "rgba(0,173,164,0.1)", 
					borderColor: "rgba(0,173,164,1)",
					pointColor : "rgba(0,173,164,1)",
					pointStrokeColor : "transparent",
					data : [2,3,3,5,4],
					label: "Resolvidos"
				},
				{
					backgroundColor: "rgba(83,133,197,0.1)",  //laranja
					borderColor: "rgba(83,133,197,1)",  //laranja
					pointColor : "rgba(83,133,197,1)",
					pointStrokeColor : "transparent",
					data : [4,4,5,6,7],
					label: "Abertos"
				}
			]
		},
	options: {

        scales: { 
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                stacked: true
            }]
        
    },
  legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'rgba(0, 0, 0,0.8)'
                }
            },
            tooltip :{
            	CaretSize: 22 
           },
     maintainAspectRatio: false,
	responsive: true
}
	};

document.getElementById("line-chart-1").style.height = '500px';
document.getElementById("line-chart-1").style.width = '100%';
	var myLineChart = new Chart(document.getElementById("line-chart-1").getContext("2d"), lineCharts);

});