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

var myDoughnutChart = new Chart(document.getElementById("pie-chart").getContext("2d"), {
    type: 'doughnut',
    data: dataPie,
    options: optionsPie
});

  var lineCharts = [

    {
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
    },

    {
      type: 'line',
      data:{
        labels : ["01/Jun","06/Jun","10/Jun","15/Jun","18/Jun"],
        datasets : [
          {
            backgroundColor: "rgba(0,173,164,0.1)", 
            borderColor: "rgba(0,173,164,1)",
            pointColor : "rgba(0,173,164,1)",
            pointStrokeColor : "transparent",
            data : [3,4,3.5,4.3,3],
            label: "Resolvidos"
          },
          {
            backgroundColor: "rgba(83,133,197,0.1)",  
            borderColor: "rgba(83,133,197,1)",  
            pointColor : "rgba(83,133,197,1)",
            pointStrokeColor : "transparent",
            data : [2,3,2.5,3.3,2],
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
    }

  ]


document.getElementById("line-chart-0").style.height = '500px';
document.getElementById("line-chart-0").style.width = '100%';
document.getElementById("line-chart-1").style.height = '500px';
document.getElementById("line-chart-1").style.width = '100%';
  
  var myLineChart = new Array();

	myLineChart[0] = new Chart(document.getElementById("line-chart-0").getContext("2d"), lineCharts[0]);
  myLineChart[1] = new Chart(document.getElementById("line-chart-1").getContext("2d"), lineCharts[1]);


  if($('.select-tabs').length > 0){

    $('.selects .dropdown-menu a').on('click', function(){

      

      var selectTabs = $(this).parent().parent().parent().parent();

      var target = $(this).attr('data-select');

      selectTabs.find('.select-tab').hide();

      $(target).show();

      $.each(myLineChart, function(k,v){
        v.destroy();
        myLineChart[k] = new Chart(document.getElementById("line-chart-"+k).getContext("2d"), lineCharts[k]);
        myLineChart[k].resize();
      });

    });

  }

});