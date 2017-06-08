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
        /*
        {
          value : 28,
          color : "#78A0EF"
        },
        {
          value: 14,
          color:"#F78979"
        },
        {
          value : 14,
          color : "#F0BE73"
        },
        {
          value: 14,
          color:"#A4ECA4"
        },
        {
        	value: 14,
        	color: "#ABDBDA"
        },
        {
          value : 14,
          color : "#6ED9D7"
        }*/
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
			labels : ["","","","","","","", ""],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.0)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,0)",
					pointStrokeColor : "transparent",
					data : [20,45,25,10,30,60,50],
				},
				{
					fillColor : "rgba(151,187,205,0.0)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,0)",
					pointStrokeColor : "transparent",
					data : [30,20,15,10,20,45,60]
				}
			]
		},
		ctx: document.getElementById("line-chart-1").getContext("2d"),
		options: {bezierCurve : false, label: false, animation: false}
	};


	var myLineChart = new Chart(lineCharts[0].ctx).Line(lineCharts[0].data, lineCharts[0].options);

});