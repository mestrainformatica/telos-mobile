$(document).ready(function(){  

	var pieData = [
		{
      value: 14,
      color:"#C9E5F2"
    },
		{
      value: 14,
      color:"#ff8271"
    },
		{
      value: 28,
      color:"#F0BE73"
    },
		{
      value: 28,
      color:"#ABDBDA",
      label: "6 - Teste de Solicitação"
    },
		{
      value: 14,
      color:"#8fc7ff"
    }
	];
        
	var optionsPie = { 
		segmentShowStroke : false,
		percentageInnerCutout : 50,
		labelTxt: true,
		animation: false,
		labelFontSize : 50,
// 		tooltipEvents: [],
// 		showTooltips: true,
// 		onAnimationComplete: function() {
// 		this.showTooltip(this.segments, true);
// 		},
// tooltipTemplate: "<%= label %> - <%= value %>"
	};

	var ctxPie = document.getElementById("pie-chart").getContext("2d");
	var myPie = new Chart(ctxPie).Doughnut(pieData,optionsPie);

	var lineCharts = new Array();

	lineCharts[0] = {
		data:{
			labels : ["01/Jan","06/Jan","10/Jan","15/Jan","18/Jan","20/Jan","23/Jan","28/Jan"],
			datasets : [
				{
					fillColor : "rgba(239,120,120,0)",
					strokeColor : "rgba(239,120,120,1)",  //laranja
					pointColor : "rgba(239,120,120,1)",
					pointStrokeColor : "transparent",
					data : [50,55,53,52,60,65,60,55],
				},
				{
					fillColor : "rgba(0,173,164,0)",
					strokeColor : "rgba(0,173,164,1)",
					pointColor : "rgba(0,173,164,1)",
					pointStrokeColor : "transparent",
					data : [45,40,43,48,50,50,55, 45]
				}
			]
		},
		ctx: document.getElementById("line-chart-1").getContext("2d"),
		options: {
			bezierCurve : false, 
			label: false, 
			animation: false,
			scaleShowGridLines: false,
			scaleFontSize: 8,
			scaleFontStyle: 'normal'
		}
	};


	var myLineChart = new Chart(lineCharts[0].ctx).Line(lineCharts[0].data, lineCharts[0].options);

});